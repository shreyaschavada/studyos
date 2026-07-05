"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Mic, Image, Paperclip, Sparkles, Code, HelpCircle, FileText, Brain, Lightbulb, MessageSquare, Plus, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { aiConversations } from "@/lib/mock-data";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestedPrompts = [
  { icon: FileText, label: "Summarize", desc: "my lecture notes" },
  { icon: HelpCircle, label: "Explain", desc: "a concept simply" },
  { icon: Brain, label: "Quiz Me", desc: "on any topic" },
  { icon: Lightbulb, label: "Simplify", desc: "complex topics" },
  { icon: Code, label: "Debug", desc: "my code" },
  { icon: Sparkles, label: "Practice", desc: "questions" },
];

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>(aiConversations[0].messages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeConv, setActiveConv] = useState("conv1");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        role: "assistant",
        content: `Great question! Let me help you with that.\n\nBased on your question about "${input.slice(0, 50)}...", here's what I can tell you:\n\n**Key Points:**\n1. This is a fundamental concept in computer science\n2. Understanding the underlying principles is crucial\n3. Let me break it down step by step\n\n\`\`\`python\n# Here's a quick example\ndef example():\n    return "Understanding concepts deeply!"\n\`\`\`\n\nWould you like me to elaborate on any specific part? I can also:\n- Generate practice questions\n- Create flashcards\n- Provide more examples`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] -m-4 sm:-m-6">
      {/* Conversation sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-r border-[#1E1E24] bg-[#09090B] overflow-hidden hidden lg:block"
          >
            <div className="p-4">
              <button className="w-full glass-sm hover-glow p-3 flex items-center justify-center gap-2 text-sm font-medium mb-4">
                <Plus className="w-4 h-4" /> New Chat
              </button>
              <p className="text-xs text-[#52525B] mb-3 px-1">Recent</p>
              {aiConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => { setActiveConv(conv.id); setMessages(conv.messages); }}
                  className={`w-full text-left p-3 rounded-xl text-sm mb-1 transition-all ${
                    activeConv === conv.id ? "bg-[#6366F1]/10 text-[#818CF8]" : "text-[#A1A1AA] hover:bg-[#18181B]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{conv.title}</span>
                  </div>
                  <div className="text-[10px] text-[#52525B] ml-6 mt-1">{conv.updatedAt}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="h-14 border-b border-[#1E1E24] flex items-center px-4 gap-3">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold">AI Tutor</div>
            <div className="text-[10px] text-[#22C55E] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" /> Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-[#6366F1]/20">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
              <p className="text-sm text-[#A1A1AA] mb-8 max-w-md">I can explain concepts, solve problems, generate quizzes, summarize notes, and much more.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setInput(`${p.label} ${p.desc}`)}
                    className="glass-sm p-3 hover:border-[#3F3F46] transition-all text-left card-lift"
                  >
                    <p.icon className="w-4 h-4 text-[#6366F1] mb-2" />
                    <div className="text-xs font-medium">{p.label}</div>
                    <div className="text-[10px] text-[#52525B]">{p.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] sm:max-w-[70%] ${
                msg.role === "user"
                  ? "gradient-bg text-white rounded-2xl rounded-br-md px-4 py-3"
                  : "glass rounded-2xl rounded-bl-md px-4 py-3"
              }`}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content.split(/(```[\s\S]*?```)/g).map((part, j) => {
                    if (part.startsWith("```")) {
                      const code = part.replace(/```\w*\n?/g, "").replace(/```$/g, "");
                      return (
                        <div key={j} className="my-3 bg-[#0F0F12] rounded-xl p-4 border border-[#1E1E24] overflow-x-auto">
                          <code className="text-xs font-mono text-[#A1A1AA]">{code}</code>
                        </div>
                      );
                    }
                    return <span key={j}>{part.split(/(\*\*.*?\*\*)/g).map((sub, k) => {
                      if (sub.startsWith("**") && sub.endsWith("**")) {
                        return <strong key={k} className="font-semibold">{sub.slice(2, -2)}</strong>;
                      }
                      return sub;
                    })}</span>;
                  })}
                </div>
                <div className="text-[10px] text-[#52525B] mt-2">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 flex items-center justify-center flex-shrink-0 mt-1 text-[#818CF8] font-bold text-xs">
                  AJ
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 rounded-full bg-[#6366F1]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div className="px-4 sm:px-6 pb-2 flex gap-2 overflow-x-auto">
          {["Summarize", "Explain", "Quiz Me", "Simplify", "Practice Questions"].map((action) => (
            <button
              key={action}
              onClick={() => setInput(action + ": ")}
              className="text-xs px-3 py-1.5 rounded-full glass-sm whitespace-nowrap hover:border-[#6366F1]/50 transition-all text-[#A1A1AA] hover:text-white"
            >
              {action}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 sm:p-6 pt-2">
          <div className="glass flex items-end gap-2 p-3 rounded-2xl">
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg hover:bg-[#18181B] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all">
                <Image className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-[#18181B] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask me anything..."
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-[#52525B] max-h-32 py-1.5"
            />
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg hover:bg-[#18181B] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all">
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white disabled:opacity-30 transition-all hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
