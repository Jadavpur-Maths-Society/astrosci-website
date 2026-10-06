"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import LoginSuccessAnimation from "./LoginSuccessAnimation";
import ClubLogo from "@/components/ClubLogo";

export default function AuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleLoginSuccess = () => {
    setLoginSuccess(true);
    // Redirect after animation completes
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };

  const handleSwitchToLogin = () => {
    setSignupSuccess(false);
    setActiveTab("login");
  };

  return (
    <motion.div
      className="w-full max-w-[420px] mx-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="relative rounded-lg border border-[#ff7a29]/20 bg-[#0b0b0d]/80 backdrop-blur-xl p-8 overflow-hidden"
        style={{
          boxShadow: loginSuccess
            ? "0 0 60px rgba(255,122,41,0.5), 0 0 120px rgba(255,122,41,0.2)"
            : "0 0 30px rgba(255,122,41,0.15), 0 0 60px rgba(255,122,41,0.05)",
        }}
        animate={{
          y: [0, -4, 0],
          boxShadow: loginSuccess
            ? [
                "0 0 30px rgba(255,122,41,0.15), 0 0 60px rgba(255,122,41,0.05)",
                "0 0 60px rgba(255,122,41,0.5), 0 0 120px rgba(255,122,41,0.2)",
              ]
            : undefined,
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 0.5, ease: "easeOut" },
        }}
      >
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#ff7a29]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#ffb173]/10 blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {loginSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoginSuccessAnimation />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Official club mark, shared with the hero and navigation. */}
                <div className="mb-5 flex justify-center">
                  <ClubLogo size={66} glow ring float eager />
                </div>
                <h1
                  className="text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Welcome to{" "}
                  <span className="text-[#ff7a29]">
                    AstroSci
                  </span>
                </h1>
                <p
                  className="text-gray-400 text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Explore the universe with fellow astronomers.
                </p>
              </motion.div>

              {/* Tabs */}
              {!signupSuccess && (
                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
              )}

              {/* Form content */}
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
                  <LoginForm key="login" onSuccess={handleLoginSuccess} />
                ) : (
                  <SignupForm
                    key="signup"
                    onSuccess={handleSignupSuccess}
                    onSwitchToLogin={handleSwitchToLogin}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
