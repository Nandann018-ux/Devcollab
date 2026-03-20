import { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Rocket,
  LayoutDashboard,
  FolderGit2,
  Users,
  MessageSquare,
  Settings,
  PanelLeftClose,
  Search,
  Bell,
  LogOut,
  Palette,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTheme, themes } from "../context/ThemeContext";
import GlobalFooter from "./GlobalFooter";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, cycleTheme } = useTheme();

  const [searchFocused, setSearchFocused] = useState(false);

  // Display name: use the logged-in user's name or fall back to "Nandan"
  const displayName = user?.name || "Nandan";
  const avatarSeed = user?.avatar || "Nandan";

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Projects", icon: FolderGit2, path: "/projects" },
    { name: "Teams", icon: Users, path: "/teams" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const activeNav = navItems.find(item => item.path === location.pathname)?.name || "Dashboard";

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 } },
  };
  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <div className="h-screen w-screen bg-[#05050A] text-gray-300 font-sans flex flex-col overflow-hidden selection:bg-[#602ee6]/30">
      <div className="flex flex-1 overflow-hidden">
        
        {/* Ambient Nebula Background */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none z-0"
        >
          <div className="w-full h-full bg-gradient-to-r from-[#00F0FF]/10 to-[#8A2BE2]/10 rounded-full blur-[160px]" />
        </motion.div>

        {/* ── SIDEBAR ── */}
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="w-[260px] h-full bg-[#120d1d]/80 border-r border-white/5 backdrop-blur-xl flex flex-col pt-6 pb-4 px-4 z-20 flex-shrink-0"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex flex-col mb-10 px-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#00F0FF] to-[#602ee6] rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Rocket className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg tracking-wide">DevCollab</span>
            </div>
            <span className="text-[10px] text-[#8A2BE2] font-semibold tracking-[0.2em] uppercase mt-1 pl-10">
              {themes[theme]?.label || "Deep Space"}
            </span>
          </motion.div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2 relative">
            {navItems.map((item) => (
              <motion.div variants={itemVariants} key={item.name} className="relative group">
                {activeNav === item.name && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {activeNav === item.name && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#8A2BE2] rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl relative z-10 transition-colors ${activeNav === item.name ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
                >
                  <item.icon className={`w-[18px] h-[18px] ${activeNav === item.name ? "text-[#8A2BE2]" : "text-gray-500"}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Sidebar Bottom Actions */}
          <div className="mt-auto space-y-2">
            {!user ? (
               <motion.button
               variants={itemVariants}
               onClick={() => navigate("/login")}
               className="w-full flex items-center gap-3 px-4 py-3 bg-[#602ee6]/20 hover:bg-[#602ee6]/40 border border-[#602ee6]/30 rounded-xl text-[#00F0FF] transition-colors text-sm font-medium"
             >
               <LogOut className="w-[18px] h-[18px] rotate-180" />
               Log In
             </motion.button>
            ) : (
              <motion.button
                variants={itemVariants}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
              >
                <LogOut className="w-[18px] h-[18px]" />
                Sign Out
              </motion.button>
            )}
            <motion.button
              variants={itemVariants}
              className="w-full flex items-center gap-3 px-4 py-3 bg-black/20 hover:bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              <PanelLeftClose className="w-[18px] h-[18px] text-gray-500" />
              Collapse Sidebar
            </motion.button>
          </div>
        </motion.aside>

        {/* ── MAIN CONTENT AREA ── */}
        <div className="flex-1 flex flex-col overflow-hidden z-10">
          
          {/* HEADER */}
          <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="h-20 w-full border-b border-white/5 bg-[#05050A]/40 backdrop-blur-md px-8 flex items-center justify-between"
          >
            {/* Search Bar */}
            <div className="relative group w-[400px]">
              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -inset-[1px] rounded-[14px] overflow-hidden pointer-events-none"
                  >
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,transparent_60%,#00F0FF_80%,#8A2BE2_100%)]"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                    <motion.div className="absolute inset-[1px] rounded-[13px] bg-[#0A0512]" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={`relative flex items-center bg-[#120d1d] border ${searchFocused ? "border-transparent" : "border-white/5 hover:border-white/10"} rounded-[13px] overflow-hidden transition-colors`}>
                <Search className="w-[16px] h-[16px] text-gray-500 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Quick command (⌘ + K)"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent text-sm text-white focus:outline-none placeholder-gray-600"
                />
              </div>
            </div>

            {/* Header Right — bell, theme toggle, profile */}
            <div className="flex items-center gap-4">
              {/* Theme Cycle Button */}
              <motion.button
                onClick={cycleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={`Current: ${themes[theme]?.label} — click to change theme`}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-2 rounded-full text-xs font-medium"
              >
                <Palette className="w-[15px] h-[15px]" />
                <span className="hidden md:inline">{themes[theme]?.label}</span>
              </motion.button>

              {/* Notification Bell */}
              <motion.button
                className="relative text-gray-400 hover:text-white transition-colors"
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.5 }}
              >
                <Bell className="w-[20px] h-[20px]" />
                <span className="absolute top-[1px] right-[2px] w-2 h-2 bg-[#00F0FF] rounded-full ring-2 ring-[#05050A]" />
              </motion.button>

              {/* Profile Pill */}
              <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 py-1.5 pl-1.5 pr-4 rounded-full cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-[1px] flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&backgroundColor=transparent`}
                    alt={displayName}
                    className="w-full h-full bg-[#1c1425] rounded-full"
                  />
                </div>
                <span className="text-sm text-white font-medium">{displayName}</span>
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.header>

          {/* PAGE CONTENT OUTLET */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
