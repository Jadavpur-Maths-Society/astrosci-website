"use client";

import { Suspense } from "react";
import AuthCard from "@/components/AuthCard";

export default function AuthPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="w-full max-w-[420px] h-[400px] rounded-lg border border-[#ff7a29]/20 bg-[#0b0b0d]/80 animate-pulse" />}>
        <AuthCard />
      </Suspense>
    </main>
  );
}
