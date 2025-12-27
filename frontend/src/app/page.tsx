"use client";

import Container from "@/components/Container";
import HomePage from "@/components/Home";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="m-0 p-0 w-full">
      <Container>
        <div>
          <HomePage />
        </div>
        {/* <Home /> */}
      </Container>
    </div>
  );
}
