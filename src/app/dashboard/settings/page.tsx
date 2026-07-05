"use client";

import { motion } from "framer-motion";
import { Settings, Moon, Sun, Bell, BellOff, Globe, Shield, Palette, User, ChevronRight, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-[#6366F1]" : "bg-[#27272A]"}`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
      />
    </button>
  );
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [studyReminders, setStudyReminders] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#6366F1]" /> Settings
        </h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Customize your StudyOS experience</p>
      </motion.div>

      {/* Appearance */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#7C3AED]" /> Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-[#6366F1]" /> : <Sun className="w-5 h-5 text-[#F59E0B]" />}
              <div>
                <div className="text-sm font-medium">Dark Mode</div>
                <div className="text-xs text-[#A1A1AA]">Toggle between dark and light theme</div>
              </div>
            </div>
            <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>

          <div className="border-t border-[#1E1E24] pt-4">
            <div className="text-sm font-medium mb-3">Accent Color</div>
            <div className="flex gap-3">
              {[
                { color: "#6366F1", name: "Indigo" },
                { color: "#7C3AED", name: "Purple" },
                { color: "#3B82F6", name: "Blue" },
                { color: "#06B6D4", name: "Cyan" },
                { color: "#22C55E", name: "Green" },
                { color: "#F59E0B", name: "Amber" },
              ].map((c) => (
                <button
                  key={c.color}
                  className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${
                    c.color === "#6366F1" ? "ring-2 ring-white ring-offset-2 ring-offset-[#09090B]" : ""
                  }`}
                  style={{ background: c.color }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-[#1E1E24] pt-4">
            <div className="text-sm font-medium mb-3">Sidebar Style</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Monitor, label: "Expanded", active: true },
                { icon: Smartphone, label: "Compact", active: false },
              ].map((style) => (
                <button
                  key={style.label}
                  className={`glass-sm p-3 flex items-center gap-2 text-sm transition-all ${
                    style.active ? "border-[#6366F1]/50 bg-[#6366F1]/5" : "hover:border-[#3F3F46]"
                  }`}
                >
                  <style.icon className="w-4 h-4" />
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#3B82F6]" /> Notifications
        </h2>
        <div className="space-y-4">
          {[
            { label: "All Notifications", desc: "Enable or disable all notifications", value: notifications, onChange: () => setNotifications(!notifications) },
            { label: "Email Notifications", desc: "Receive updates via email", value: emailNotif, onChange: () => setEmailNotif(!emailNotif) },
            { label: "Push Notifications", desc: "Browser push notifications", value: pushNotif, onChange: () => setPushNotif(!pushNotif) },
            { label: "Study Reminders", desc: "Get reminded to study", value: studyReminders, onChange: () => setStudyReminders(!studyReminders) },
          ].map((setting, i) => (
            <div key={setting.label} className={`flex items-center justify-between ${i > 0 ? "border-t border-[#1E1E24] pt-4" : ""}`}>
              <div>
                <div className="text-sm font-medium">{setting.label}</div>
                <div className="text-xs text-[#A1A1AA]">{setting.desc}</div>
              </div>
              <Toggle enabled={setting.value} onChange={setting.onChange} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Account */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#22C55E]" /> Account
        </h2>
        <div className="space-y-2">
          {[
            { label: "Edit Profile", desc: "Update your personal information" },
            { label: "Change Password", desc: "Update your login credentials" },
            { label: "Connected Accounts", desc: "Google, GitHub integrations" },
            { label: "Export Data", desc: "Download your study data" },
          ].map((a) => (
            <button key={a.label} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#18181B]/50 transition-colors text-left">
              <div>
                <div className="text-sm font-medium">{a.label}</div>
                <div className="text-xs text-[#A1A1AA]">{a.desc}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#52525B]" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Privacy */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#EF4444]" /> Privacy & Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Two-Factor Authentication</div>
              <div className="text-xs text-[#A1A1AA]">Add an extra layer of security</div>
            </div>
            <Toggle enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
          </div>
          <div className="border-t border-[#1E1E24] pt-4">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#18181B]/50 transition-colors text-left">
              <div>
                <div className="text-sm font-medium">Privacy Settings</div>
                <div className="text-xs text-[#A1A1AA]">Control who can see your profile</div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#52525B]" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Language */}
      <motion.div variants={item} className="glass p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#06B6D4]" /> Language
        </h2>
        <select className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm focus:border-[#6366F1] outline-none">
          <option value="en">English (US)</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ja">日本語</option>
        </select>
      </motion.div>

      {/* Danger zone */}
      <motion.div variants={item} className="glass p-6 border-[#EF4444]/20">
        <h2 className="font-semibold mb-4 text-[#EF4444]">Danger Zone</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">Delete Account</div>
            <div className="text-xs text-[#A1A1AA]">Permanently delete your account and all data</div>
          </div>
          <button className="px-4 py-2 rounded-xl border border-[#EF4444]/30 text-[#EF4444] text-sm hover:bg-[#EF4444]/10 transition-all">
            Delete Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
