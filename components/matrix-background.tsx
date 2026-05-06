"use client"

import { useEffect, useRef } from "react"

export function MatrixBackground() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const columns = Math.floor(window.innerWidth / 20)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const createColumn = (index: number) => {
      const column = document.createElement("div")
      column.className = "matrix-column absolute top-0 text-purple-500/30 font-mono text-sm"
      column.style.left = `${index * 20}px`
      column.style.animationDuration = `${Math.random() * 10 + 10}s`
      column.style.animationDelay = `${Math.random() * 5}s`

      const height = Math.floor(Math.random() * 20) + 10
      let text = ""
      for (let i = 0; i < height; i++) {
        text += letters[Math.floor(Math.random() * letters.length)] + "\n"
      }
      column.textContent = text

      return column
    }

    for (let i = 0; i < columns; i++) {
      canvasRef.current.appendChild(createColumn(i))
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = ""
      }
    }
  }, [])

  return <div ref={canvasRef} className="fixed inset-0 overflow-hidden pointer-events-none" />
}
