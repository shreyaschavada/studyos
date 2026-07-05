"use client";

import { LayoutDashboard, Bot, FileText, ClipboardList, Calendar, BarChart3, Crosshair, GraduationCap, Trophy, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Bot, label: "AI", href: "/dashboard/ai-tutor" },
  { icon: FileText, label: "Notes", href: "/dashboard/notes" },
  { icon: Crosshair, label: "Focus", href: "/dashboard/focus" },
  { icon: BarChart3, label: "Stats", href: "/dashboard/analytics" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#09090B]/95 backdrop-blur-xl border-t border-[#1E1E24] px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                isActive ? "text-[#818CF8]" : "text-[#52525B]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#6366F1]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
