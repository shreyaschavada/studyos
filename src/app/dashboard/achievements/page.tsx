"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Star, Medal, Crown, Lock, ChevronUp } from "lucide-react";
import { achievements, leaderboard, studentProfile } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AchievementsPage() {
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);
  const totalXP = unlocked.reduce((a, b) => a + b.xp, 0);
  const nextLevelXP = 5000;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#F59E0B]" /> Achievements
        </h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Track your progress and compete with classmates</p>
      </motion.div>

      {/* XP Overview */}
      <motion.div variants={item} className="glass p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#F59E0B]/10 to-transparent rounded-bl-full" />
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-[#A1A1AA] mb-1">Total XP</div>
            <div className="text-3xl font-bold gradient-text">{totalXP.toLocaleString()}</div>
            <div className="mt-2">
              <div className="flex justify-between text-[10px] text-[#A1A1AA] mb-1">
                <span>Level {studentProfile.level}</span>
                <span>Level {studentProfile.level + 1}</span>
              </div>
              <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalXP / nextLevelXP) * 100}%` }}
                  transition={{ duration: 1.5 }}
                  className="h-full rounded-full gradient-bg"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#A1A1AA] mb-1">Level</div>
            <div className="text-3xl font-bold text-[#F59E0B]">{studentProfile.level}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#A1A1AA] mb-1">Streak</div>
            <div className="text-3xl font-bold text-[#EF4444] flex items-center justify-center gap-1">
              <Flame className="w-6 h-6" /> {studentProfile.streak}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#A1A1AA] mb-1">Badges</div>
            <div className="text-3xl font-bold text-[#22C55E]">{unlocked.length}/{achievements.length}</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Badges */}
        <div className="lg:col-span-2 space-y-6">
          {/* Unlocked */}
          <motion.div variants={item}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#F59E0B]" /> Unlocked ({unlocked.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {unlocked.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(99,102,241,0.15)" }}
                  className="glass p-4 cursor-pointer text-center"
                >
                  <div className="text-4xl mb-3">{ach.icon}</div>
                  <div className="text-sm font-semibold mb-1">{ach.name}</div>
                  <div className="text-[10px] text-[#A1A1AA] mb-2">{ach.description}</div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
                    <Star className="w-3 h-3" /> {ach.xp} XP
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Locked */}
          <motion.div variants={item}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#52525B]" /> Locked ({locked.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {locked.map((ach) => (
                <div key={ach.id} className="glass p-4 text-center opacity-50">
                  <div className="text-4xl mb-3 grayscale">{ach.icon}</div>
                  <div className="text-sm font-semibold mb-1">{ach.name}</div>
                  <div className="text-[10px] text-[#A1A1AA] mb-2">{ach.description}</div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#27272A] text-[#52525B]">
                    <Lock className="w-3 h-3" /> {ach.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div variants={item} className="glass p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#F59E0B]" /> Leaderboard
          </h2>
          <div className="space-y-3">
            {leaderboard.map((user, i) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  user.isCurrentUser ? "bg-[#6366F1]/10 border border-[#6366F1]/20" : "hover:bg-[#18181B]/50"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                  i === 0 ? "bg-[#F59E0B]/20 text-[#F59E0B]" :
                  i === 1 ? "bg-[#A1A1AA]/20 text-[#A1A1AA]" :
                  i === 2 ? "bg-[#CD7F32]/20 text-[#CD7F32]" : "bg-[#27272A] text-[#52525B]"
                }`}>
                  {user.rank}
                </div>
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-[10px] font-bold">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {user.name} {user.isCurrentUser && <span className="text-[10px] text-[#6366F1]">(You)</span>}
                  </div>
                  <div className="text-[10px] text-[#A1A1AA]">{user.xp.toLocaleString()} XP • 🔥 {user.streak}</div>
                </div>
                {user.isCurrentUser && <ChevronUp className="w-4 h-4 text-[#22C55E]" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
