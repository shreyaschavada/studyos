"use client";

import { motion } from "framer-motion";
import { GraduationCap, Clock, User, BookOpen, FileText, ChevronRight } from "lucide-react";
import { courses } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function CoursesPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-[#6366F1]" /> My Courses
        </h1>
        <p className="text-sm text-[#A1A1AA] mt-1">{courses.length} enrolled courses this semester</p>
      </motion.div>

      {/* Course overview */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Courses", value: courses.length, color: "#6366F1" },
          { label: "Avg. Progress", value: `${Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length)}%`, color: "#7C3AED" },
          { label: "Assignments", value: courses.reduce((a, c) => a + c.assignments, 0), color: "#3B82F6" },
          { label: "Avg. Grade", value: "A-", color: "#22C55E" },
        ].map((stat) => (
          <div key={stat.label} className="glass p-4">
            <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-[#A1A1AA]">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Course cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            variants={item}
            whileHover={{ y: -6, boxShadow: `0 20px 40px ${course.color}15` }}
            className="glass cursor-pointer group overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className="h-1.5 w-full" style={{ background: course.color }} />

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md" style={{ background: `${course.color}15`, color: course.color }}>
                    {course.code}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">{course.name}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-[#52525B] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-4">
                <User className="w-3.5 h-3.5" />
                {course.teacher}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#A1A1AA]">Progress</span>
                  <span className="font-medium" style={{ color: course.color }}>{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: course.color }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="glass-sm p-2 rounded-xl text-center">
                  <BookOpen className="w-3.5 h-3.5 text-[#A1A1AA] mx-auto mb-1" />
                  <div className="text-xs font-medium">{course.completedLessons}/{course.totalLessons}</div>
                  <div className="text-[10px] text-[#52525B]">Lessons</div>
                </div>
                <div className="glass-sm p-2 rounded-xl text-center">
                  <FileText className="w-3.5 h-3.5 text-[#A1A1AA] mx-auto mb-1" />
                  <div className="text-xs font-medium">{course.completedAssignments}/{course.assignments}</div>
                  <div className="text-[10px] text-[#52525B]">Tasks</div>
                </div>
                <div className="glass-sm p-2 rounded-xl text-center">
                  <div className="text-sm font-bold mb-0.5" style={{ color: course.color }}>{course.grade}</div>
                  <div className="text-[10px] text-[#52525B]">Grade</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-[#A1A1AA]">
                <Clock className="w-3.5 h-3.5" />
                {course.nextClass}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
