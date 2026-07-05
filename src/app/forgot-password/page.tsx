"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[#6366F1]/10 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/8 blur-[100px]" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">StudyOS</span>
        </div>

        <div className="glass p-8">
          {!submitted ? (
            <>
              <Link href="/login" className="inline-flex items-center gap-1 text-sm text-[#A1A1AA] hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to login
              </Link>
              <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
              <p className="text-[#A1A1AA] text-sm mb-8">Enter your email and we&apos;ll send you a reset link.</p>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                    <input type="email" placeholder="alex@university.edu" className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-10 pr-4 py-3 text-sm focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-all outline-none placeholder:text-[#52525B]" />
                  </div>
                </div>
                <button type="submit" className="w-full gradient-bg text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all btn-ripple flex items-center justify-center gap-2">
                  Send Reset Link <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-[#22C55E]" />
              </motion.div>
              <h2 className="text-xl font-bold mb-2">Check your email</h2>
              <p className="text-[#A1A1AA] text-sm mb-6">We&apos;ve sent a password reset link to your email address.</p>
              <Link href="/login" className="text-[#6366F1] hover:text-[#818CF8] text-sm font-medium">
                Return to login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
