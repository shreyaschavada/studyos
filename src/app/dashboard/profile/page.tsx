"use client";

import { motion } from "framer-motion";
import { User, Mail, GraduationCap, MapPin, Calendar, Edit2, Trophy, Flame, Star, BookOpen, Target, Clock } from "lucide-react";
import { studentProfile, achievements, courses } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function ProfilePage() {
  const unlocked = achievements.filter((a) => a.unlocked);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div variants={item} className="glass p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6366F1]/10 via-[#7C3AED]/5 to-transparent rounded-bl-full" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-[#6366F1]/25">
              {studentProfile.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#6366F1] transition-all">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{studentProfile.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full gradient-bg text-white">Lvl {studentProfile.level}</span>
            </div>
            <p className="text-sm text-[#A1A1AA] mb-4">{studentProfile.bio}</p>
            <div className="flex flex-wrap gap-4 text-xs text-[#A1A1AA]">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {studentProfile.email}</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {studentProfile.university}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {studentProfile.major}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {studentProfile.year}</span>
            </div>
          </div>
          <button className="glass-sm hover-glow px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Edit2 className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Star, label: "XP Points", value: studentProfile.xp.toLocaleString(), color: "#F59E0B" },
          { icon: Flame, label: "Day Streak", value: studentProfile.streak, color: "#EF4444" },
          { icon: Target, label: "GPA", value: studentProfile.gpa, color: "#22C55E" },
          { icon: Trophy, label: "Badges", value: `${unlocked.length}/${achievements.length}`, color: "#6366F1" },
        ].map((stat) => (
          <div key={stat.label} className="glass p-4 text-center">
            <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
            <div className="text-xl font-bold mb-0.5">{stat.value}</div>
            <div className="text-xs text-[#A1A1AA]">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Achievement showcase */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#F59E0B]" /> Recent Achievements
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {unlocked.slice(0, 6).map((ach) => (
            <div key={ach.id} className="glass-sm p-4 min-w-[120px] text-center flex-shrink-0">
              <div className="text-3xl mb-2">{ach.icon}</div>
              <div className="text-xs font-medium">{ach.name}</div>
              <div className="text-[10px] text-[#F59E0B]">{ach.xp} XP</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Enrolled Courses */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#6366F1]" /> Enrolled Courses
        </h2>
        <div className="space-y-3">
          {courses.slice(0, 4).map((course) => (
            <div key={course.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#18181B]/50 transition-colors">
              <div className="w-1.5 h-10 rounded-full" style={{ background: course.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{course.name}</div>
                <div className="text-xs text-[#A1A1AA]">{course.teacher}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ color: course.color }}>{course.grade}</div>
                <div className="text-[10px] text-[#A1A1AA]">{course.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Goals */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#22C55E]" /> Current Goals
        </h2>
        <div className="space-y-4">
          {[
            { label: "Maintain 3.8+ GPA", progress: 95, color: "#22C55E" },
            { label: "Complete 50 Pomodoro sessions", progress: 72, color: "#6366F1" },
            { label: "Read 10 research papers", progress: 40, color: "#7C3AED" },
          ].map((goal) => (
            <div key={goal.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span>{goal.label}</span>
                <span style={{ color: goal.color }}>{goal.progress}%</span>
              </div>
              <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full"
                  style={{ background: goal.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
