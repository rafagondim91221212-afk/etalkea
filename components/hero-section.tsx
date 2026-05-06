"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Lock, Key, Check, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { InstagramLoading } from "./instagram-loading"
import { ProfileConfirmation } from "./profile-confirmation"
import { InstagramFeed } from "./instagram-feed"
import StalkeaLanding from "./stalkea-landing"
import Image from "next/image"

function getDayOfWeek(): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[new Date().getDay()]
}

interface PreviousSearch {
  username: string
  profilePicUrl: string
  fullName: string
  biography: string
  followersCount: number
  followingCount: number
  postsCount: number
}

export function HeroSection() {
  const [username, setUsername] = useState("")
  const [showInput, setShowInput] = useState(false)
  const [showSearching, setShowSearching] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showFeed, setShowFeed] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [userProfileData, setUserProfileData] = useState<any>(null)
  const [currentDay, setCurrentDay] = useState("")
  const [showLimitReached, setShowLimitReached] = useState(false)
  const [showVipFromLimit, setShowVipFromLimit] = useState(false)
  const [previousSearch, setPreviousSearch] = useState<PreviousSearch | null>(null)

  const [displayedTitle, setDisplayedTitle] = useState("")
  const [displayedSubtitle, setDisplayedSubtitle] = useState("")
  const [titleComplete, setTitleComplete] = useState(false)
  const [profileCount, setProfileCount] = useState(81716)

  const fullTitle = "What does your Partner do when on Instagram?"
  const fullSubtitle = "Discover the truth about anyone by accessing their Instagram!"

  useEffect(() => {
    setCurrentDay(getDayOfWeek())
    const savedSearch = localStorage.getItem("instacheck_previous_search")
    if (savedSearch) {
      setPreviousSearch(JSON.parse(savedSearch))
      setShowLimitReached(true)
    }
  }, [])

  useEffect(() => {
    if (displayedTitle.length < fullTitle.length) {
      const timeout = setTimeout(() => {
        setDisplayedTitle(fullTitle.slice(0, displayedTitle.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      setTitleComplete(true)
    }
  }, [displayedTitle])

  useEffect(() => {
    if (titleComplete && displayedSubtitle.length < fullSubtitle.length) {
      const timeout = setTimeout(() => {
        setDisplayedSubtitle(fullSubtitle.slice(0, displayedSubtitle.length + 1))
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [titleComplete, displayedSubtitle])

  useEffect(() => {
    const interval = setInterval(() => {
      // Oscila entre -50 e +50 do valor base
      const variation = Math.floor(Math.random() * 100) - 50
      setProfileCount(81716 + variation)
    }, 500) // aumentei de 100ms para 500ms para ficar mais lento
    return () => clearInterval(interval)
  }, [])

  const renderTitle = () => {
    const partnerStart = fullTitle.indexOf("Partner")
    const partnerEnd = partnerStart + "Partner".length

    return (
      <>
        {displayedTitle.slice(0, partnerStart)}
        <span className="text-purple-500">
          {displayedTitle.slice(partnerStart, Math.min(displayedTitle.length, partnerEnd))}
        </span>
        {displayedTitle.slice(partnerEnd)}
        <span className="animate-pulse">|</span>
      </>
    )
  }

  const renderSubtitle = () => {
    const anyoneStart = fullSubtitle.indexOf("anyone")
    const anyoneEnd = anyoneStart + "anyone".length

    return (
      <>
        {displayedSubtitle.slice(0, anyoneStart)}
        <span className="font-semibold text-white">
          {displayedSubtitle.slice(anyoneStart, Math.min(displayedSubtitle.length, anyoneEnd))}
        </span>
        {displayedSubtitle.slice(anyoneEnd)}
        {displayedSubtitle.length < fullSubtitle.length && <span className="animate-pulse">|</span>}
      </>
    )
  }

  const handleSpyClick = async () => {
    if (!showInput) {
      setShowInput(true)
      return
    }

    if (!username.trim()) {
      return
    }

    // Primeiro mostra a tela de "Procurando..."
    setShowSearching(true)

    try {
      const [profileResponse, postsResponse] = await Promise.all([
        fetch("https://instagram120.p.rapidapi.com/api/instagram/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "instagram120.p.rapidapi.com",
            "x-rapidapi-key": "42865ce77amsh6b3ec8ac168e4c3p1ae1b6jsndc1ea20ce2d0",
          },
          body: JSON.stringify({
            username: username,
          }),
        }),
        fetch("https://instagram120.p.rapidapi.com/api/instagram/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "instagram120.p.rapidapi.com",
            "x-rapidapi-key": "42865ce77amsh6b3ec8ac168e4c3p1ae1b6jsndc1ea20ce2d0",
          },
          body: JSON.stringify({
            username: username,
            maxId: "",
          }),
        }),
      ])

      const profileDataResult = await profileResponse.json()
      const postsDataResult = await postsResponse.json()

      setUserProfileData(profileDataResult)
      setProfileData(postsDataResult)
      
      // Depois de carregar os dados, vai para confirmacao
      setShowSearching(false)
      setShowConfirmation(true)
    } catch (error) {
      console.error("[v0] API Error:", error)
      setShowSearching(false)
    }
  }

  const handleLoadingConfirm = () => {
    // Depois do loading, vai pro feed
    setShowLoading(false)
    setShowFeed(true)
  }

  const handleCorrect = () => {
    setShowConfirmation(false)
    setShowLoading(false)
    setShowInput(true)
  }

  const handleConfirm = () => {
    const profile = userProfileData?.result || userProfileData
    const searchData: PreviousSearch = {
      username: username,
      profilePicUrl: profile?.profile_pic_url_hd || profile?.profile_pic_url || "/placeholder.svg",
      fullName: profile?.full_name || username,
      biography: profile?.biography || "",
      followersCount: profile?.follower_count || profile?.edge_followed_by?.count || 0,
      followingCount: profile?.following_count || profile?.edge_follow?.count || 0,
      postsCount: profile?.media_count || profile?.edge_owner_to_timeline_media?.count || 0,
    }
    localStorage.setItem("instacheck_previous_search", JSON.stringify(searchData))

    // Depois de confirmar, mostra o loading
    setShowConfirmation(false)
    setShowLoading(true)
  }

  if (showVipFromLimit && previousSearch) {
    return (
      <StalkeaLanding
        onBack={() => setShowVipFromLimit(false)}
        username={previousSearch.username || username || ""}
        profileImage={previousSearch.profilePicUrl}
        hideBack={true}
        profileData={{
          username: previousSearch.username,
          fullName: previousSearch.fullName,
          profilePicUrl: previousSearch.profilePicUrl,
          biography: previousSearch.biography || "",
          postsCount: previousSearch.postsCount || 0,
          followersCount: previousSearch.followersCount || 0,
          followingCount: previousSearch.followingCount || 0,
        }}
      />
    )
  }

  if (showLimitReached && previousSearch) {
    const proxyProfilePic = previousSearch.profilePicUrl?.includes("instagram")
      ? `https://wsrv.nl/?url=${encodeURIComponent(previousSearch.profilePicUrl)}&w=150&h=150&fit=cover`
      : previousSearch.profilePicUrl

    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8">
            {/* Profile photo with gradient border */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-green-500 via-purple-500 to-pink-500">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 p-1">
                    <Image
                      src={proxyProfilePic || "/placeholder.svg"}
                      alt={previousSearch.username}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover rounded-full"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-red-500">Limit Reached</h2>
            </div>

            <p className="text-center text-gray-300 mb-2">
              You have already used your <span className="font-bold text-white">free search</span>
            </p>
            <p className="text-center text-gray-300 mb-6">
              to spy on <span className="text-purple-500 font-semibold">@{previousSearch.username}</span>
            </p>

            <p className="text-center text-gray-400 mb-6">
              Get <span className="font-bold text-white">VIP access</span> and have full Instagram access right now!
            </p>

            <Button
              onClick={() => {
                setShowLimitReached(false)
                setShowVipFromLimit(true)
              }}
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-lg font-semibold rounded-2xl mb-4 flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Unlock VIP Access
            </Button>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-center text-red-400 text-sm">
                <span className="font-bold">Your identity is compromised!</span> {previousSearch.fullName} may be
                notified about your spying, only VIP members have their privacy preserved during spying.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (showSearching) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-2">Searching...</h2>
            <p className="text-gray-400 text-center mb-4">
              Looking for <span className="text-purple-500 font-semibold">@{username}</span>
            </p>
            <p className="text-gray-500 text-center text-sm">Please wait while we fetch the profile data</p>
          </div>
        </div>
      </section>
    )
  }

  if (showConfirmation && profileData) {
    const profile = userProfileData?.result || userProfileData

    return (
      <ProfileConfirmation
        profileData={{
          username: username,
          fullName: profile?.full_name || username,
          profilePicUrl: profile?.profile_pic_url_hd || profile?.profile_pic_url || "/placeholder.svg",
          postsCount: profile?.media_count || profile?.edge_owner_to_timeline_media?.count || 0,
          followersCount: profile?.follower_count || profile?.edge_followed_by?.count || 0,
          followingCount: profile?.following_count || profile?.edge_follow?.count || 0,
          biography: profile?.biography || "",
        }}
        onCorrect={handleCorrect}
        onConfirm={handleConfirm}
      />
    )
  }

  if (showFeed && profileData) {
    const profile = userProfileData?.result || userProfileData

    const enrichedProfileData = {
      ...profileData,
      username: username,
      fullName: profile?.full_name || username,
      profilePicUrl: profile?.profile_pic_url_hd || profile?.profile_pic_url || "/placeholder.svg",
      biography: profile?.biography || "",
      followersCount: profile?.follower_count || profile?.edge_followed_by?.count || 0,
      followingCount: profile?.following_count || profile?.edge_follow?.count || 0,
      postsCount:
        profile?.media_count || profile?.edge_owner_to_timeline_media?.count || profileData.result?.edges?.length || 0,
    }

    return <InstagramFeed profileData={enrichedProfileData} username={username} />
  }

  if (showLoading) {
    return <InstagramLoading username={username} onConfirm={handleLoadingConfirm} />
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-2 border-purple-400">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">
                <span className="text-white">INSTACHECK</span>
                <span className="text-purple-500">.AI</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6 leading-tight min-h-[80px]">
            {renderTitle()}
          </h1>

          {!showInput ? (
            <p className="text-gray-400 text-center mb-8 text-lg min-h-[56px]">
              {titleComplete ? renderSubtitle() : ""}
            </p>
          ) : (
            <div className="mb-8">
              <p className="text-gray-400 text-center mb-6 text-base">
                Enter the username of the person to be spied on, without the "@" symbol
              </p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 text-lg font-mono">@</span>
                <Input
                  type="text"
                  placeholder="Ex: partner_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-gray-700 text-white pl-8 h-12 text-base placeholder:text-gray-600"
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleSpyClick}
            className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-2xl mb-8 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Spy Now
          </Button>

          <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Lock className="w-4 h-4 text-purple-500" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Key className="w-4 h-4 text-purple-500" />
              <span>No Password</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Check className="w-4 h-4 text-purple-500" />
              <span>Free Trial</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            <span className="text-purple-500 font-semibold">+{profileCount.toLocaleString("en-US")}</span> profiles
            analyzed today ({currentDay || "..."})
          </p>
        </div>
      </div>
    </section>
  )
}
