"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingCart, CreditCard } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    features: ["Up to 10 users", "5GB storage", "Basic support"],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: ["Up to 50 users", "50GB storage", "Priority support", "Advanced features"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    features: ["Unlimited users", "500GB storage", "24/7 support", "Custom solutions"],
  },
]

export function CheckoutSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleCheckout = (planName: string) => {
    setSelectedPlan(planName)
    // Here you would integrate with a payment provider
    console.log(`[v0] Checkout initiated for plan: ${planName}`)
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Select the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-2 transition-all hover:shadow-lg ${
                  plan.popular ? "border-primary" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-foreground mt-4">
                    {plan.price}
                    <span className="text-base font-normal text-muted-foreground">{plan.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <ShoppingCart className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full gap-2"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleCheckout(plan.name)}
                  >
                    <CreditCard className="h-4 w-4" />
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedPlan && (
            <Card className="max-w-2xl mx-auto border-primary">
              <CardHeader>
                <CardTitle>Complete Your Purchase</CardTitle>
                <CardDescription>Enter your details to get started with {selectedPlan}</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card">Card Number</Label>
                    <Input id="card" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <CreditCard className="h-4 w-4" />
                    Complete Checkout
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
