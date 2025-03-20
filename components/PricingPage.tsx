import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PricingPlan, pricingPlan } from "@/lib/pricingplan";

const PricingPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h1 className="font-extrabold text-3xl">Plans and Pricing</h1>
        <p className="text-gray-500">
          Receive unlimited credits when you pay early, and save on your plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingPlan.map((plan: PricingPlan, index: number) => (
          <Card
            className={`${
              plan.level === "Enterprise" ? "bg-[#1c1c1c] text-white" : ""
            } w-full max-w-sm mx-auto flex flex-col justify-between`}
            key={index}
          >
            <CardHeader className="flex flex-row items-center gap-2">
              <CardTitle>{plan.level}</CardTitle>
              {plan.level === "Pro" && (
                <Badge className="rounded-full bg-orange-600">🔥 Popular</Badge>
              )}
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-2xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.services.map((item: string, index: number) => (
                  <li className="flex items-center" key={index}>
                    <span className="text-green-500 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                variant={plan.level === "Enterprise" ? "default" : "outline"}
                className={`w-full ${
                   plan.level === "Enterprise" &&
                  "text-black bg-white hover:bg-gray-200"
                }`}
              >
                Get started with {plan.level}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
