"use client";

import Container from "@/components/Container";
import HomePage from "@/components/Home";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="m-0 p-0 w-full">
      <Container>
        <div>
          <HomePage />
          {user && `Welcome, ${user.email}`}
          {user && <button onClick={logout}>Logout</button>}
        </div>
        {/* <Home /> */}
      </Container>
    </div>
  );
}
