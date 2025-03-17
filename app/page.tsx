"use client"

import * as React from "react"

import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  const [sharePrice, setSharePrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchSharePrice = async () => {
      try {
          const response = await fetch('/api/share-price');
          const price = await response.json();
          setSharePrice(price);
      } catch (error) {
          console.error('Error fetching share price:', error);
      }
  };

    fetchSharePrice();
  }, []); // Empty dependency array means this runs once on mount

  const [inputValue, setInputValue] = useState<number>(100)
  const yearlyDividend = 0.1 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(event.target.value)
    setInputValue(isNaN(value) ? 0 : value)
  }

  const handleSliderChange = (value: number[]) => {
    setInputValue(value[0])
  }

  const numberOfShares = Math.floor(inputValue * 12 / yearlyDividend)
  const priceOfShares = sharePrice !== null ? Math.floor(numberOfShares * sharePrice) : 0

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">PG&E Dividend Calculator</h1>
      <p className="text-xl text-muted-foreground mb-12">Calculate how many shares of PG&E you need to own to pay your electricity bill</p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Enter your average monthly electricity bill</h2>
          <Input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="text-lg"
            placeholder="Enter dollar amount"
            aria-label="Dollar amount input"
          />
          <Slider
            min={0}
            max={500}
            step={10}
            value={[inputValue]}
            onValueChange={handleSliderChange}
            aria-label="Dollar amount slider"
          />
        </div>
        <div className="space-y-6">
        <div className="bg-muted p-6 rounded-lg">
          <p className="text-lg mb-4">To cover a monthly bill of ${inputValue.toFixed(2)}, you will need to buy:</p>
          <p className="text-4xl font-bold text-primary mb-4">{numberOfShares} shares</p>
          <p className="text-muted-foreground">
            This calculation is based on a quarterly dividend of ${yearlyDividend} per share.
          </p>
        </div>
        <div className="bg-muted p-6 rounded-lg">
          <p className="text-lg mb-4">At PG&E's current price of ${sharePrice} per share, this will cost you:</p>
          <p className="text-4xl font-bold text-primary mb-4">${priceOfShares} dollars</p>
        </div>
        </div>
        </div>
    </main>
  )
}
