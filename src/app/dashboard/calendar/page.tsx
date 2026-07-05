"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import { calendarEvents, todaySchedule } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026
  const [view, setView] = useState<"month" | "week">("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#6366F1]" /> Calendar
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">Stay on top of your schedule</p>
        </div>
        <div className="flex gap-2">
          {(["month", "week"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                view === v ? "gradient-bg text-white" : "glass-sm text-[#A1A1AA] hover:text-white"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar grid */}
        <motion.div variants={item} className="lg:col-span-3 glass p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{MONTHS[month]} {year}</h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="w-8 h-8 rounded-lg glass-sm flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 rounded-lg glass-sm text-xs text-[#A1A1AA] hover:text-white transition-all">
                Today
              </button>
              <button onClick={nextMonth} className="w-8 h-8 rounded-lg glass-sm flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div key={day} className="text-center text-xs text-[#52525B] font-medium py-2">{day}</div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="aspect-square" />;
              const events = getEventsForDay(day);
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  className={`aspect-square p-1 rounded-xl cursor-pointer transition-all hover:bg-[#18181B] ${
                    isToday ? "ring-1 ring-[#6366F1] bg-[#6366F1]/5" : ""
                  }`}
                >
                  <div className={`text-xs font-medium mb-0.5 ${isToday ? "text-[#6366F1]" : "text-[#A1A1AA]"}`}>{day}</div>
                  <div className="space-y-0.5">
                    {events.slice(0, 2).map((e) => (
                      <div key={e.id} className="text-[8px] px-1 py-0.5 rounded truncate" style={{ background: `${e.color}20`, color: e.color }}>
                        {e.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[8px] text-[#52525B]">+{events.length - 2} more</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Sidebar - Daily agenda */}
        <motion.div variants={item} className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#6366F1]" /> Today&apos;s Agenda
          </h3>
          <div className="space-y-3">
            {todaySchedule.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#18181B]/50 transition-colors">
                <div className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0" style={{ background: event.color }} />
                <div>
                  <div className="text-sm font-medium">{event.title}</div>
                  <div className="text-xs text-[#A1A1AA]">{event.time} • {event.duration}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming events */}
          <h3 className="font-semibold mt-6 mb-4 text-sm">Upcoming Events</h3>
          <div className="space-y-2">
            {calendarEvents.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center gap-2 text-xs p-2 rounded-lg hover:bg-[#18181B]/50 transition-colors">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                <span className="flex-1 truncate">{e.title}</span>
                <span className="text-[#52525B]">{new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
