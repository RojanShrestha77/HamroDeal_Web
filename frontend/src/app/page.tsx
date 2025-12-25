"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="p-10 bg-shop_light_pink min-h-screen">
      <h1 className="text-3xl font-bold mb-4">HamroDealWeb</h1>
      <p className="mb-8">
        Hi, my name is Rojan Shrestha. I live in Madhyapur Thimi. I am currently
        completing my bachelor's education from Coventry University.
      </p>

      {/* Test different variants */}
      <div className="flex flex-wrap gap-4">
        <Button variant="default" onClick={handleClick}>
          Default (Primary)
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button size="lg">Large Button</Button>
        <Button size="icon">
          <span className="sr-only">Icon</span>⭐
        </Button>
      </div>
    </div>
  );
}
