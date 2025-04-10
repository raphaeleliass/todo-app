import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import React from "react";

export default function Pricing() {
  const pricings = [
    {
      plan: "Basic",
      price: "10",
      benefits: ["Access to core features", "Basic support", "10 GB storage"],
    },
    {
      plan: "Pro",
      price: "25",
      benefits: [
        "All Basic features",
        "Priority support",
        "50 GB storage",
        "Advanced analytics",
      ],
    },
    {
      plan: "Enterprise",
      price: "50",
      benefits: [
        "All Pro features",
        "Dedicated support",
        "Unlimited storage",
        "Custom integrations",
      ],
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto flex w-full flex-col items-center justify-center gap-8 px-4">
        <h2 className="text-3xl font-bold tracking-tight">Prices & Plans</h2>
        <div className="flex w-full flex-row flex-wrap items-stretch justify-center gap-4">
          {pricings.map((price) => (
            <Card key={price.plan} className="flex w-full max-w-xs flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {price.plan}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${price.price}</span>
                  <span className="text-sm text-muted-foreground">
                    /monthly
                  </span>
                </div>
                <ul className="space-y-2">
                  {price.benefits.map((benefit, index) => (
                    <li
                      className="flex flex-row items-center gap-2 text-sm"
                      key={index} // Consider using a more stable key if available
                    >
                      <CheckCircle
                        size={16}
                        className="shrink-0 text-green-600"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {/* Placeholder for potential button or link */}
                {/* <Button className="w-full">Choose Plan</Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
