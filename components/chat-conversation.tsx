"use client"

import {
  ArrowLeft,
  Phone,
  Video,
  Camera,
  Mic,
  ImageIcon,
  Smile,
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  AlertTriangle,
} from "lucide-react"
import { useState, useEffect } from "react"

interface ChatConversationProps {
  onBack: () => void
  username: string
  avatar: string
  conversationId?: number
  onOpenVipPage?: () => void
}

interface ReelCardProps {
  creatorAvatar: string
  creatorUsername: string
  thumbnail: string
  caption?: string
  isTwitterPost?: boolean
  twitterHandle?: string
  twitterText?: string
  verified?: boolean
  onOpenVipPage?: () => void
}

function ReelCard({
  creatorAvatar,
  creatorUsername,
  thumbnail,
  caption,
  isTwitterPost,
  twitterHandle,
  twitterText,
  verified,
  onOpenVipPage,
}: ReelCardProps) {
  const [showVipModal, setShowVipModal] = useState(false)

  const handleReelClick = () => {
    console.log("[v0] Reel clicked, showing modal")
    setShowVipModal(true)
  }

  const handleGetVipAccess = () => {
    console.log("[v0] Get VIP Access clicked")
    console.log("[v0] onOpenVipPage exists:", !!onOpenVipPage)
    setShowVipModal(false)
    if (onOpenVipPage) {
      console.log("[v0] Calling onOpenVipPage")
      onOpenVipPage()
    }
  }

  return (
    <>
      <div className="bg-[#262626] rounded-xl overflow-hidden max-w-[280px] cursor-pointer" onClick={handleReelClick}>
        {/* Reel header */}
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <img
              src={creatorAvatar || "/placeholder.svg"}
              alt={creatorUsername}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-white text-sm font-medium">{creatorUsername}</span>
          {verified && (
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
            </svg>
          )}
        </div>

        {/* If Twitter/X post */}
        {isTwitterPost && (
          <div className="px-3 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img
                  src={creatorAvatar || "/placeholder.svg"}
                  alt={creatorUsername}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white text-xs font-semibold">{creatorUsername}</span>
                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818-1.79-3.818 4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </svg>
              </div>
            </div>
            <span className="text-gray-400 text-xs">@{twitterHandle}</span>
            <p className="text-white text-sm mt-2">{twitterText}</p>
          </div>
        )}

        {/* Video thumbnail */}
        <div className="relative">
          <img src={thumbnail || "/placeholder.svg"} alt="Reel" className="w-full aspect-[9/16] object-cover" />
          {/* Central play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>
          {/* Reels icon in corner */}
          <div className="absolute bottom-3 left-3 bg-black/50 rounded-lg p-1.5">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>

        {/* Caption if any */}
        {caption && (
          <div className="px-3 py-2">
            <p className="text-white text-sm">{caption}</p>
          </div>
        )}
      </div>

      {showVipModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVipModal(false)}
        >
          <div
            className="bg-gradient-to-b from-[#4a2c2c] to-[#3d2424] rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-[#d4a574]" />
              <h2 className="text-xl font-semibold text-[#f5e6d3]">Action blocked</h2>
            </div>

            <p className="text-[#c4a88a] mb-6">Become a VIP member of INSTACHECK.AI to unlock this conversation</p>

            <button
              onClick={handleGetVipAccess}
              className="w-full py-4 bg-[#5a3d3d] hover:bg-[#6a4d4d] text-[#d4a574] font-semibold rounded-xl transition-colors"
            >
              Get VIP Access
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function AudioMessage({
  duration,
  isPlayed = false,
  onClick,
  onOpenVipPage,
}: { duration: string; isPlayed?: boolean; onClick?: () => void; onOpenVipPage?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showVolumeModal, setShowVolumeModal] = useState(false)
  const [waveformHeights] = useState(() => [...Array(20)].map(() => Math.random() * 16 + 4))

  // Parse duration to get total seconds
  const parseDuration = (dur: string) => {
    const parts = dur.split(":")
    return Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
  }

  const totalSeconds = parseDuration(duration)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 100 / (totalSeconds * 10) // Update every 100ms
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, totalSeconds, progress])

  const handlePlayPause = () => {
    if (progress >= 100) {
      setProgress(0)
    }
    setIsPlaying(!isPlaying)
  }

  const currentTime = () => {
    const currentSec = Math.floor((progress / 100) * totalSeconds)
    const mins = Math.floor(currentSec / 60)
    const secs = currentSec % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleBecomeVip = () => {
    setShowVolumeModal(false)
    if (onOpenVipPage) {
      onOpenVipPage()
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl px-3 py-2 min-w-[200px]">
        <div
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white fill-white" />
          ) : (
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          )}
        </div>
        <div className="flex-1 flex items-center gap-0.5 relative">
          {waveformHeights.map((height, i) => {
            const barProgress = (i / 20) * 100
            const isActive = barProgress <= progress
            return (
              <div
                key={i}
                className={`w-0.5 rounded-full transition-colors ${isActive ? "bg-white" : "bg-white/40"}`}
                style={{
                  height: `${height}px`,
                  transform: isPlaying && isActive ? "scaleY(1.2)" : "scaleY(1)",
                  transition: "transform 0.1s ease",
                }}
              />
            )
          })}
        </div>
        <span className="text-white/80 text-xs min-w-[32px]">
          {isPlaying || progress > 0 ? currentTime() : duration}
        </span>
        <div
          className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30"
          onClick={() => setShowVolumeModal(true)}
        >
          <VolumeX className="w-3 h-3 text-white/80" />
        </div>
      </div>

      {showVolumeModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowVolumeModal(false)}
        >
          <div className="bg-[#3a5a80] rounded-2xl p-6 mx-4 max-w-sm text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Become a VIP member to unlock volume</h3>
            <div className="flex items-center justify-center gap-1 mb-6">
              <Volume2 className="w-8 h-8 text-white/60" />
              <span className="text-white/60 text-2xl">×</span>
            </div>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
              ))}
            </div>
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium"
              onClick={handleBecomeVip}
            >
              Become VIP
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function AudioWithTranscription({
  duration,
  onClick,
  onOpenVipPage,
}: { duration: string; onClick?: () => void; onOpenVipPage?: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      <AudioMessage duration={duration} onClick={onClick} onOpenVipPage={onOpenVipPage} />
      <span className="text-purple-400 text-xs ml-1 cursor-pointer hover:underline">View transcription</span>
    </div>
  )
}

