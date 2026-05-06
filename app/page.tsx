import { MatrixBackground } from "@/components/matrix-background"
import { HeroSection } from "@/components/hero-section"

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black">
      <MatrixBackground />
      <main className="relative z-10">
        <HeroSection />
      </main>
    </div>
  )
}
