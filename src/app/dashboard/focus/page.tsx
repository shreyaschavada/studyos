"use client";

import { motion } from "framer-motion";
import { Crosshair, Play, Pause, RotateCcw, Coffee, Volume2, VolumeX, Droplets, TreePine, Music, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { quotes } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function FocusPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min
  const [sessions, setSessions] = useState(3);
  const [totalFocusMin, setTotalFocusMin] = useState(127);
  const [dailyGoal] = useState(180); // minutes
  const [sounds, setSounds] = useState({ rain: false, forest: false, lofi: false });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = isBreak ? 5 * 60 : 25 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        setSessions((s) => s + 1);
        setTotalFocusMin((t) => t + 25);
      }
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsRunning(false);
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timeLeft, isBreak]);

  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={item} className="text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Crosshair className="w-6 h-6 text-[#22C55E]" /> Focus Mode
        </h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Deep work. No distractions.</p>
      </motion.div>

      {/* Timer */}
      <motion.div variants={item} className="glass p-8 sm:p-12 flex flex-col items-center relative overflow-hidden">
        {/* Ambient bg */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-glow-pulse" style={{ background: isBreak ? "radial-gradient(circle, #22C55E, transparent)" : "radial-gradient(circle, #6366F1, transparent)" }} />
        </div>

        <div className="relative z-10">
          {/* Circular timer */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="140" fill="none" stroke="#27272A" strokeWidth="6" />
              <motion.circle
                cx="150" cy="150" r="140" fill="none"
                stroke={isBreak ? "#22C55E" : "#6366F1"}
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs text-[#A1A1AA] mb-2 uppercase tracking-wider">
                {isBreak ? "☕ Break Time" : "🎯 Focus Session"}
              </div>
              <div className="text-6xl sm:text-7xl font-bold font-mono tracking-tight">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </div>
              <div className="text-xs text-[#52525B] mt-2">Session #{sessions + 1}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button onClick={reset} className="w-12 h-12 rounded-2xl glass-sm flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-[#6366F1]/25 hover:opacity-90 transition-all btn-ripple"
            >
              {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
            </button>
            <button
              onClick={() => { setIsBreak(!isBreak); setTimeLeft(isBreak ? 25 * 60 : 5 * 60); setIsRunning(false); }}
              className="w-12 h-12 rounded-2xl glass-sm flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all"
            >
              <Coffee className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Ambient Sounds */}
        <motion.div variants={item} className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#06B6D4]" /> Ambient Sounds
          </h3>
          <div className="space-y-3">
            {[
              { key: "rain" as const, icon: Droplets, label: "Rain Sounds", color: "#3B82F6" },
              { key: "forest" as const, icon: TreePine, label: "Forest Sounds", color: "#22C55E" },
              { key: "lofi" as const, icon: Music, label: "Lo-fi Music", color: "#7C3AED" },
            ].map((sound) => (
              <button
                key={sound.key}
                onClick={() => setSounds((s) => ({ ...s, [sound.key]: !s[sound.key] }))}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  sounds[sound.key] ? "bg-opacity-10 border-opacity-30" : "hover:bg-[#18181B]"
                }`}
                style={sounds[sound.key] ? { background: `${sound.color}10`, borderColor: `${sound.color}30`, border: `1px solid ${sound.color}30` } : {}}
              >
                <div className="flex items-center gap-3">
                  <sound.icon className="w-5 h-5" style={{ color: sounds[sound.key] ? sound.color : "#A1A1AA" }} />
                  <span className="text-sm">{sound.label}</span>
                </div>
                {sounds[sound.key] ? (
                  <Volume2 className="w-4 h-4" style={{ color: sound.color }} />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#52525B]" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Session Stats */}
        <motion.div variants={item} className="glass p-6">
          <h3 className="font-semibold mb-4">Session Statistics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#A1A1AA]">Daily Goal</span>
                <span className="text-[#6366F1]">{totalFocusMin}/{dailyGoal} min</span>
              </div>
              <div className="w-full h-3 bg-[#27272A] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((totalFocusMin / dailyGoal) * 100, 100)}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full gradient-bg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-sm p-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#6366F1]">{sessions}</div>
                <div className="text-[10px] text-[#A1A1AA]">Sessions Today</div>
              </div>
              <div className="glass-sm p-3 rounded-xl text-center">
                <div className="text-2xl font-bold text-[#22C55E]">{Math.floor(totalFocusMin / 60)}h {totalFocusMin % 60}m</div>
                <div className="text-[10px] text-[#A1A1AA]">Total Focus</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Motivational Quote */}
      <motion.div variants={item} className="glass p-6 text-center">
        <Quote className="w-6 h-6 text-[#6366F1] mx-auto mb-3 opacity-50" />
        <p className="text-lg font-medium italic mb-2">&ldquo;{quotes[quoteIndex].text}&rdquo;</p>
        <p className="text-sm text-[#A1A1AA]">— {quotes[quoteIndex].author}</p>
      </motion.div>
    </motion.div>
  );
}
