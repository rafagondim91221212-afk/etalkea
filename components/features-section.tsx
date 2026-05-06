import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

const benefits = [
  "Easy to use interface",
  "24/7 customer support",
  "Regular updates and improvements",
  "No hidden fees",
  "Cancel anytime",
  "Money-back guarantee",
]

export function FeaturesSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground text-balance">
              All the features you need to grow your business
            </p>
          </div>
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
