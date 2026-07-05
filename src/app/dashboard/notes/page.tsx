"use client";

import { motion } from "framer-motion";
import { FileText, Plus, Search, Pin, FolderOpen, Sparkles, RefreshCw, Layers, MoreVertical, Edit3 } from "lucide-react";
import { useState } from "react";
import { notes } from "@/lib/mock-data";

const folders = ["All Notes", "Data Structures", "Machine Learning", "Web Development", "Linear Algebra", "Database Systems", "Computer Networks"];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function NotesPage() {
  const [activeFolder, setActiveFolder] = useState("All Notes");
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = notes.filter((n) => {
    const matchFolder = activeFolder === "All Notes" || n.folder === activeFolder;
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFolder && matchSearch;
  });

  const pinnedNotes = filtered.filter((n) => n.pinned);
  const otherNotes = filtered.filter((n) => !n.pinned);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#6366F1]" /> Smart Notes
          </h1>
          <p className="text-sm text-[#A1A1AA] mt-1">{notes.length} notes across {folders.length - 1} folders</p>
        </div>
        <button className="gradient-bg text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 btn-ripple">
          <Plus className="w-4 h-4" /> New Note
        </button>
      </motion.div>

      {/* Search & Folders */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-[#6366F1] outline-none placeholder:text-[#52525B]"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeFolder === f
                  ? "gradient-bg text-white"
                  : "glass-sm text-[#A1A1AA] hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <motion.div variants={item}>
          <h2 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 mb-3">
            <Pin className="w-3.5 h-3.5" /> Pinned
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <motion.div
                key={note.id}
                whileHover={{ y: -4 }}
                className="glass hover-glow p-5 cursor-pointer group"
                onClick={() => setSelectedNote(note.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: note.color }} />
                  <MoreVertical className="w-4 h-4 text-[#52525B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{note.title}</h3>
                <p className="text-xs text-[#A1A1AA] line-clamp-2 mb-3">{note.content.replace(/#/g, "").replace(/\\n/g, " ").slice(0, 100)}...</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#52525B]">{note.folder}</span>
                  <span className="text-[10px] text-[#52525B]">{new Date(note.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Notes */}
      <motion.div variants={item}>
        <h2 className="text-sm font-semibold text-[#A1A1AA] flex items-center gap-2 mb-3">
          <FolderOpen className="w-3.5 h-3.5" /> {activeFolder === "All Notes" ? "All Notes" : activeFolder}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherNotes.map((note) => (
            <motion.div
              key={note.id}
              whileHover={{ y: -4 }}
              className="glass hover-glow p-5 cursor-pointer group"
              onClick={() => setSelectedNote(note.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: note.color }} />
                <MoreVertical className="w-4 h-4 text-[#52525B] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{note.title}</h3>
              <p className="text-xs text-[#A1A1AA] line-clamp-2 mb-3">{note.content.replace(/#/g, "").replace(/\\n/g, " ").slice(0, 100)}...</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#52525B]">{note.folder}</span>
                <span className="text-[10px] text-[#52525B]">{new Date(note.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Actions floating bar */}
      <motion.div
        variants={item}
        className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="glass-strong flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl">
          <span className="text-xs text-[#A1A1AA] mr-2">AI Tools:</span>
          {[
            { icon: Sparkles, label: "Summary" },
            { icon: RefreshCw, label: "Rewrite" },
            { icon: Layers, label: "Flashcards" },
            { icon: Edit3, label: "Format" },
          ].map((tool) => (
            <button
              key={tool.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#6366F1]/10 text-[#A1A1AA] hover:text-[#818CF8] transition-all text-xs font-medium"
            >
              <tool.icon className="w-3.5 h-3.5" />
              {tool.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
