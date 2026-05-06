"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { MatrixBackground } from "@/components/matrix-background"

interface ProfileData {
  username: string
  fullName: string
  profilePicUrl: string
  postsCount: number
  followersCount: number
  followingCount: number
  biography: string
}

interface ProfileConfirmationProps {
  profileData: ProfileData
  onCorrect: () => void
  onConfirm: () => void
}

export function ProfileConfirmation({ profileData, onCorrect, onConfirm }: ProfileConfirmationProps) {
  console.log("[v0] Profile data received:", profileData)
  console.log("[v0] Profile pic URL:", profileData.profilePicUrl)

  const proxyImageUrl = profileData.profilePicUrl
    ? `https://wsrv.nl/?url=${encodeURIComponent(profileData.profilePicUrl)}&w=300&h=300&fit=cover&a=attention`
    : "/generic-social-media-profile.png"

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <MatrixBackground />
      <div className="relative z-10 max-w-lg w-full bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold">
              <span className="text-white">INSTACHECK</span>
              <span className="text-purple-500">.AI</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
          Confirm Instagram
        </h2>

        <p className="text-white text-center mb-6">
          Do you want to spy on the profile <span className="font-semibold">@{profileData.username}</span>?
        </p>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-6">
          {/* Avatar */}
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img
                  src={proxyImageUrl || "/placeholder.svg"}
                  alt={profileData.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("[v0] Image proxy failed, using placeholder")
                    e.currentTarget.src = "/generic-social-media-profile.png"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <p className="text-white font-bold text-xl">{profileData.postsCount.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">posts</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl">{profileData.followersCount.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">followers</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl">{profileData.followingCount.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">following</p>
            </div>
          </div>

          {/* Bio */}
          <div className="text-left w-full bg-[#0a0a0a] rounded-lg p-4 mb-4">
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{profileData.biography}</p>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">
            <span className="font-semibold">Warning:</span> Limit of only 1 search per device, make sure you typed the
            username correctly.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onCorrect}
            variant="outline"
            className="flex-1 h-12 bg-transparent border-gray-700 text-white hover:bg-gray-800"
          >
            Correct @
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold"
          >
            Confirm →
          </Button>
        </div>
      </div>
    </section>
  )
}
