import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence
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
  Plus,
  Zap,
  CheckCircle2,
  GitCommitHorizontal,
  GitPullRequest,
  Eye,
  UserPlus,
  LogOut
} from "lucide-react";

// --- Custom Parallax Card Component ---
const ParallaxCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: [-4, 4, -4],
        opacity: 1
      }}
      transition={{
        y: {
          duration: 6 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.5 }
      }}
      className={`relative perspective-1000 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" style={{ transform: "translateZ(1px)" }} />
      {children}
    </motion.div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: FolderGit2, path: "/projects" },
    { name: "Teams", icon: Users, path: "/teams" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Animation Variants
  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 }
    }
  };

  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="h-screen bg-[#05050A] text-gray-300 font-sans flex overflow-hidden selection:bg-[#602ee6]/30">

      {/* Background Ambient Nebula */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [searchFocused ? 0.4 : 0.2, searchFocused ? 0.6 : 0.3, searchFocused ? 0.4 : 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none z-0"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#00F0FF]/10 to-[#8A2BE2]/10 rounded-full blur-[160px]" />
      </motion.div>

      {/* --- SIDEBAR --- */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="w-[260px] h-full bg-[#120d1d]/80 border-r border-white/5 backdrop-blur-xl flex flex-col pt-6 pb-6 px-4 z-20 flex-shrink-0"
      >
        <motion.div variants={itemVariants} className="flex flex-col mb-10 px-2 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#00F0FF] to-[#602ee6] rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Rocket className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">DevCollab</span>
          </div>
          <span className="text-[10px] text-[#8A2BE2] font-semibold tracking-[0.2em] uppercase mt-1 pl-10">
            Deep Space Edition
          </span>
        </motion.div>

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
                onClick={() => setActiveNav(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl relative z-10 transition-colors ${activeNav === item.name ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
              >
                <item.icon className={`w-[18px] h-[18px] ${activeNav === item.name ? "text-[#8A2BE2]" : "text-gray-500"}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <motion.button
            variants={itemVariants}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </motion.button>

          <motion.button
            variants={itemVariants}
            className="w-full flex items-center gap-3 px-4 py-3 bg-black/20 hover:bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <PanelLeftClose className="w-[18px] h-[18px] text-gray-500" />
            Collapse Sidebar
          </motion.button>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
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
                  <motion.div
                    className="absolute inset-[1px] rounded-[13px] bg-[#0A0512]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`relative flex items-center bg-[#120d1d] border ${searchFocused ? 'border-transparent' : 'border-white/5 hover:border-white/10'} rounded-[13px] overflow-hidden transition-colors`}>
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

          <div className="flex items-center gap-6">
            <motion.button
              className="relative text-gray-400 hover:text-white transition-colors"
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.5 }}
            >
              <Bell className="w-[20px] h-[20px]" />
              <span className="absolute top-[1px] right-[2px] w-2 h-2 bg-[#00F0FF] rounded-full ring-2 ring-[#05050A]" />
            </motion.button>

            <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 py-1.5 pl-1.5 pr-4 rounded-full cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-[1px] flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent`} alt="Alex Rivera" className="w-full h-full bg-[#1c1425] rounded-full" />
              </div>
              <span className="text-sm text-white font-medium">Alex Rivera</span>
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto space-y-12"
          >
            {/* Top Section */}
            <motion.div variants={itemVariants} className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  Welcome back, Developer
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
                    className="w-4 h-1 bg-[#8A2BE2] block mt-auto mb-1"
                  />
                </h1>
                <p className="text-gray-400 text-[15px]">
                  Systems online. You have <span className="text-[#00F0FF] font-semibold">4 pending PRs</span> across 2 repositories.
                </p>
              </div>

              <button className="bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] hover:opacity-90 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-opacity">
                <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                Create New Project
              </button>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-6">
              {[
                { title: "Active Projects", value: "12", icon: Rocket, iColor: "text-[#8A2BE2]", bg: "bg-[#8A2BE2]/10", bars: ['h-2', 'h-4', 'h-3', 'h-5', 'h-7'], color: 'bg-[#8A2BE2]' },
                { title: "Pending Tasks", value: "45", icon: GitPullRequest, iColor: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10", bars: ['h-3', 'h-2', 'h-5', 'h-4', 'h-6'], color: 'bg-[#00F0FF]' },
                { title: "Profile Views", value: "1.2k", icon: Eye, iColor: "text-[#8A2BE2]", bg: "bg-[#8A2BE2]/10", bars: ['h-1', 'h-2', 'h-3', 'h-4', 'h-7'], color: 'bg-[#8A2BE2]' },
                { title: "Team Invites", value: "3", icon: UserPlus, iColor: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10", bars: ['h-2', 'h-4', 'h-2', 'h-3', 'h-8'], color: 'bg-[#00F0FF]' },
              ].map((stat, i) => (
                <ParallaxCard key={i} className="bg-[#120d1d] border border-white/5 rounded-2xl p-5 hover:border-white/10 shadow-lg">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-[13px] text-gray-400 font-medium mb-1">{stat.title}</h3>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-[18px] h-[18px] ${stat.iColor}`} />
                    </div>
                  </div>

                  {/* Mini Bar Chart */}
                  <div className="flex items-end gap-1.5 h-8">
                    {stat.bars.map((h, j) => (
                      <motion.div
                        key={j}
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        transition={{ delay: 0.8 + (j * 0.1), duration: 0.5, type: "spring" }}
                        className={`w-full ${h} ${stat.color} rounded-t-sm opacity-${j === 4 ? '100 shadow-[0_0_10px_' + stat.color.replace('bg-', '') + ']' : '40 hover:opacity-80 transition-opacity'}`}
                      />
                    ))}
                  </div>
                </ParallaxCard>
              ))}
            </motion.div>

            {/* Bottom Section Layout */}
            <div className="grid grid-cols-12 gap-8">

              {/* Active Projects (Span 8) */}
              <motion.div variants={itemVariants} className="col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-[18px] h-[18px] text-[#8A2BE2]" fill="currentColor" />
                    Active Projects
                  </h2>
                  <button className="text-[13px] text-[#8A2BE2] font-semibold hover:underline">View all</button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Project Alpha */}
                  <ParallaxCard className="bg-[#120d1d] border border-white/5 rounded-2xl p-6 hover:border-white/10 flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">Project Alpha</h3>
                      <span className="text-[10px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-1 rounded tracking-wider">IN PROGRESS</span>
                    </div>
                    <p className="text-[13px] text-gray-400 mb-6 flex-1">
                      High-performance React dashboard with real-time WebSockets processing and unified analytics view.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {["React 19", "Tailwind CSS", "TypeScript"].map((tag) => (
                        <span key={tag} className="text-[11px] text-gray-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">{tag}</span>
                      ))}
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between text-[11px] font-medium text-gray-400 mb-2">
                        <span>Completion</span>
                        <span className="text-white">74%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "74%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#8A2BE2] to-[#b37cf5] rounded-full shadow-[0_0_10px_rgba(138,43,226,0.5)]"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        {/* Overlapping Avatars with hover expand */}
                        <div className="flex items-center group/avatars">
                          {[1, 2, 3].map((i) => (
                            <motion.img
                              key={i}
                              whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
                              className={`w-7 h-7 rounded-full border-2 border-[#120d1d] bg-gray-800 ${i !== 1 ? '-ml-2 group-hover/avatars:-ml-0 transition-all duration-300 relative' : 'relative z-30'}`}
                              src={`https://api.dicebear.com/7.x/notionists/svg?seed=P${i}&backgroundColor=e2e8f0`}
                              alt="Avatar"
                            />
                          ))}
                          <div className="w-7 h-7 rounded-full border-2 border-[#120d1d] bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400 -ml-2 group-hover/avatars:-ml-0 transition-all duration-300 relative z-0">
                            +2
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-500">Updated 2h ago</span>
                      </div>
                    </div>
                  </ParallaxCard>

                  {/* CyberNexus API */}
                  <ParallaxCard className="bg-[#120d1d] border border-white/5 rounded-2xl p-6 hover:border-white/10 flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#8A2BE2] transition-colors">CyberNexus API</h3>
                      <span className="text-[10px] font-bold text-[#8A2BE2] bg-[#8A2BE2]/10 px-2 py-1 rounded tracking-wider">V2 BRANCH</span>
                    </div>
                    <p className="text-[13px] text-gray-400 mb-6 flex-1">
                      Node.js microservices architecture handling millions of requests per second for the core trading engine.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {["Node.js", "PostgreSQL", "Docker"].map((tag) => (
                        <span key={tag} className="text-[11px] text-gray-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">{tag}</span>
                      ))}
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between text-[11px] font-medium text-gray-400 mb-2">
                        <span>Completion</span>
                        <span className="text-white">32%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "32%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#60f8ff] rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center group/avatars">
                          {[4, 5].map((i) => (
                            <motion.img
                              key={i}
                              whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
                              className={`w-7 h-7 rounded-full border-2 border-[#120d1d] bg-gray-800 ${i !== 4 ? '-ml-2 group-hover/avatars:-ml-0 transition-all duration-300 relative' : 'relative z-30'}`}
                              src={`https://api.dicebear.com/7.x/notionists/svg?seed=C${i}&backgroundColor=e2e8f0`}
                              alt="Avatar"
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-500">Updated 15m ago</span>
                      </div>
                    </div>
                  </ParallaxCard>
                </div>
              </motion.div>

              {/* Recent Activity (Span 4) */}
              <motion.div variants={itemVariants} className="col-span-4 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <GitCommitHorizontal className="w-[18px] h-[18px] text-[#00F0FF]" />
                    Recent Activity
                  </h2>
                </div>

                <div className="bg-[#120d1d] border border-white/5 rounded-2xl p-6 shadow-lg h-[430px] overflow-y-auto">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative border-l border-white/10 ml-4 space-y-8"
                  >
                    {[
                      {
                        icon: GitCommitHorizontal, bg: 'bg-[#8A2BE2]/20', iconColor: 'text-[#8A2BE2]',
                        user: 'Alex Rivera', action: 'pushed to', project: 'Project Alpha',
                        desc: 'Fixed WebSocket connection timeout on production environment.', time: '2 MINUTES AGO'
                      },
                      {
                        icon: MessageSquare, bg: 'bg-[#00F0FF]/20', iconColor: 'text-[#00F0FF]',
                        user: 'Sarah Chen', action: 'requested review', project: '',
                        desc: 'Refactor landing page hero section with Three.js components.', time: '1 HOUR AGO'
                      },
                      {
                        icon: CheckCircle2, bg: 'bg-[#10B981]/20', iconColor: 'text-[#10B981]',
                        user: 'CI/CD Pipeline', action: 'succeeded', project: '',
                        desc: 'Deploying v2.4.0 to staging-cluster-01.', time: '3 HOURS AGO'
                      },
                      {
                        icon: Users, bg: 'bg-white/5', iconColor: 'text-gray-400',
                        user: 'Marcus Thorne', action: 'joined', project: 'Teams',
                        desc: 'Welcome to the Nexus development group.', time: 'YESTERDAY'
                      }
                    ].map((act, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0, transition: { type: "spring" } }
                        }}
                        className="relative pl-6"
                      >
                        {/* Timeline Node */}
                        <div className={`absolute -left-4 top-0 w-8 h-8 rounded-full ${act.bg} border border-[#120d1d] flex items-center justify-center -translate-x-1/2`}>
                          <act.icon className={`w-3.5 h-3.5 ${act.iconColor}`} />
                        </div>

                        <div>
                          <p className="text-[13px] text-gray-300 leading-snug">
                            <span className="font-bold text-white">{act.user}</span> {act.action} {act.project && <span className="text-[#8A2BE2] hover:underline cursor-pointer">{act.project}</span>}
                          </p>
                          <p className="text-[12px] text-gray-500 mt-1.5 leading-relaxed">{act.desc}</p>
                          <p className="text-[9px] font-bold text-gray-600 mt-2 tracking-widest">{act.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}