"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Bot, GraduationCap, FileText, ClipboardList,
  Calendar, Crosshair, BarChart3, Trophy, Settings, ChevronLeft,
  ChevronRight, Sparkles, LogOut, User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Bot, label: "AI Tutor", href: "/dashboard/ai-tutor" },
  { icon: GraduationCap, label: "Courses", href: "/dashboard/courses" },
  { icon: FileText, label: "Notes", href: "/dashboard/notes" },
  { icon: ClipboardList, label: "Assignments", href: "/dashboard/assignments" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: Crosshair, label: "Focus Mode", href: "/dashboard/focus" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex flex-col h-screen sticky top-0 border-r border-[#1E1E24] bg-[#09090B]/95 backdrop-blur-xl z-40"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[#1E1E24]">
        <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <div className="w-9 h-9 min-w-[36px] rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold whitespace-nowrap overflow-hidden"
              >
                StudyOS
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                isActive
                  ? "bg-[#6366F1]/10 text-[#818CF8]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-[#6366F1]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={`w-5 h-5 min-w-[20px] ${isActive ? "text-[#818CF8]" : "text-[#A1A1AA] group-hover:text-white"}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="py-4 px-3 space-y-1 border-t border-[#1E1E24]">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? "bg-[#6366F1]/10 text-[#818CF8]" : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              }`}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#EF4444]/70 hover:text-[#EF4444] hover:bg-[#EF4444]/5 transition-all">
          <LogOut className="w-5 h-5 min-w-[20px]" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden">
                Log out
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#6366F1] transition-all z-50"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
