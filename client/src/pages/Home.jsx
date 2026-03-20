import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Rocket, GitPullRequest, Users, MessageSquare,
  Zap, Shield, ArrowRight, CheckCircle
} from "lucide-react";

// Home.jsx — the public landing page.
// Shown at "/" for all unauthenticated visitors.
// Goal: communicate DevCollab's value and drive signups.
const features = [
  {
    icon: GitPullRequest,
    title: "Kanban Project Boards",
    desc: "Drag-and-drop task management with priority indicators, assignees, and progress tracking built for dev teams.",
    color: "text-[#8A2BE2]",
    bg: "bg-[#8A2BE2]/10",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Create teams, invite collaborators, assign roles, and keep everyone aligned on shared projects.",
    color: "text-[#00F0FF]",
    bg: "bg-[#00F0FF]/10",
  },
  {
    icon: MessageSquare,
    title: "Real-time Messaging",
    desc: "Direct messages between teammates with read receipts, conversation threads, and unread badges.",
    color: "text-[#8A2BE2]",
    bg: "bg-[#8A2BE2]/10",
  },
  {
    icon: Shield,
    title: "Secure JWT Auth",
    desc: "Industry-standard bcrypt password hashing and JWT token authentication protect every user session.",
    color: "text-[#00F0FF]",
    bg: "bg-[#00F0FF]/10",
  },
  {
    icon: Zap,
    title: "Tech Stack Tracking",
    desc: "Tag projects with your exact stack — React, Node, MongoDB — and surface matching collaborators.",
    color: "text-[#8A2BE2]",
    bg: "bg-[#8A2BE2]/10",
  },
  {
    icon: CheckCircle,
    title: "Progress Analytics",
    desc: "Visual completion bars, sprint countdowns, and activity timelines so you always know where things stand.",
    color: "text-[#00F0FF]",
    bg: "bg-[#00F0FF]/10",
  },
];

const stats = [
  { value: "10k+", label: "Developers" },
  { value: "4.2k+", label: "Projects Built" },
  { value: "98%", label: "Uptime SLA" },
  { value: "120+", label: "Countries" },
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-300 font-sans overflow-x-hidden selection:bg-[#602ee6]/30">

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-[#8A2BE2]/15 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-[#00F0FF]/10 rounded-full blur-[140px]"
        />
      </div>

      {/* ── HEADER / NAV ── */}
      <header className="relative z-20 w-full px-8 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-[#05050A]/60">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#00F0FF] to-[#602ee6] rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Rocket className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg tracking-wide">DevCollab</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Why Us</a>
          <a href="#cta" className="hover:text-white transition-colors">Get Started</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm text-white px-5 py-2 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] hover:opacity-90 font-semibold transition-opacity shadow-[0_0_20px_rgba(138,43,226,0.3)]"
          >
            Get Started Free
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-8 pt-28 pb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#8A2BE2] bg-[#8A2BE2]/10 border border-[#8A2BE2]/20 px-4 py-2 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" fill="currentColor" />
              The Developer Collaboration Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.1 }}
            className="text-[58px] md:text-[76px] font-bold text-white leading-[1.05] tracking-tight mb-6 max-w-5xl"
          >
            Build Together.{" "}
            <span className="bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] bg-clip-text text-transparent">
              Ship Faster.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: "spring" }}
            className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          >
            DevCollab brings your team's projects, tasks, and conversations into one
            beautifully designed workspace — from first commit to production deploy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="flex items-center gap-4 flex-wrap justify-center"
          >
            <Link
              to="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] hover:opacity-90 text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-[0_0_30px_rgba(138,43,226,0.4)] transition-opacity"
            >
              Start for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-colors"
            >
              View Live Demo
            </Link>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section id="stats" className="max-w-7xl mx-auto px-8 pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                className="bg-[#120d1d]/60 border border-white/5 rounded-2xl p-6 text-center hover:border-white/10 transition-colors"
              >
                <p className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="max-w-7xl mx-auto px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything your team needs
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              From project inception to deployment — all the tools in one clean interface.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-[#120d1d]/70 border border-white/5 hover:border-white/10 rounded-2xl p-7 transition-all group"
              >
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#00F0FF] transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="max-w-4xl mx-auto px-8 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#8A2BE2]/20 to-[#00F0FF]/10 border border-white/10 rounded-3xl p-14"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to ship with your team?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Free to use. No credit card required. Set up in under 60 seconds.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] text-white px-10 py-4 rounded-full font-bold text-base hover:opacity-90 shadow-[0_0_40px_rgba(138,43,226,0.4)] transition-opacity"
            >
              Create Your Workspace
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-[#8A2BE2]" />
          <span className="font-semibold text-gray-400">DevCollab</span>
          <span>· Built for developers, by developers.</span>
        </div>
        <div className="flex gap-6">
          <Link to="/login" className="hover:text-gray-300 transition-colors">Sign In</Link>
          <Link to="/register" className="hover:text-gray-300 transition-colors">Sign Up</Link>
        </div>
      </footer>
    </div>
  );
}
