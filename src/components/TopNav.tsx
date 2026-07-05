"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { notifications, studentProfile } from "@/lib/mock-data";
import { getInitials } from "@/lib/utils";

export default function TopNav() {
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const unread = notifications.filter((n) => !n.read).length;

  const typeColor: Record<string, string> = {
    warning: "#F59E0B",
    success: "#22C55E",
    info: "#3B82F6",
    achievement: "#7C3AED",
  };

  return (
    <header className="h-16 border-b border-[#1E1E24] bg-[#09090B]/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div
          onClick={() => setShowSearch(true)}
          className="flex items-center gap-2 bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 cursor-pointer hover:border-[#3F3F46] transition-colors"
        >
          <Search className="w-4 h-4 text-[#A1A1AA]" />
          <span className="text-sm text-[#52525B]">Search anything...</span>
          <kbd className="hidden sm:inline-flex text-[10px] text-[#52525B] bg-[#27272A] px-1.5 py-0.5 rounded ml-auto">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-all"
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="w-9 h-9 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-[10px] font-bold flex items-center justify-center text-white"
              >
                {unread}
              </motion.div>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-80 glass-strong rounded-2xl overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between p-4 border-b border-[#1E1E24]">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <span className="text-xs text-[#6366F1]">{unread} unread</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-4 border-b border-[#1E1E24] hover:bg-[#18181B]/50 transition-colors ${!n.read ? "bg-[#6366F1]/5" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: typeColor[n.type] || "#6366F1" }} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{n.title}</div>
                            <div className="text-xs text-[#A1A1AA] mt-0.5">{n.message}</div>
                            <div className="text-[10px] text-[#52525B] mt-1">{n.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity">
          {getInitials(studentProfile.name)}
        </div>
      </div>

      {/* Search modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-strong overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-[#1E1E24]">
                <Search className="w-5 h-5 text-[#A1A1AA]" />
                <input
                  autoFocus
                  placeholder="Search notes, courses, assignments..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#52525B]"
                />
                <button onClick={() => setShowSearch(false)} className="text-[#A1A1AA] hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-[#52525B] mb-3">Recent searches</p>
                {["Binary Search Trees", "Neural Networks", "React Hooks"].map((s) => (
                  <div key={s} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#18181B] cursor-pointer text-sm text-[#A1A1AA] transition-colors">
                    <Search className="w-3.5 h-3.5" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
