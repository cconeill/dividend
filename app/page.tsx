"use client"

import type React from "react"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  const [inputValue, setInputValue] = useState<number>(1000)
  const divisor = 50 // The fixed dollar figure to divide by

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(event.target.value)
    setInputValue(isNaN(value) ? 0 : value)
  }

  const handleSliderChange = (value: number[]) => {
    setInputValue(value[0])
  }

  const result = Math.floor(inputValue / divisor)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Dollar Divider</h1>
      <p className="text-xl text-muted-foreground mb-12">Calculate how many $50 items you can buy</p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Enter Amount</h2>
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
            max={10000}
            step={50}
            value={[inputValue]}
            onValueChange={handleSliderChange}
            aria-label="Dollar amount slider"
          />
        </div>
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Result</h2>
          <p className="text-lg mb-4">With ${inputValue.toFixed(2)}, you can buy:</p>
          <p className="text-4xl font-bold text-primary mb-4">{result} items</p>
          <p className="text-muted-foreground">
            This calculation is based on a fixed price of ${divisor} per item. Adjust the input on the left to see how
            many items you can afford.
          </p>
        </div>
      </div>
    </main>
  )
}

