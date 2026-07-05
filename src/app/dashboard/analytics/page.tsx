"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Clock, Target, BookOpen, CheckSquare } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { weeklyStudyHours, monthlyPerformance, subjectProgress, focusTimeData, productivityTrend } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-sm px-3 py-2 text-xs">
      <div className="text-[#A1A1AA]">{label}</div>
      <div className="font-semibold">{payload[0]?.value}</div>
    </div>
  );
};

export default function AnalyticsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#6366F1]" /> Analytics
        </h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Track your academic performance and study habits</p>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Total Study Hours", value: "156h", change: "+12%", color: "#6366F1" },
          { icon: Target, label: "Avg. Productivity", value: "87%", change: "+5%", color: "#7C3AED" },
          { icon: CheckSquare, label: "Tasks Completed", value: "42", change: "+8", color: "#22C55E" },
          { icon: BookOpen, label: "Notes Created", value: "28", change: "+3", color: "#3B82F6" },
        ].map((stat) => (
          <div key={stat.label} className="glass p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <span className="text-xs text-[#22C55E] font-medium">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
            <div className="text-xs text-[#A1A1AA]">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Hours Chart */}
        <motion.div variants={item} className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#6366F1]" /> Weekly Study Hours
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyStudyHours}>
              <defs>
                <linearGradient id="studyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="day" tick={{ fill: "#A1A1AA", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="hours" stroke="#6366F1" fill="url(#studyGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Chart */}
        <motion.div variants={item} className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#7C3AED]" /> Monthly Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="month" tick={{ fill: "#A1A1AA", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {monthlyPerformance.map((_, i) => (
                  <Cell key={i} fill={i === monthlyPerformance.length - 1 ? "#7C3AED" : "#7C3AED50"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Progress */}
        <motion.div variants={item} className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#3B82F6]" /> Subject Progress
          </h3>
          <div className="space-y-4">
            {subjectProgress.map((s, i) => (
              <div key={s.subject}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span>{s.subject}</span>
                  <span style={{ color: s.color }}>{s.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#27272A] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Time Distribution */}
        <motion.div variants={item} className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#06B6D4]" /> Focus Distribution
          </h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={focusTimeData} innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {focusTimeData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {focusTimeData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-[#A1A1AA]">{d.name}</span>
                  <span className="text-xs font-medium ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Productivity Trend */}
      <motion.div variants={item} className="glass p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#22C55E]" /> Productivity Trend
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={productivityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
            <XAxis dataKey="week" tick={{ fill: "#A1A1AA", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="productivity" stroke="#22C55E" strokeWidth={2} dot={{ r: 4, fill: "#22C55E" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
