"use client";

import { motion } from "framer-motion";
import { ClipboardList, Plus, GripVertical, Calendar, AlertCircle } from "lucide-react";
import { useState } from "react";
import { assignments } from "@/lib/mock-data";

type Status = "pending" | "in-progress" | "completed";

interface TaskItem {
  id: string;
  title: string;
  course: string;
  courseColor: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: Status;
  description: string;
}

const columns: { id: Status; title: string; color: string }[] = [
  { id: "pending", title: "Pending", color: "#F59E0B" },
  { id: "in-progress", title: "In Progress", color: "#3B82F6" },
  { id: "completed", title: "Completed", color: "#22C55E" },
];

const priorityColors: Record<string, string> = { high: "#EF4444", medium: "#F59E0B", low: "#22C55E" };

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AssignmentsPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([...assignments] as TaskItem[]);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDrop = (status: Status) => {
    if (!draggedTask) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTask ? { ...t, status } : t))
    );
    setDraggedTask(null);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#3B82F6]" /> Assignments
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">{tasks.length} total assignments</p>
        </div>
        <button className="gradient-bg text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 btn-ripple">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </motion.div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <motion.div
              key={col.id}
              variants={item}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
              className="glass p-4 min-h-[400px]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
                  <h3 className="font-semibold text-sm">{col.title}</h3>
                  <span className="text-xs text-[#52525B] bg-[#18181B] px-2 py-0.5 rounded-full">{colTasks.length}</span>
                </div>
              </div>

              <div className="space-y-3">
                {colTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    whileHover={{ y: -2 }}
                    layout
                    className={`glass-sm p-4 cursor-grab active:cursor-grabbing group ${
                      draggedTask === task.id ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 text-[#52525B] opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${priorityColors[task.priority]}15`, color: priorityColors[task.priority] }}>
                            {task.priority}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium mb-1 truncate">{task.title}</h4>
                        <p className="text-[11px] text-[#A1A1AA] line-clamp-2 mb-3">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: `${task.courseColor}15`, color: task.courseColor }}>
                            {task.course}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] text-[#A1A1AA]">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
