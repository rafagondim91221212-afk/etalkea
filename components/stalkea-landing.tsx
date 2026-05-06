"use client"

import { ArrowLeft, MapPin, Eye, MessageCircle, Shield, CheckCircle, ChevronDown, Lock, X } from "lucide-react"
import { useState, useEffect } from "react"

interface ProfileData {
  username: string
  fullName: string
  profilePicUrl: string
  biography: string
  postsCount: number
  followersCount: number
  followingCount: number
}

interface StalkeaLandingProps {
  onBack: () => void
  username: string
  profileImage?: string
  profileData?: ProfileData
  hideBack?: boolean
}

export default function StalkeaLanding({ onBack, username, profileImage, profileData, hideBack = false }: StalkeaLandingProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showLocationVipModal, setShowLocationVipModal] = useState(false)
  const [userLocation, setUserLocation] = useState<{city: string, country: string, lat: number, lng: number} | null>(null)

  const testimonials = [
    {
      username: "o__prozind34",
      image: "/images/testimonial-1.jpeg",
      time: "1d",
      text: "In the full version I tested with my bf's @ and saw a lot of stuff. Location, hidden photos, even deleted conversations. It was exactly as shown.",
    },
    {
      username: "maria_silva22",
      image: "/images/testimonial-2.jpeg",
      time: "2d",
      text: "Guys, I didn't believe it worked until I tried it. Found out where my ex was going every day and who he was talking to. Worth every penny!",
    },
    {
      username: "carlos_mendes",
      image: "/images/testimonial-3.jpeg",
      time: "3h",
      text: "Thought it was a scam but decided to risk it. Could even see someone's close friends stories. The tool is real and works very well.",
    },
    {
      username: "ana_beatriz_",
      image: "/images/testimonial-4.jpeg",
      time: "5h",
      text: "Used it to find out if my boyfriend was being honest with me. Saw all his DM conversations. Highly recommend for anyone who has suspicions.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(testimonialTimer)
  }, [testimonials.length])

  // Fetch user location using IP geolocation
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        if (data.city && data.country_name) {
          setUserLocation({
            city: data.city,
            country: data.country_name,
            lat: data.latitude,
            lng: data.longitude
          })
        }
      } catch (error) {
        // Fallback location if API fails
        setUserLocation({
          city: "Sao Paulo",
          country: "Brazil",
          lat: -23.5505,
          lng: -46.6333
        })
      }
    }
    fetchLocation()
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const actualProfilePic =
    profileImage && profileImage !== "/placeholder.svg"
      ? profileImage
      : profileData?.profilePicUrl && profileData.profilePicUrl !== "/placeholder.svg"
        ? profileData.profilePicUrl
        : "/placeholder.svg"

  const displayName = profileData?.fullName || username
  const displayUsername = profileData?.username || username
  const displayBio = profileData?.biography || ""
  const displayPosts = profileData?.postsCount || 0
  const displayFollowers = profileData?.followersCount || 0
  const displayFollowing = profileData?.followingCount || 0

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US")
  }

  const bioLines = displayBio.split("\n").filter((line) => line.trim())

  const lockedImages = [
    "/images/francielle-fitness-post.jpg",
    "/images/lessacoelhinha-post.jpg",
    "/images/francielle-gym-pink.png",
    "/images/maldives-couple.png",
    "/images/man-mountain-profile.jpg",
    "/images/copacabana-fireworks.avif",
  ]

  const features = [
    `All DM messages from ${displayName.split(" ")[0]}`,
    "All uncensored photos (including deleted ones)",
    "Real-time location and places visited",
    `Alert whenever ${displayName.split(" ")[0]} interacts with someone`,
    "2 surprise bonuses valued at $120.00",
  ]

  return (
    <div className="bg-black text-white min-h-screen pb-24 max-w-[480px] mx-auto">
  {/* Header */}
  {!hideBack && (
  <div className="sticky top-0 z-30 bg-black/95 backdrop-blur-sm px-4 py-3 border-b border-gray-800">
  <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
  </div>
  )}

      {/* Hero Section */}
      <div className="px-4 pt-6 pb-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          <Eye className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          INSTACHECK<span className="text-purple-500">.AI</span>
        </h1>
        <p className="text-xl font-bold mb-1">
          The biggest <span className="text-purple-500">Stalker</span> tool of 2026
        </p>
      </div>

      {/* Profile Card */}
      <div className="mx-4 mb-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-green-500">
            <img
              src={
                actualProfilePic.startsWith("http")
                  ? `https://wsrv.nl/?url=${encodeURIComponent(actualProfilePic)}&w=150&h=150`
                  : actualProfilePic
              }
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=150&width=150"
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{displayName}</h3>
            <p className="text-gray-400 text-sm">@{displayUsername}</p>
          </div>
        </div>

        <div className="flex justify-around mb-4 py-4 border-y border-gray-700">
          <div className="text-center">
            <p className="font-bold text-xl">{formatNumber(displayPosts)}</p>
            <p className="text-gray-400 text-xs">posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">{formatNumber(displayFollowers)}</p>
            <p className="text-gray-400 text-xs">followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">{formatNumber(displayFollowing)}</p>
            <p className="text-gray-400 text-xs">following</p>
          </div>
        </div>

        <div className="text-sm text-gray-300 space-y-1">
          {bioLines.length > 0 ? (
            bioLines.map((line, index) => <p key={index}>{line}</p>)
          ) : (
            <p className="text-gray-500 italic">No bio</p>
          )}
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-center">
          <p className="font-bold text-base mb-1">Spying 100% complete!</p>
          <p className="text-sm text-purple-100">Get your VIP access and immediately have access to:</p>
        </div>
      </div>

      <div className="mx-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Real-time location</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          See where {displayName.split(" ")[0]} is now, and the last places they've been.
        </p>
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="h-48 bg-gray-800 relative">
            {userLocation ? (
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng - 0.02}%2C${userLocation.lat - 0.015}%2C${userLocation.lng + 0.02}%2C${userLocation.lat + 0.015}&layer=mapnik&marker=${userLocation.lat}%2C${userLocation.lng}`}
                className="w-full h-full border-0"
                style={{ filter: "grayscale(30%) brightness(0.8)" }}
              />
            ) : (
              <img src="/images/unnamed.png" alt="Map" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 overflow-hidden shadow-lg">
                <img
                  src={
                    actualProfilePic.startsWith("http")
                      ? `https://wsrv.nl/?url=${encodeURIComponent(actualProfilePic)}&w=150&h=150`
                      : actualProfilePic
                  }
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=150&width=150"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="font-semibold mb-1">Current Location</p>
            <p className="text-gray-400 text-sm">
              {userLocation ? `${userLocation.city}, ${userLocation.country}` : "Loading..."}
            </p>
            <button
              onClick={() => setShowLocationVipModal(true)}
              className="mt-3 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm transition-colors"
            >
              View Full Location
            </button>
          </div>
        </div>
      </div>

      <div className="mx-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Eye className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Hidden stories and posts</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          See "Close Friends" stories and posts that {displayName.split(" ")[0]} hid from you.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {lockedImages.map((image, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-900 rounded-xl overflow-hidden relative border border-gray-800"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Post ${i + 1}`}
                className="w-full h-full object-cover blur-md brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-white font-semibold">Restricted content</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold">Direct Messages</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          See literally all of {displayName.split(" ")[0]}'s messages, including temporary messages
        </p>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={
                  actualProfilePic.startsWith("http")
                    ? `https://wsrv.nl/?url=${encodeURIComponent(actualProfilePic)}&w=100&h=100`
                    : actualProfilePic
                }
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{displayName.split(" ")[0]}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-green-500 text-xs">online</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-3 mb-3">
            <p className="text-sm">Hey, wanna see everything from {displayName.split(" ")[0]}'s Instagram?</p>
          </div>
          <div className="bg-purple-600/20 rounded-xl p-3 border border-purple-600/50">
            <p className="text-xs text-purple-300">🔒 147 more messages locked</p>
          </div>
        </div>
      </div>

      <div className="mx-4 mb-6">
        <h2 className="text-xl font-bold mb-4">See what people who use Instacheck.ai say</h2>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 transition-all duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                alt={testimonials[currentTestimonial].username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">{testimonials[currentTestimonial].username}</p>
              <p className="text-gray-400 text-xs">{testimonials[currentTestimonial].time}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300">{testimonials[currentTestimonial].text}</p>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-purple-500 w-4" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-4 mb-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-purple-600">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            With <span className="text-purple-500">Instacheck.ai</span> you will have
          </h3>
          <p className="text-base mb-1">full access to {displayName.split(" ")[0]}'s Instagram for only:</p>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-400 line-through text-sm">From: $279.90</p>
          <p className="text-5xl font-bold text-purple-500 mb-2">
            $29<span className="text-2xl">.00</span>
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>30-day guarantee</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">{feature}</p>
            </div>
          ))}
        </div>

        <a href="https://pay.mycheckoutt.com/01997889-d90f-7176-b1ad-330b2aadd114?ref=" className="block w-full h-full">
          <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 rounded-xl text-base transition-colors shadow-lg">
            Get VIP Access Now
          </button>
        </a>
      </div>

      <div className="mx-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            {
              question: "Does the tool really work?",
              answer: "Yes! Our tool uses advanced technology to provide real-time information.",
            },
            {
              question: "Will the person know I stalked their profile?",
              answer: "No! The entire process is 100% anonymous and discreet.",
            },
            {
              question: "Does it work on private profiles?",
              answer: "Yes, it works on both public and private profiles.",
            },
            {
              question: "Do I need to install anything?",
              answer: "No! Everything works online, directly from your browser.",
            },
            {
              question: "How does the guarantee work?",
              answer: "We offer a 30-day full guarantee. If you don't like it, we refund 100% of your money.",
            },
            {
              question: "How long do I have access?",
              answer: "VIP access is lifetime! Pay once and use forever.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-800 transition-colors"
              >
                <span className="text-sm font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-500 transition-transform ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-6 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-5 border border-green-600">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8 text-green-500" />
          <h3 className="text-lg font-bold text-green-500">30-Day Guarantee</h3>
        </div>
        <p className="text-sm text-gray-300">
          Test risk-free! If you don't like it or for any reason don't adapt, we refund 100% of your money.
        </p>
      </div>

      <div className="mx-4 mb-6 bg-red-900/20 rounded-xl p-4 border border-red-600">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">!</span>
          </div>
          <p className="text-sm text-gray-300">
            The information accessed is <span className="font-bold text-white">extremely sensitive</span>. Use
            responsibly.
          </p>
        </div>
      </div>

      <div className="bg-gray-900 p-4 text-center border-t border-gray-800">
        <p className="text-sm font-bold mb-1">Complete your purchase now!</p>
        <p className="text-xs text-gray-400">Do not leave or reload this page, the spying cannot be performed again.</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-sm">VIP Access for only $29.00</p>
            <p className="text-purple-200 text-xs">Available for {formatTime(timeRemaining)}</p>
          </div>
          <a
            href="https://pay.mycheckoutt.com/01997889-d90f-7176-b1ad-330b2aadd114?ref="
            className="bg-white text-purple-700 font-bold px-6 py-2.5 rounded-full text-xs whitespace-nowrap hover:bg-purple-50 transition-colors shadow-lg"
          >
            Get Access
          </a>
        </div>
      </div>

      {showLocationVipModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-blue-600/90 to-blue-800/90 rounded-2xl p-6 max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowLocationVipModal(false)}
              className="absolute top-3 right-3 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              Become a VIP member of instacheck.ai to access location
            </h3>

            <div className="flex justify-center mb-4">
              <MapPin className="w-16 h-16 text-white/80" />
            </div>

            <div className="flex justify-center gap-1 mb-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white/50 rounded-full" />
              ))}
            </div>

            <button
              onClick={() => {
                setShowLocationVipModal(false)
                window.open("https://pay.mycheckoutt.com/01997889-d90f-7176-b1ad-330b2aadd114?ref=", "_blank")
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Become VIP
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
