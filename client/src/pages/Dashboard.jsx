import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Rocket,
  Users,
  MessageSquare,
  Plus,
  Zap,
  CheckCircle2,
  GitCommitHorizontal,
  GitPullRequest,
  Eye,
  UserPlus,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import GlobalFooter from "../components/GlobalFooter";
import { getProjects } from "../services/projectService";

// ── Parallax Card — 3D tilt on hover + subtle float animation ──
const ParallaxCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: [-4, 4, -4], opacity: 1 }}
      transition={{
        y: { duration: 6 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Dummy data — used when no token is present
const DUMMY_PROJECTS = [
  {
    _id: "d1",
    name: "Project Alpha",
    description: "High-performance React dashboard with real-time WebSockets.",
    status: "active",
    techStack: ["React 19", "Tailwind CSS", "TypeScript"],
    progress: 74,
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    members: [1, 2, 3, 4, 5],
  },
  {
    _id: "d2",
    name: "CyberNexus API",
    description: "Node.js microservices architecture handling millions of requests/sec.",
    status: "active",
    techStack: ["Node.js", "PostgreSQL", "Docker"],
    progress: 32,
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    members: [4, 5],
  },
];

const DUMMY_ACTIVITY = [
  { icon: GitCommitHorizontal, bg: "bg-[#8A2BE2]/20", iconColor: "text-[#8A2BE2]", user: "Nandan", action: "pushed to", project: "Project Alpha", desc: "Fixed WebSocket connection timeout on production environment.", time: "2 MINUTES AGO" },
  { icon: MessageSquare, bg: "bg-[#00F0FF]/20", iconColor: "text-[#00F0FF]", user: "Sarah Chen", action: "requested review", project: "", desc: "Refactor landing page hero section with Three.js components.", time: "1 HOUR AGO" },
  { icon: CheckCircle2, bg: "bg-[#10B981]/20", iconColor: "text-[#10B981]", user: "CI/CD Pipeline", action: "succeeded", project: "", desc: "Deploying v2.4.0 to staging-cluster-01.", time: "3 HOURS AGO" },
  { icon: Users, bg: "bg-white/5", iconColor: "text-gray-400", user: "Marcus Thorne", action: "joined", project: "Teams", desc: "Welcome to the Nexus development group.", time: "YESTERDAY" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState(DUMMY_PROJECTS);

  // If the user has a valid token, fetch real projects from the API.
  useEffect(() => {
    if (user && user.token) {
      getProjects()
        .then((data) => setProjects(data))
        .catch(() => setProjects(DUMMY_PROJECTS)); // Gracefully fall back to dummy data
    }
  }, [user]);

  // Display name: use the logged-in user's name or fall back to "Nandan"
  const displayName = user?.name || "Nandan";

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <div className="p-8 pb-0 flex-1 flex flex-col min-h-full">
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-12 flex-1 w-full"
      >
        {/* Welcome Row */}
        <motion.div variants={itemVariants} className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              Welcome back, {displayName}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
                className="w-4 h-1 bg-[#8A2BE2] block mt-auto mb-1"
              />
            </h1>
            <p className="text-gray-400 text-[15px]">
              Systems online. You have{" "}
              <span className="text-[#00F0FF] font-semibold">4 pending PRs</span> across{" "}
              {projects.length} repositories.
            </p>
          </div>
          <Link
            to="/projects"
            className="bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] hover:opacity-90 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-opacity"
          >
            <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
            Create New Project
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-6">
          {[
            { title: "Active Projects", value: projects.length.toString(), icon: Rocket, iColor: "text-[#8A2BE2]", bg: "bg-[#8A2BE2]/10", bars: ["h-2", "h-4", "h-3", "h-5", "h-7"], color: "bg-[#8A2BE2]" },
            { title: "Pending Tasks", value: "45", icon: GitPullRequest, iColor: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10", bars: ["h-3", "h-2", "h-5", "h-4", "h-6"], color: "bg-[#00F0FF]" },
            { title: "Profile Views", value: "1.2k", icon: Eye, iColor: "text-[#8A2BE2]", bg: "bg-[#8A2BE2]/10", bars: ["h-1", "h-2", "h-3", "h-4", "h-7"], color: "bg-[#8A2BE2]" },
            { title: "Team Invites", value: "3", icon: UserPlus, iColor: "text-[#00F0FF]", bg: "bg-[#00F0FF]/10", bars: ["h-2", "h-4", "h-2", "h-3", "h-8"], color: "bg-[#00F0FF]" },
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
              <div className="flex items-end gap-1.5 h-8">
                {stat.bars.map((h, j) => (
                  <motion.div
                    key={j}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ delay: 0.8 + j * 0.1, duration: 0.5, type: "spring" }}
                    className={`w-full ${h} ${stat.color} rounded-t-sm opacity-${j === 4 ? "100" : "40"}`}
                  />
                ))}
              </div>
            </ParallaxCard>
          ))}
        </motion.div>

        {/* Projects + Activity */}
        <div className="grid grid-cols-12 gap-8 pb-10">
          {/* Active Projects */}
          <motion.div variants={itemVariants} className="col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-[18px] h-[18px] text-[#8A2BE2]" fill="currentColor" />
                Active Projects
              </h2>
              <Link to="/projects" className="text-[13px] text-[#8A2BE2] font-semibold hover:underline">View all</Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {projects.slice(0, 2).map((project, idx) => (
                <ParallaxCard
                  key={project._id}
                  className="bg-[#120d1d] border border-white/5 rounded-2xl p-6 hover:border-white/10 flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-[10px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-1 rounded tracking-wider uppercase">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-400 mb-6 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.techStack || []).map((tag) => (
                      <span key={tag} className="text-[11px] text-gray-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between text-[11px] font-medium text-gray-400 mb-2">
                      <span>Completion</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center">
                        {(project.members || []).slice(0, 3).map((_, i) => (
                          <img
                            key={i}
                            className={`w-7 h-7 rounded-full border-2 border-[#120d1d] bg-gray-800 ${i !== 0 ? "-ml-2" : ""}`}
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=M${idx}${i}&backgroundColor=e2e8f0`}
                            alt="Member"
                          />
                        ))}
                        {project.members?.length > 3 && (
                          <div className="w-7 h-7 rounded-full border-2 border-[#120d1d] bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400 -ml-2">
                            +{project.members.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-500">
                        Updated {new Date(project.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </ParallaxCard>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GitCommitHorizontal className="w-[18px] h-[18px] text-[#00F0FF]" />
                Recent Activity
              </h2>
            </div>

            <div className="bg-[#120d1d] border border-white/5 rounded-2xl p-6 shadow-lg h-[430px] overflow-y-auto">
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative border-l border-white/10 ml-4 space-y-8"
              >
                {DUMMY_ACTIVITY.map((act, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { type: "spring" } } }}
                    className="relative pl-6"
                  >
                    <div className={`absolute -left-4 top-0 w-8 h-8 rounded-full ${act.bg} border border-[#120d1d] flex items-center justify-center -translate-x-1/2`}>
                      <act.icon className={`w-3.5 h-3.5 ${act.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-[13px] text-gray-300 leading-snug">
                        <span className="font-bold text-white">{act.user}</span> {act.action}{" "}
                        {act.project && <span className="text-[#8A2BE2]">{act.project}</span>}
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

      <GlobalFooter />
    </div>
  );
}