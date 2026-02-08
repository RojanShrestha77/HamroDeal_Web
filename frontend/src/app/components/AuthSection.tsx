"use client";

import { useAuth } from "@/context/AuthContext";

export default function AuthSection() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      Welcome, {user.email}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
