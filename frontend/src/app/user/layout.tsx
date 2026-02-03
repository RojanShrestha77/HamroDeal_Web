"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Not logged in → redirect to login
    if (!user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // While checking auth state
  if (loading) {
    return (
      <div style={{ padding: 16 }}>
        <p>Loading…</p>
      </div>
    );
  }

  // Redirecting
  if (!user) return null;

  // Logged in → allow access to /user/*
  return <>{children}</>;
}
