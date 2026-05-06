"use client"

import { ArrowLeft, Plus, Edit3, Lock, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import StalkeaLanding from "./stalkea-landing"
import ChatConversation from "./chat-conversation"

interface ProfileData {
  username: string
  fullName: string
  profilePicUrl: string
  biography: string
  postsCount: number
  followersCount: number
  followingCount: number
}

interface InstagramMessagesProps {
  onBack: () => void
  username: string
  profilePicUrl?: string
  profileData?: ProfileData
}

export default function InstagramMessages({ onBack, username, profilePicUrl, profileData }: InstagramMessagesProps) {
  const [timeRemaining, setTimeRemaining] = useState(586)
  const [showVipPage, setShowVipPage] = useState(false)
  const [showChat, setShowChat] = useState<{ id: number; username: string; avatar: string } | null>(null)
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [readMessages, setReadMessages] = useState<number[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const rawUserImage = profileData?.profilePicUrl || profilePicUrl || ""
  const hasValidImage = rawUserImage && rawUserImage !== "/placeholder.svg" && rawUserImage.length > 0
  const userImage = hasValidImage ? rawUserImage : "/generic-social-media-profile.png"

  const proxyUserImage = userImage.startsWith("http")
    ? `https://wsrv.nl/?url=${encodeURIComponent(userImage)}&w=150&h=150&fit=cover`
    : userImage

  const notes = [
    {
      id: 1,
      username: "Your note",
      image: proxyUserImage,
      isOwn: true,
      hasNote: false,
      noteText: "Share updates",
      hasMusic: false,
      musicName: "",
    },
    {
      id: 2,
      username: "Yoa*******",
      image: "/images/1.jpeg",
      hasNote: true,
      noteText: "Feeling lazy today 😮‍💨😮‍💨",
      hasMusic: false,
      musicName: "",
    },
    {
      id: 3,
      username: "Cin*******",
      image: "/young-woman-selfie.jpg",
      hasNote: true,
      noteText: "",
      hasMusic: true,
      musicName: "Heart",
      musicArtist: "Less Group...",
    },
    {
      id: 4,
      username: "Swi*******",
      image: "/woman-smiling-photo.jpg",
      hasNote: true,
      noteText: "In the mood 🥵",
      hasMusic: false,
      musicName: "",
    },
    {
      id: 5,
      username: "Mar*******",
      image: "/brunette-woman-profile.jpg",
      hasNote: true,
      noteText: "let's hang out? 🔥",
      hasMusic: false,
      musicName: "",
    },
  ]

  const messages = [
    {
      id: 1,
      username: "Fer*****",
      message: "Hey hottie, guess what you forgot...",
      time: "Now",
      unread: true,
      locked: false,
      avatar: "/images/2.jpeg",
    },
    {
      id: 2,
      username: "Ash*****",
      message: "Forwarded a reel from jor...",
      time: "33 min",
      unread: true,
      locked: false,
      avatar: "/blonde-woman-instagram.jpg",
    },
    {
      id: 3,
      username: "Lac*****",
      message: "Ok we'll talk later",
      time: "2 h",
      unread: false,
      locked: false,
      avatar: "/brunette-woman-profile.jpg",
    },
    {
      id: 4,
      username: "And*****",
      message: "Reacted with 👍 to your message",
      time: "6 h",
      unread: false,
      locked: false,
      avatar: "/images/man-gray-shirt.jpeg",
    },
    {
      id: 5,
      username: "Bru****",
      message: "4 new messages",
      time: "22 h",
      unread: true,
      locked: false,
      avatar: "/young-woman-selfie.jpg",
    },
    {
      id: 6,
      username: "lui*****",
      message: "Sent a reel from dr.diegooficial",
      time: "2 d",
      unread: false,
      locked: false,
      avatar: "/images/man-tattoo-chest.jpeg",
    },
    {
      id: 7,
      username: "ron*****",
      message: "Sent Saturday",
      time: "2 d",
      unread: false,
      locked: false,
      avatar: "/images/man-mirror-selfie.jpeg",
    },
    {
      id: 8,
      username: "alex*****",
      message: "Sent a voice message",
      time: "2 d",
      unread: false,
      locked: false,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 9,
      username: "abb*****",
      message: "Sent a voice message",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 10,
      username: "ale*****",
      message: "hahahaha",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 11,
      username: "ana*****",
      message: "Liked your message",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const handleOpenChat = (msg: { id: number; username: string; avatar: string; locked: boolean }) => {
    if (msg.locked) {
      setShowLockedModal(true)
    } else {
      if (!readMessages.includes(msg.id)) {
        setReadMessages((prev) => [...prev, msg.id])
      }
      setShowChat({ id: msg.id, username: msg.username, avatar: msg.avatar })
    }
  }

  const handleOpenVipPage = () => {
    console.log("[v0] handleOpenVipPage called in InstagramMessages")
    setShowChat(null) // Clear showChat first so VIP page can show
    setShowVipPage(true)
  }

  if (showVipPage) {
    return (
      <StalkeaLanding
        onBack={() => setShowVipPage(false)}
        username={username}
        profileImage={profilePicUrl}
        profileData={profileData}
        hideBack={true}
      />
    )
  }

  if (showChat) {
    return (
      <ChatConversation
        onBack={() => setShowChat(null)}
        username={showChat.username}
        avatar={showChat.avatar}
        conversationId={showChat.id}
        onOpenVipPage={handleOpenVipPage}
      />
    )
  }

  if (showLockedModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowLockedModal(false)} />
        <div className="relative z-10 mx-4 w-full max-w-sm">
          <div className="bg-gradient-to-b from-[#4a3028] to-[#3d2520] rounded-3xl p-6 shadow-2xl border border-[#5a4038]">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#d4a574]" />
              <h3 className="text-[#e8d5c4] font-semibold text-lg">Action blocked</h3>
            </div>
            <p className="text-[#c4a88c] text-center text-sm mb-6">
              Become a VIP member of INSTACHECK.AI to unlock this conversation
            </p>
            <button
              onClick={handleOpenVipPage}
              className="w-full bg-[#6b4a3a] hover:bg-[#7d5a48] text-[#e8d5c4] font-semibold py-3.5 rounded-xl transition-colors"
            >
              Get VIP Access
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen pb-24 max-w-[480px] mx-auto">
      <div className="sticky top-0 z-30 bg-[#000000] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
            <span className="font-semibold text-base">{username}</span>
          </div>
          <div className="flex items-center gap-4">
            <Plus className="w-6 h-6 cursor-pointer" />
            <Edit3 className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="px-4 pt-3 pb-2">
        <div className="bg-[#262626] rounded-full px-4 py-2.5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-gray-400 text-sm">Interact with Meta AI or search</span>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col items-center justify-end flex-shrink-0 relative cursor-pointer min-h-[140px]"
            >
              {(note.noteText || note.hasMusic) && (
                <div className="relative mb-2">
                  <div className="bg-[#262626] rounded-2xl px-3 py-2 max-w-[100px] min-w-[70px]">
                    {note.hasMusic ? (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-white">
                          <span className="text-xs font-medium">|||</span>
                          <span className="text-xs">)</span>
                          <span className="text-[11px] font-medium ml-1 truncate">{note.musicName}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 truncate w-full text-center">{note.musicArtist}</p>
                      </div>
                    ) : (
                      <p className="text-[11px] text-white text-center leading-tight whitespace-pre-wrap">
                        {note.noteText}
                      </p>
                    )}
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#262626]" />
                </div>
              )}

              <div
                className={`
                  w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-800 relative flex-shrink-0
                  ${note.isOwn ? "ring-[3px] ring-green-500" : ""}
                `}
              >
                <img
                  src={note.image.startsWith("http") ? note.image : note.image}
                  alt={note.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=150&width=150"
                  }}
                />
                {note.isOwn && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] mt-1.5 text-gray-300 truncate w-[72px] text-center">{note.username}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-bold text-base">Messages</h2>
        <span className="text-blue-500 text-sm font-semibold">Requests (4)</span>
      </div>

      <div className="divide-y divide-gray-800">
        {messages.map((msg) => {
          const isUnread = msg.unread && !readMessages.includes(msg.id)

          return (
            <div
              key={msg.id}
              className="px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              onClick={() => handleOpenChat(msg)}
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-800 ring-2 ring-transparent">
                  <img
                    src={msg.avatar || "/placeholder.svg"}
                    alt={msg.username}
                    className="w-full h-full object-cover blur-[3px] rounded-full"
                  />
                </div>
                {msg.locked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-sm text-white">{msg.username}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${isUnread ? "text-white font-medium" : "text-gray-400"}`}>
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-gray-400 text-xs">• {msg.time}</span>
                    {isUnread && <div className="w-2 h-2 rounded-full bg-[#0095f6] flex-shrink-0"></div>}
                    {!msg.locked && !isUnread && (
                      <svg
                        className="w-6 h-6 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto">
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs flex items-center gap-1.5">
                Preview available for {formatTime(timeRemaining)}
                <span className="inline-block w-2 h-2 rounded-full bg-white/40 animate-pulse"></span>
              </p>
              <p className="text-purple-100 text-[10px] leading-tight mt-0.5">
                You got 10 minutes to test our tool for free, but to unlock all features and have permanent access you
                need to be a VIP member.
              </p>
            </div>
            <button
              onClick={handleOpenVipPage}
              className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full text-xs whitespace-nowrap hover:bg-purple-50 transition-colors flex-shrink-0 shadow-lg"
            >
              Become VIP
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border-t border-gray-800 px-4 py-2 flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
          <div className="flex-1 text-center">
            <span className="text-gray-300 font-semibold text-sm">instacheck.ai</span>
          </div>
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
