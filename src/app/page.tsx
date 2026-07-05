"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Brain,
  BookOpen,
  Calendar,
  Target,
  BarChart3,
  Trophy,
  Layout,
  GraduationCap,
  Star,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  GitFork,
  Globe,
  Mail,
  Sparkles,
  Zap,
  Shield,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { features, stats, testimonials, faqs } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  Brain, BookOpen, Calendar, Target, BarChart3, Trophy, Layout, GraduationCap,
};

// ===== ANIMATED COUNTER =====
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

// ===== FAQ ITEM =====
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass hover-glow cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-6">
        <h3 className="text-lg font-semibold">{question}</h3>
        {open ? <ChevronUp className="w-5 h-5 text-[#A1A1AA]" /> : <ChevronDown className="w-5 h-5 text-[#A1A1AA]" />}
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-[#A1A1AA] leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

// ===== FLOATING CARD =====
function FloatingCard({ delay, className, children }: { delay: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}


export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="relative overflow-hidden">
      {/* ===== NAVBAR ===== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">StudyOS</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block text-sm text-[#A1A1AA] hover:text-white transition-colors px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity btn-ripple"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ===== HERO SECTION ===== */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#6366F1]/10 blur-[120px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#06B6D4]/5 blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-sm px-4 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm text-[#A1A1AA]">The AI-Powered Operating System for Students</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            The Smartest Workspace
            <br />
            <span className="gradient-text">for Every Student.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI tutoring, smart planning, rich notes, productivity tools, and powerful analytics — all unified in one beautifully designed workspace.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/register"
              className="gradient-bg text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:opacity-90 transition-all btn-ripple flex items-center gap-2 shadow-lg shadow-[#6366F1]/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="glass hover-glow text-white font-semibold px-8 py-4 rounded-2xl text-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 relative"
          >
            <div className="glass p-2 sm:p-4 max-w-5xl mx-auto">
              <div className="bg-[#0F0F12] rounded-2xl p-4 sm:p-8 border border-[#1E1E24]">
                {/* Mock dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm">AJ</div>
                    <div>
                      <div className="font-semibold text-sm">Good Morning, Alex!</div>
                      <div className="text-xs text-[#A1A1AA]">Ready to conquer today?</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  </div>
                </div>
                {/* Mock stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Study Streak", value: "14 days", icon: "🔥" },
                    { label: "Weekly Hours", value: "29.4h", icon: "⏱️" },
                    { label: "Assignments", value: "6/8", icon: "📋" },
                    { label: "XP Points", value: "4,250", icon: "⭐" },
                  ].map((s) => (
                    <div key={s.label} className="glass-sm p-3 rounded-xl">
                      <div className="text-lg mb-1">{s.icon}</div>
                      <div className="text-lg font-bold">{s.value}</div>
                      <div className="text-xs text-[#A1A1AA]">{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Mock chart bars */}
                <div className="flex items-end gap-2 h-20">
                  {[40, 65, 50, 80, 70, 90, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
                      className="flex-1 rounded-t-md gradient-bg opacity-70"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <FloatingCard delay={1.2} className="absolute -left-4 top-1/4 hidden lg:block">
              <div className="glass-sm p-3 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E]/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#22C55E]" />
                </div>
                <div>
                  <div className="text-xs font-medium">Assignment Complete</div>
                  <div className="text-[10px] text-[#A1A1AA]">REST API Development</div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={1.5} className="absolute -right-4 top-1/3 hidden lg:block">
              <div className="glass-sm p-3 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-[#6366F1]" />
                </div>
                <div>
                  <div className="text-xs font-medium">AI Suggestion</div>
                  <div className="text-[10px] text-[#A1A1AA]">Review Binary Trees</div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard delay={1.8} className="absolute right-10 -bottom-4 hidden lg:block">
              <div className="glass-sm p-3 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <div>
                  <div className="text-xs font-medium">Badge Unlocked!</div>
                  <div className="text-[10px] text-[#A1A1AA]">Focus Master 🧘</div>
                </div>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== TRUSTED BY ===== */}
      <section className="py-20 border-t border-[#1E1E24]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-[#A1A1AA] mb-10 uppercase tracking-widest"
          >
            Trusted by students at top universities
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 sm:gap-16"
          >
            {["Stanford", "MIT", "Harvard", "Yale", "Princeton", "Berkeley"].map((uni) => (
              <span key={uni} className="text-xl sm:text-2xl font-bold text-[#A1A1AA]/50 tracking-wide">{uni}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 relative">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#6366F1]/5 blur-[150px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything you need to <span className="gradient-text">excel.</span>
            </h2>
            <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">
              Powerful tools designed to supercharge your academic journey, all in one unified workspace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass hover-glow p-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl gradient-bg-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#6366F1]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-24 border-t border-b border-[#1E1E24]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-[#A1A1AA]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-24 relative">
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/5 blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">students</span> everywhere.
            </h2>
            <p className="text-lg text-[#A1A1AA]">See what students are saying about StudyOS.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass hover-glow p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-[#A1A1AA] leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-[#A1A1AA]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to transform your<br /><span className="gradient-text">study game?</span>
            </h2>
            <p className="text-lg text-[#A1A1AA] mb-10 max-w-xl mx-auto">
              Join 50,000+ students who are already studying smarter with StudyOS. Start for free, no credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-10 py-4 rounded-2xl text-lg hover:opacity-90 transition-all btn-ripple shadow-lg shadow-[#6366F1]/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 border-t border-[#1E1E24]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#1E1E24] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StudyOS</span>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                The AI-powered operating system for students. Study smarter, not harder.
              </p>
              <div className="flex gap-3">
                {[MessageCircle, GitFork, Globe, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl glass-sm flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#6366F1]/50 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
              { title: "Resources", links: ["Blog", "Help Center", "Community", "API Docs"] },
              { title: "Company", links: ["About", "Careers", "Privacy", "Terms"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[#A1A1AA] hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1E1E24] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#A1A1AA]">© 2026 StudyOS. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
              <Shield className="w-4 h-4" />
              <span>SOC 2 Compliant • GDPR Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
