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
  const formattedNumberOfShares = numberOfShares.toLocaleString();

  const priceOfShares = sharePrice !== null ? Math.floor(numberOfShares * sharePrice) : 0
  const formattedPriceOfShares = priceOfShares.toLocaleString();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
          backgroundImage: 'url(/background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ fontFamily: 'Libre Baskerville, serif' }}>
      <h1 className="text-6xl font-bold mb-4">PG&E Dividend Calculator</h1>
      <p className="text-xl mb-12">Calculate how many shares of PG&E you need to own to pay your electricity bill</p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
        <div className="bg-muted p-8 rounded-lg" style={{ boxShadow: "0 4px 30px rgba(255, 255, 255, 0.5)", backgroundColor: "rgba(200, 200, 200, 0.8)" }}>
          <h2 className="text-2xl font-semibold mb-4">Enter your average monthly electricity bill:</h2>
          <div className="flex items-center rounded-lg">
          <span className="px-2 text-lg">$</span>
          <Input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="text-lg"
            placeholder="Enter dollar amount"
            aria-label="Dollar amount input"
          />
          </div>
          <br />
          <Slider
            min={0}
            max={500}
            step={10}
            value={[inputValue]}
            onValueChange={handleSliderChange}
            aria-label="Dollar amount slider"
          />
        </div>
        </div>
        <div className="space-y-6">
        <div className="bg-muted p-8 rounded-lg" style={{ boxShadow: "0 4px 30px rgba(255, 255, 255, 0.5)", backgroundColor: "rgba(200, 200, 200, 0.8)" }}>
          <p className="text-lg mb-4">To cover a monthly bill of ${inputValue}, you will need to buy:</p>
          <p className="text-4xl font-bold text-primary mb-4">{formattedNumberOfShares} shares</p>
          <p className="text-muted-foreground">
            This calculation is based on a quarterly dividend of ${yearlyDividend} per share.
          </p>
        </div>
        <div className="bg-muted p-8 rounded-lg" style={{ boxShadow: "0 4px 30px rgba(255, 255, 255, 0.5)", backgroundColor: "rgba(200, 200, 200, 0.8)" }}>
          <p className="text-lg mb-4">At PG&E's current price of ${sharePrice} per share, this will cost you:</p>
          <p className="text-4xl font-bold text-primary mb-4">${formattedPriceOfShares} dollars</p>
        </div>
        </div>
        </div>
        </div>
      <footer className="mt-20 text-center">
          Source code <a href="https://github.com/cconeill/dividend/" target="_blank" rel="noopener noreferrer" className="underline">cconeill/dividend</a> 👨‍💻
          <p>Made with ❤️ in San Francisco</p>
      </footer>
    </main>
    </>
  )
}
