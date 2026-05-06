"use client"

import { useState, useEffect } from "react"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MatrixBackground } from "@/components/matrix-background"

interface InstagramLoadingProps {
  username: string
  onConfirm: () => void
}

const generateRandomPassword = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

export function InstagramLoading({ username, onConfirm }: InstagramLoadingProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [displayPassword, setDisplayPassword] = useState("**************")
  const [passwordStatus, setPasswordStatus] = useState<"testing" | "wrong" | "correct">("testing")
  const [attemptCount, setAttemptCount] = useState(0)

  useEffect(() => {
    let passwordChangeCount = 0
    
    const passwordInterval = setInterval(() => {
      setDisplayPassword(generateRandomPassword(14))
      passwordChangeCount++
      
      // A cada 8 mudancas de senha, mostra "senha errada"
      if (passwordChangeCount % 8 === 0) {
        setPasswordStatus("wrong")
        setAttemptCount(prev => prev + 1)
        
        // Volta para "testing" apos 400ms
        setTimeout(() => {
          setPasswordStatus("testing")
        }, 400)
      }
    }, 100)

    const timer = setTimeout(() => {
      clearInterval(passwordInterval)
      setDisplayPassword("**************")
      setPasswordStatus("correct")
      setShowSuccess(true)
    }, 6000)

    return () => {
      clearTimeout(timer)
      clearInterval(passwordInterval)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <MatrixBackground />
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          {/* Instagram Logo */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-script text-white mb-8" style={{ fontFamily: "cursive" }}>
              Instagram
            </h1>
          </div>

          {/* Login Fields */}
          <div className="space-y-3 mb-4">
            <Input
              type="text"
              value={username}
              readOnly
              className="bg-[#121212] border-gray-800 text-white h-11 text-sm"
            />
            <Input
              type="text"
              value={displayPassword}
              readOnly
              className="bg-[#121212] border-gray-800 text-white h-11 text-sm font-mono"
            />
          </div>

          <div
            className={`${
              showSuccess 
                ? "bg-green-600/20 border-green-500/30" 
                : passwordStatus === "wrong"
                  ? "bg-red-600/20 border-red-500/30"
                  : "bg-purple-600/20 border-purple-500/30"
            } border rounded-lg p-4 mb-4 flex items-center gap-3 transition-colors duration-200`}
          >
            <div
              className={`w-10 h-10 rounded-full ${
                showSuccess 
                  ? "bg-green-600" 
                  : passwordStatus === "wrong"
                    ? "bg-red-600"
                    : "bg-purple-600"
              } flex items-center justify-center flex-shrink-0 transition-colors duration-200`}
            >
              {showSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : passwordStatus === "wrong" ? (
                <XCircle className="w-5 h-5 text-white" />
              ) : (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              )}
            </div>
            <div>
              <p className="text-white font-medium text-sm mb-1">
                {showSuccess 
                  ? "Encryption successfully broken" 
                  : passwordStatus === "wrong"
                    ? "Wrong password"
                    : "Breaking account encryption"
                }
              </p>
              {!showSuccess && (
                <p className="text-gray-400 text-xs">
                  {passwordStatus === "wrong" 
                    ? `Attempt ${attemptCount} failed, trying again...`
                    : "Testing password combinations..."
                  }
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={onConfirm}
            className="w-full h-11 bg-[#0095f6] hover:bg-[#0095f6]/90 text-white text-sm font-semibold rounded-lg mb-4"
          >
            Log In
          </Button>

          <div className="text-center mb-4">
            <a href="#" className="text-[#00a8ff] text-sm">
              Forgot password?
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