function BlurredChatText({ text, blurIndices }: { text: string; blurIndices: number[] }) {
  const words = text.split(" ")
  return (
    <span>
      {words.map((word, index) => (
        <span key={index}>
          {blurIndices.includes(index) ? <span className="blur-[4px] select-none">{word}</span> : word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  )
}

// Helper function to generate dynamic dates based on current time
function getDynamicDate(type: "today" | "yesterday" | "2days" | "3days", time?: string): string {
  const now = new Date()
  
  switch (type) {
    case "today":
      return `TODAY, ${time || `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`}`
    case "yesterday":
      return `YESTERDAY, ${time || "22:30"}`
    case "2days":
      const twoDaysAgo = new Date(now)
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
      const dayName2 = twoDaysAgo.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
      return `${dayName2}, ${time || "20:00"}`
    case "3days":
      return `2 DAYS AGO`
    default:
      return `YESTERDAY, ${time || "20:00"}`
  }
}

// Function to get current time formatted
function getCurrentTime(): string {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

// Function to get a random recent time for today
function getRecentTime(hoursAgo: number = 0): string {
  const now = new Date()
  now.setHours(now.getHours() - hoursAgo)
  return `${now.getHours().toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
}

// Conversation date templates - will be replaced with dynamic dates at runtime
const conversationDateTemplates: Record<number, Array<{ position: number; type: "today" | "yesterday" | "2days" | "3days"; time?: string }>> = {
  1: [
    { position: 1, type: "yesterday", time: "22:30" },
    { position: 8, type: "today", time: "10:15" },
  ],
  2: [
    { position: 1, type: "2days", time: "20:15" },
    { position: 5, type: "yesterday", time: "14:08" },
    { position: 7, type: "today", time: "05:44" },
    { position: 10, type: "2days", time: "15:22" },
    { position: 14, type: "yesterday", time: "18:45" },
  ],
  3: [
    { position: 1, type: "yesterday", time: "19:45" },
    { position: 12, type: "today", time: "14:20" },
  ],
  4: [
    { position: 1, type: "2days", time: "21:00" },
    { position: 9, type: "yesterday", time: "15:30" },
  ],
  5: [
    { position: 1, type: "2days" },
    { position: 8, type: "yesterday", time: "20:15" },
  ],
  6: [
    { position: 1, type: "2days" },
    { position: 10, type: "yesterday" },
  ],
  7: [
    { position: 1, type: "yesterday", time: "23:45" },
    { position: 11, type: "today" },
  ],
  8: [
    { position: 1, type: "2days", time: "21:00" },
    { position: 9, type: "yesterday", time: "00:30" },
  ],
}

const conversationsData: Record<
  number,
  Array<{
    id: number
    type: string
    text?: string
    emoji?: string
    content?: string
    reel?: ReelCardProps
    audioDuration?: string
    audioDescription?: string
    blurIndices?: number[]
  }>
> = {
  // Conversation 1 - Fer*****
  1: [
    { id: 1, type: "date", text: "" },
    { id: 2, type: "received", text: "Hey hottie, guess what you forgot at my place... 😏", blurIndices: [1, 6] },
    { id: 3, type: "sent", text: "Hmm maybe I forgot on purpose? 🔥", blurIndices: [4] },
    { id: 4, type: "received", text: "Ahhh naughty lol", blurIndices: [1] },
    { id: 5, type: "received", content: "audio", audioDuration: "0:23" },
    { id: 6, type: "sent", text: "Stop teasing me like that...", blurIndices: [3] },
    { id: 7, type: "received", text: "Teasing? Me? Never 😇", blurIndices: [] },
    { id: 8, type: "date", text: "" },
    { id: 9, type: "received", text: "Good morning... woke up thinking about you 🥵", blurIndices: [3, 4] },
    { id: 10, type: "sent", text: "Thinking how? Tell me...", blurIndices: [1] },
    { id: 11, type: "received", content: "audio", audioDuration: "0:45" },
    { id: 12, type: "received", text: "I'll tell you better in person 😏", blurIndices: [0, 4] },
    { id: 13, type: "sent", text: "You're making me curious...", blurIndices: [2] },
    { id: 14, type: "received", text: "That's the intention 🔥", blurIndices: [3] },
    { id: 15, type: "reaction", emoji: "🥵" },
  ],

  2: [
    { id: 1, type: "date", text: "" },
    {
      id: 2,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/images/ash1.jpeg",
        creatorUsername: "barretokeli ✓",
        thumbnail: "/images/ash1.jpeg",
      },
    },
    { id: 3, type: "reaction", emoji: "🥲" },
    { id: 4, type: "sent", text: "Found this one sad", blurIndices: [1] },
    { id: 5, type: "date", text: "" },
    {
      id: 6,
      type: "sent",
      content: "reel",
      reel: {
        creatorAvatar: "/images/ash2.jpeg",
        creatorUsername: "giuliogroebert",
        thumbnail: "/images/ash2.jpeg",
      },
    },
    { id: 7, type: "date", text: "" },
    {
      id: 8,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/images/ash3.jpeg",
        creatorUsername: "powderfluff... ✓",
        thumbnail: "/images/ash3.jpeg",
      },
    },
    {
      id: 9,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/images/ash4.jpeg",
        creatorUsername: "grilabr",
        thumbnail: "/images/ash4.jpeg",
        isTwitterPost: true,
        twitterHandle: "grilabr",
        twitterText: "Brasileiro aprendendo espanhol:",
      },
    },
    { id: 10, type: "date", text: "" },
    {
      id: 11,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/images/ash5.jpeg",
        creatorUsername: "lucass_fukuda",
        thumbnail: "/images/ash5.jpeg",
        caption: "É por isso que você não tá evoluindo nos treinos...",
      },
    },
    { id: 12, type: "reaction", emoji: "😂" },
    {
      id: 13,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/images/ash6.jpeg",
        creatorUsername: "elpadrinotv_",
        thumbnail: "/images/ash6.jpeg",
      },
    },
    { id: 14, type: "date", text: "" },
    {
      id: 15,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/images/ash7.jpeg",
        creatorUsername: "fovworld",
        thumbnail: "/images/ash7.jpeg",
      },
    },
  ],

  // Conversation 3 - Lac*****
  3: [
    { id: 1, type: "date", text: "" },
    { id: 2, type: "sent", text: "Hey stranger... I missed you", blurIndices: [1, 4] },
    { id: 3, type: "received", text: "Missed me? Sure... 😏", blurIndices: [0] },
    { id: 4, type: "sent", text: "I'm being serious", blurIndices: [] },
    { id: 5, type: "received", content: "audio", audioDuration: "0:18" },
    { id: 6, type: "sent", text: "Stop laughing at me lol", blurIndices: [2, 3] },
    { id: 7, type: "received", text: "You disappear then come back missing me", blurIndices: [1, 5] },
    { id: 8, type: "sent", text: "I can make it up to you 🔥", blurIndices: [1] },
    { id: 9, type: "received", text: "Hmm how?", blurIndices: [] },
    { id: 10, type: "sent", content: "audio", audioDuration: "0:32" },
    { id: 11, type: "received", text: "Ooh... liked the proposal 😈", blurIndices: [1, 3] },
    { id: 12, type: "date", text: "" },
    { id: 13, type: "sent", text: "So, shall we schedule?", blurIndices: [2] },
    { id: 14, type: "received", text: "Ok we'll talk later", blurIndices: [] },
    { id: 15, type: "reaction", emoji: "😘" },
  ],

  // Conversation 4 - And*****
  4: [
    { id: 1, type: "date", text: "" },
    { id: 2, type: "received", text: "Saw you were online and didn't text me 😤", blurIndices: [3, 6] },
    { id: 3, type: "sent", text: "Lol was waiting for you to text first", blurIndices: [2] },
    { id: 4, type: "received", text: "Oh really? Playing hard to get?", blurIndices: [2] },
    { id: 5, type: "sent", text: "It worked right 😏", blurIndices: [0] },
    { id: 6, type: "received", content: "audio", audioDuration: "0:28" },
    { id: 7, type: "sent", text: "That laugh... 🥵", blurIndices: [1] },
    { id: 8, type: "received", text: "Stop lol", blurIndices: [] },
    { id: 9, type: "date", text: "" },
    { id: 10, type: "sent", text: "Dreamed about you", blurIndices: [1] },
    { id: 11, type: "received", text: "Whoa... tell me more 👀", blurIndices: [1] },
    { id: 12, type: "sent", content: "audio", audioDuration: "0:55" },
    { id: 13, type: "received", text: "Oh my God lol", blurIndices: [] },
    { id: 14, type: "reaction", emoji: "👍" },
    { id: 15, type: "sent", text: "Reacted with 👍 to your message", blurIndices: [] },
  ],

  // Conversation 5 - Bru****
  5: [
    { id: 1, type: "date", text: "" },
    { id: 2, type: "received", text: "I'm coming to town next week 👀", blurIndices: [2, 3] },
    { id: 3, type: "sent", text: "Really?! Coming to see me right", blurIndices: [2] },
    { id: 4, type: "received", text: "If you want...", blurIndices: [1] },
    { id: 5, type: "sent", text: "Stop playing hard to get 🔥", blurIndices: [2, 4] },
    { id: 6, type: "received", content: "audio", audioDuration: "0:41" },
    { id: 7, type: "sent", text: "Now I'm excited", blurIndices: [1] },
    { id: 8, type: "date", text: "" },
    { id: 9, type: "received", text: "Already booked the hotel... room with a view 😏", blurIndices: [2, 4] },
    { id: 10, type: "sent", text: "The view will be the last thing we'll look at", blurIndices: [1, 5, 8] },
    { id: 11, type: "received", text: "🥵🥵🥵", blurIndices: [] },
    { id: 12, type: "received", text: "I'm in town and wanted to see you", blurIndices: [2, 5] },
    { id: 13, type: "sent", text: "Send me the location", blurIndices: [2] },
    { id: 14, type: "received", content: "audio", audioDuration: "0:15" },
    { id: 15, type: "received", text: "Come quick...", blurIndices: [0] },
    { id: 16, type: "reaction", emoji: "🔥" },
  ],

  // Conversation 6 - lui*****
  6: [
    { id: 1, type: "date", text: "" },
    { id: 2, type: "received", text: "Check this reel lol reminded me of you", blurIndices: [2, 4] },
    {
      id: 3,
      type: "received",
      content: "reel",
      reel: {
        creatorAvatar: "/images/lui-reel.jpeg",
        creatorUsername: "melodyofici...",
        thumbnail: "/images/lui-reel.jpeg",
        caption: "",
        verified: true,
      },
    },
    { id: 4, type: "sent", text: "Lol why did it remind you of me?", blurIndices: [2] },
    { id: 5, type: "received", text: "Because you're like this 😏", blurIndices: [3] },
    { id: 6, type: "sent", text: "Like what?", blurIndices: [] },
    { id: 7, type: "received", content: "audio", audioDuration: "0:33" },
    { id: 8, type: "sent", text: "Hmm got it... so you liked it right 🔥", blurIndices: [1, 3] },
    { id: 9, type: "received", text: "Maybe...", blurIndices: [] },
    { id: 10, type: "date", text: "" },
    { id: 11, type: "sent", text: "So, when will you stop with maybe and admit it?", blurIndices: [3, 5] },
    { id: 12, type: "received", text: "Admit what?", blurIndices: [1] },
    { id: 13, type: "sent", text: "That you want me 😈", blurIndices: [1] },
    { id: 14, type: "received", content: "audio", audioDuration: "0:22" },
    { id: 15, type: "reaction", emoji: "😏" },
  ],

  // Conversation 7 - ron*****
  7: [
    { id: 1, type: "date", text: "" },
    { id: 2, type: "received", text: "Hey... here thinking about some things 🥵", blurIndices: [3, 5] },
    { id: 3, type: "sent", text: "What things? 👀", blurIndices: [1] },
    { id: 4, type: "received", content: "audio", audioDuration: "0:48" },
    { id: 5, type: "sent", text: "Oh my... now I'm feeling it too", blurIndices: [2, 4] },
    { id: 6, type: "received", text: "Feeling what? 😏", blurIndices: [0] },
    { id: 7, type: "sent", text: "You know...", blurIndices: [1] },
    { id: 8, type: "received", text: "I want to hear you say it", blurIndices: [1, 3] },
    { id: 9, type: "sent", content: "audio", audioDuration: "0:35" },
    { id: 10, type: "received", text: "🔥🔥🔥 need to see you soon", blurIndices: [1, 3] },
    { id: 11, type: "date", text: "" },
    { id: 12, type: "sent", text: "Woke up missing you", blurIndices: [2] },
    { id: 13, type: "received", text: "Missing me or what I said last night?", blurIndices: [1, 5] },
    { id: 14, type: "sent", text: "Both 😈", blurIndices: [1] },
    { id: 15, type: "received", content: "audio", audioDuration: "0:19" },
  ],

  // Conversation 8 - alex*****
  8: [
    { id: 1, type: "date", text: "TUESDAY, 21:00" },
    { id: 2, type: "received", text: "Was looking at your photos... you look different 🔥", blurIndices: [1, 3, 5] },
    { id: 3, type: "sent", text: "Different good or bad?", blurIndices: [0] },
    { id: 4, type: "received", text: "Very good... too good even", blurIndices: [1, 3] },
    { id: 5, type: "received", content: "audio", audioDuration: "0:27" },
    { id: 6, type: "sent", text: "Thanks... you look good too 😏", blurIndices: [3, 5] },
    { id: 7, type: "received", text: "We make a good match right", blurIndices: [1] },
    { id: 8, type: "sent", text: "In everything 🔥", blurIndices: [1] },
    { id: 9, type: "date", text: "WEDNESDAY, 00:30" },
    { id: 10, type: "received", content: "audio", audioDuration: "0:52" },
    { id: 11, type: "sent", text: "Stop sending audios like this at night", blurIndices: [2, 4] },
    { id: 12, type: "received", text: "Why? Don't you like it?", blurIndices: [2] },
    { id: 13, type: "sent", text: "I like it too much... that's the problem 🥵", blurIndices: [1, 4] },
    { id: 14, type: "received", text: "Then let me be your problem 😈", blurIndices: [1, 4] },
    { id: 15, type: "reaction", emoji: "💀" },
  ],
}

export default function ChatConversation({
  onBack,
  username,
  avatar,
  conversationId,
  onOpenVipPage,
}: ChatConversationProps) {
  const [message, setMessage] = useState("")
  const [showVipModal, setShowVipModal] = useState(false)
  const [showBlockedModal, setShowBlockedModal] = useState(false)

  // Process chat messages with dynamic dates
  const chatMessages = conversationId ? (conversationsData[conversationId] || []).map((msg) => {
    if (msg.type === "date" && conversationId && conversationDateTemplates[conversationId]) {
      const template = conversationDateTemplates[conversationId].find(t => t.position === msg.id)
      if (template) {
        return {
          ...msg,
          text: getDynamicDate(template.type, template.time)
        }
      }
    }
    return msg
  }) : []

  const getOnlineStatus = (id?: number) => {
    switch (id) {
      case 1: // Fer - online agora
        return "Online"
      case 2: // Ash
        return "Online 15 min ago"
      case 3: // Lac
        return "Online 2 h ago"
      case 4: // And
        return "Online 6 h ago"
      case 5: // Bru
        return "Online 12 h ago"
      case 6: // lui
        return "Online 1 d ago"
      case 7: // ron
        return "Online 2 d ago"
      case 8: // alex
        return "Online 38 h ago"
      default:
        return "Online 2 d ago"
    }
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col max-w-[480px] mx-auto">
      {showBlockedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowBlockedModal(false)}
        >
          <div
            className="bg-gradient-to-b from-[#5a3d3d] to-[#4a2d2d] rounded-2xl px-8 py-6 mx-4 text-center max-w-[320px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <VolumeX className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white text-lg font-semibold">Action blocked</h3>
            </div>
            <p className="text-gray-200 text-sm mb-5">
              Become a VIP member of Stalkea.ai
              <br />
              to unlock this conversation
            </p>
            <button
              className="w-full bg-[#8b6b6b] hover:bg-[#9a7a7a] text-white font-medium py-3 px-6 rounded-xl transition-colors"
              onClick={() => {
                setShowBlockedModal(false)
                window.location.href = "/#contact"
              }}
            >
              Get VIP Access
            </button>
          </div>
        </div>
      )}

      {showVipModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowVipModal(false)}
        >
          <div
            className="bg-gradient-to-b from-gray-700/90 to-gray-800/90 backdrop-blur-md rounded-2xl px-8 py-6 mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-lg font-medium mb-4">
              Become a VIP member to
              <br />
              unlock volume
            </h3>
            <div className="flex justify-center mb-4">
              <VolumeX className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-500" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#000000] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-800">
              <img
                src={avatar || "/placeholder.svg"}
                alt={username}
                className="w-full h-full object-cover blur-sm rounded-full"
              />
            </div>
            <div>
              <span className="font-semibold text-base">{username}</span>
              <p className="text-xs text-gray-400">{getOnlineStatus(conversationId)}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Phone className="w-6 h-6 cursor-pointer" />
            <Video className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm">No messages yet</p>
          </div>
        ) : (
          chatMessages.map((msg) => {
            if (msg.type === "date") {
              return (
                <div key={msg.id} className="flex justify-center my-4">
                  <span className="text-gray-500 text-xs uppercase">{msg.text}</span>
                </div>
              )
            }

            if (msg.type === "reaction") {
              return (
                <div key={msg.id} className="flex items-start ml-2">
                  <div className="bg-[#262626] rounded-full px-2 py-1">
                    <span className="text-xl">{msg.emoji}</span>
                  </div>
                </div>
              )
            }

            if (msg.type === "received" && msg.content === "audio") {
              return (
                <div key={msg.id} className="flex items-end gap-2">
                  <div className="w-8 h-8 flex-shrink-0" style={{ clipPath: "circle(50%)" }}>
                    <img src={avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover blur-sm" />
                  </div>
                  <AudioWithTranscription
                    duration={msg.audioDuration || "0:00"}
                    onClick={() => setShowVipModal(true)}
                    onOpenVipPage={onOpenVipPage}
                  />
                </div>
              )
            }

            if (msg.type === "sent" && msg.content === "audio") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <AudioWithTranscription
                    duration={msg.audioDuration || "0:00"}
                    onClick={() => setShowVipModal(true)}
                    onOpenVipPage={onOpenVipPage}
                  />
                </div>
              )
            }

            if (msg.content === "reel" && msg.reel) {
              return msg.type === "received" ? (
                <div key={msg.id} className="flex items-end gap-2">
                  <ReelCard {...msg.reel} onOpenVipPage={onOpenVipPage} />
                </div>
              ) : (
                <div key={msg.id} className="flex justify-end">
                  <ReelCard {...msg.reel} onOpenVipPage={onOpenVipPage} />
                </div>
              )
            }

            if (msg.type === "received" && msg.text) {
              return (
                <div key={msg.id} className="flex items-end gap-2">
                  <div className="w-8 h-8 flex-shrink-0" style={{ clipPath: "circle(50%)" }}>
                    <img src={avatar || "/placeholder.svg"} alt="" className="w-full h-full object-cover blur-sm" />
                  </div>
                  <div className="bg-[#262626] rounded-2xl rounded-bl-md px-4 py-2 max-w-[75%]">
                    <p className="text-sm text-white">
                      <BlurredChatText text={msg.text} blurIndices={msg.blurIndices || []} />
                    </p>
                  </div>
                </div>
              )
            }

            if (msg.type === "sent" && msg.text) {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-purple-600 rounded-2xl rounded-br-md px-4 py-2 max-w-[75%]">
                    <p className="text-sm text-white">
                      <BlurredChatText text={msg.text} blurIndices={msg.blurIndices || []} />
                    </p>
                  </div>
                </div>
              )
            }

            return null
          })
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-[#000000] border-t border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowBlockedModal(true)}>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center pointer-events-none">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 bg-[#262626] rounded-full px-4 py-2.5 flex items-center pointer-events-none">
            <input
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent text-white text-sm flex-1 outline-none cursor-pointer"
              readOnly
            />
          </div>
          <Mic className="w-6 h-6 text-white pointer-events-none" />
          <ImageIcon className="w-6 h-6 text-white pointer-events-none" />
          <Smile className="w-6 h-6 text-white pointer-events-none" />
          <Heart className="w-6 h-6 text-white pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
