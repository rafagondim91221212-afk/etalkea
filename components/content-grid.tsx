import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Sparkles, Users } from "lucide-react"

const features = [
  {
    title: "Fast Performance",
    description: "Lightning-fast load times and smooth interactions",
    icon: Zap,
  },
  {
    title: "Secure",
    description: "Bank-level security to protect your data",
    icon: Shield,
  },
  {
    title: "Modern Design",
    description: "Beautiful and intuitive user interface",
    icon: Sparkles,
  },
  {
    title: "Community",
    description: "Join a thriving community of users",
    icon: Users,
  },
]

export function ContentGrid() {
  return (
    <section id="products" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Everything you need to succeed in one powerful platform
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
