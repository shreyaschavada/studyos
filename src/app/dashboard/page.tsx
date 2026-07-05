"use client";

import { motion } from "framer-motion";
import {
  Flame, Clock, ClipboardList, Star, ArrowRight, BookOpen,
  Bot, Target, Calendar, Brain, Zap, TrendingUp, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { getGreeting } from "@/lib/utils";
import { studentProfile, todaySchedule, assignments, notes, courses } from "@/lib/mock-data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function StatCard({ icon: Icon, label, value, color, delay }: { icon: React.ElementType; label: string; value: string; color: string; delay: number }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4, boxShadow: `0 20px 40px ${color}15` }}
      className="glass p-5 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <TrendingUp className="w-4 h-4 text-[#22C55E]" />
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-[#A1A1AA]">{label}</div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const greeting = getGreeting();
  const pendingAssignments = assignments.filter((a) => a.status !== "completed");
  const pinnedNotes = notes.filter((n) => n.pinned);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Card */}
      <motion.div variants={item} className="glass p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6366F1]/10 via-transparent to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#6366F1]/25">
              {studentProfile.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {greeting}, <span className="gradient-text">{studentProfile.name.split(" ")[0]}</span>! 👋
              </h1>
              <p className="text-sm text-[#A1A1AA] mt-1">Ready to conquer your goals today? You have {pendingAssignments.length} pending tasks.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Study Streak" value={`${studentProfile.streak} days`} color="#F59E0B" delay={0} />
        <StatCard icon={Clock} label="Weekly Hours" value="29.4h" color="#6366F1" delay={0.1} />
        <StatCard icon={ClipboardList} label="Assignments" value={`${assignments.filter(a => a.status === 'completed').length}/${assignments.length}`} color="#3B82F6" delay={0.2} />
        <StatCard icon={Star} label="XP Points" value={studentProfile.xp.toLocaleString()} color="#7C3AED" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div variants={item} className="lg:col-span-2 glass p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#6366F1]" /> Today&apos;s Schedule
            </h2>
            <Link href="/dashboard/calendar" className="text-xs text-[#6366F1] hover:text-[#818CF8] flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {todaySchedule.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#18181B]/50 transition-colors group"
              >
                <div className="text-sm font-mono text-[#A1A1AA] w-20 flex-shrink-0">{event.time}</div>
                <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: event.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{event.title}</div>
                  <div className="text-xs text-[#A1A1AA]">{event.duration} • {event.type}</div>
                </div>
                <div className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: event.color }} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="glass p-6">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#F59E0B]" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Bot, label: "AI Tutor", href: "/dashboard/ai-tutor", color: "#6366F1" },
              { icon: BookOpen, label: "New Note", href: "/dashboard/notes", color: "#3B82F6" },
              { icon: Target, label: "Focus", href: "/dashboard/focus", color: "#22C55E" },
              { icon: Brain, label: "Quiz Me", href: "/dashboard/ai-tutor", color: "#7C3AED" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="glass-sm p-4 flex flex-col items-center gap-2 hover:border-[#3F3F46] transition-all card-lift text-center"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${action.color}15` }}>
                  <action.icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Productivity Score */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#7C3AED]/10 border border-[#6366F1]/20">
            <div className="text-xs text-[#A1A1AA] mb-2">Productivity Score</div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-bold">87</span>
              <span className="text-sm text-[#22C55E] mb-1">+5%</span>
            </div>
            <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="h-full rounded-full gradient-bg"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <motion.div variants={item} className="glass p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#3B82F6]" /> Upcoming Assignments
            </h2>
            <Link href="/dashboard/assignments" className="text-xs text-[#6366F1] hover:text-[#818CF8] flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingAssignments.slice(0, 4).map((a) => {
              const priorityColors: Record<string, string> = { high: "#EF4444", medium: "#F59E0B", low: "#22C55E" };
              return (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#18181B]/50 transition-colors">
                  <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: a.courseColor }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{a.title}</div>
                    <div className="text-xs text-[#A1A1AA]">{a.course} • Due {new Date(a.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-1 rounded-full" style={{ background: `${priorityColors[a.priority]}15`, color: priorityColors[a.priority] }}>
                    {a.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Notes */}
        <motion.div variants={item} className="glass p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#7C3AED]" /> Recent Notes
            </h2>
            <Link href="/dashboard/notes" className="text-xs text-[#6366F1] hover:text-[#818CF8] flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {pinnedNotes.map((n) => (
              <div key={n.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#18181B]/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${n.color}15` }}>
                  <BookOpen className="w-5 h-5" style={{ color: n.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{n.title}</div>
                  <div className="text-xs text-[#A1A1AA]">{n.folder} • {new Date(n.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                </div>
                {n.pinned && <span className="text-xs">📌</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div variants={item} className="glass p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#7C3AED]/10 to-transparent rounded-bl-full" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#7C3AED]" /> AI Recommendations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Review Binary Search Trees", desc: "Based on your upcoming DSA midterm", color: "#6366F1", icon: "🌳" },
              { title: "Practice Neural Networks", desc: "Your ML quiz is in 3 days", color: "#7C3AED", icon: "🧠" },
              { title: "Complete React Portfolio", desc: "Due tomorrow — 80% done", color: "#3B82F6", icon: "⚛️" },
            ].map((rec) => (
              <div key={rec.title} className="glass-sm p-4 hover:border-[#3F3F46] transition-all cursor-pointer card-lift">
                <div className="text-2xl mb-2">{rec.icon}</div>
                <div className="text-sm font-medium mb-1">{rec.title}</div>
                <div className="text-xs text-[#A1A1AA]">{rec.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Weekly Progress Chart */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#22C55E]" /> Weekly Study Hours
        </h2>
        <div className="flex items-end gap-3 h-40">
          {[
            { day: "Mon", hours: 4.5 }, { day: "Tue", hours: 3.2 }, { day: "Wed", hours: 5.1 },
            { day: "Thu", hours: 2.8 }, { day: "Fri", hours: 4.0 }, { day: "Sat", hours: 6.3 }, { day: "Sun", hours: 3.5 },
          ].map((d, i) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.hours / 7) * 100}%` }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="w-full rounded-t-lg gradient-bg opacity-80 min-h-[4px] relative group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.hours}h
                </div>
              </motion.div>
              <span className="text-[10px] text-[#A1A1AA]">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
