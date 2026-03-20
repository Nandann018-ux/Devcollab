import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Mail, Link as LinkIcon, UserPlus, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getTeams } from "../services/teamService";
import GlobalFooter from "../components/GlobalFooter";

// Dummy Data Architecture
const initialDevelopers = [
    {
        id: "dev-1",
        name: "Alex Rivera",
        role: "Senior Full-Stack Engineer",
        avatar: "Alex",
        status: "online",
        verified: true,
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        bio: "Building high-performance distributed systems. Open-source contributor.",
    },
    {
        id: "dev-2",
        name: "Sarah Chen",
        role: "Lead UI/UX Designer",
        avatar: "Sarah",
        status: "offline",
        verified: true,
        skills: ["Figma", "Framer", "React", "CSS"],
        bio: "Obsessed with creating fluid, micro-interaction heavy interfaces.",
    },
    {
        id: "dev-3",
        name: "Marcus Thorne",
        role: "Database Architect",
        avatar: "Marcus",
        status: "online",
        verified: false,
        skills: ["PostgreSQL", "Redis", "Go", "Docker"],
        bio: "Scaling data layers for millions of concurrent connections.",
    },
    {
        id: "dev-4",
        name: "Elena Rostova",
        role: "Machine Learning Engineer",
        avatar: "Elena",
        status: "away",
        verified: true,
        skills: ["Python", "TensorFlow", "PyTorch", "CUDA"],
        bio: "Training LLMs and optimizing inference engines.",
    },
    {
        id: "dev-5",
        name: "David Kim",
        role: "Frontend Developer",
        avatar: "David",
        status: "online",
        verified: false,
        skills: ["Vue", "Nuxt", "Tailwind", "GSAP"],
        bio: "Bringing static concepts to life with performant animations.",
    },
    {
        id: "dev-6",
        name: "Priya Patel",
        role: "DevOps Specialist",
        avatar: "Priya",
        status: "online",
        verified: true,
        skills: ["Kubernetes", "Terraform", "CI/CD", "Linux"],
        bio: "Automating all the things robustly and securely.",
    }
];

export default function Teams() {
    const { user } = useAuth();
    const [developers, setDevelopers] = useState(initialDevelopers);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch real teams from the API if the user is logged in.
    // Falls back to displaying the dummy developer cards if not authenticated.
    useEffect(() => {
        if (user && user.token) {
            getTeams()
                .then((teams) => {
                    // Map team members into the same shape as our dummy data so the UI renders uniformly
                    if (teams.length > 0) {
                        const mapped = teams.flatMap(t => t.members || []).map(m => ({
                            id: m._id,
                            name: m.name,
                            role: m.role || "Developer",
                            avatar: m.avatar || m.name,
                            status: "online",
                            verified: true,
                            skills: [],
                            bio: "",
                        }));
                        if (mapped.length > 0) setDevelopers(mapped);
                    }
                })
                .catch(() => {}); // Silently keep dummy data on error
        }
    }, [user]);

    // Filter developers by search query client-side (no extra API call needed for this)
    const filteredDevelopers = developers.filter(d =>
        !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
    };

    return (
        <div className="h-full font-sans p-8 flex flex-col relative overflow-hidden">

            {/* Background Ambient Nebula */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[900px] h-[900px] pointer-events-none z-0"
            >
                <div className="w-full h-full bg-gradient-to-r from-[#602ee6]/15 to-[#00F0FF]/10 rounded-full blur-[150px]" />
            </motion.div>

            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full">
                {/* Header & Controls */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Developer Network</h1>
                        <p className="text-[14px] text-gray-400">Find world-class talent and build your ultimate team.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative group w-full md:w-[320px]">
                            <AnimatePresence>
                                {searchFocused && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none"
                                    >
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0%,transparent_60%,#00F0FF_80%,#602ee6_100%)]"
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                        />
                                        <motion.div className="absolute inset-[1px] rounded-[11px] bg-[#0A0512]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className={`relative flex items-center bg-[#120d1d] border ${searchFocused ? 'border-transparent' : 'border-white/5 hover:border-white/10'} rounded-xl transition-colors`}>
                                <Search className="w-4 h-4 text-gray-500 absolute left-4 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search by role, name, or skill..."
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                    className="w-full pl-11 pr-4 py-2.5 bg-transparent text-sm text-white focus:outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>
                        {/* Filter */}
                        <button className="bg-[#120d1d] hover:bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl text-sm text-gray-300 transition-colors flex items-center gap-2 flex-shrink-0">
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </motion.div>

                {/* Developer Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12"
                >
                    {filteredDevelopers.map((dev) => (
                        <motion.div
                            key={dev.id}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                            className="bg-[#120d1d]/80 border border-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col hover:border-white/10 hover:shadow-[0_8px_30px_rgba(96,46,230,0.12)] transition-all group relative overflow-hidden"
                        >
                            {/* Subtle gradient hover wash */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#602ee6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="relative">
                                    <img
                                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${dev.avatar}&backgroundColor=e2e8f0`}
                                        alt={dev.name}
                                        className="w-16 h-16 rounded-2xl border border-white/10 bg-gray-800 object-cover"
                                    />
                                    {/* Status dot */}
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-[2.5px] border-[#120d1d] ${dev.status === 'online' ? 'bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]' :
                                            dev.status === 'away' ? 'bg-yellow-400' : 'bg-gray-500'
                                        }`} />
                                </div>
                                <div className="flex gap-2 text-gray-500">
                                    <button className="p-1.5 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5"><Mail className="w-4 h-4" /></button>
                                    <button className="p-1.5 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5"><LinkIcon className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div className="relative z-10 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">{dev.name}</h3>
                                    {dev.verified && <ShieldCheck className="w-4 h-4 text-[#602ee6]" />}
                                </div>
                                <p className="text-[13px] text-[#8A2BE2] font-semibold tracking-wide mb-3">{dev.role}</p>
                                <p className="text-[13px] text-gray-400 leading-relaxed mb-5 line-clamp-2">
                                    {dev.bio}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {dev.skills.map(skill => (
                                        <span key={skill} className="text-[10px] uppercase tracking-wider font-bold text-gray-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Glowing Invite Button */}
                            <button className="w-full relative group/btn overflow-hidden rounded-xl bg-[#191425] border border-[#602ee6]/30 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-white transition-all hover:bg-[#602ee6] hover:border-[#602ee6]">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#602ee6]/0 via-[#00F0FF]/20 to-[#602ee6]/0 -translate-x-[100%] group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    Invite to Team
                                </span>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <GlobalFooter />
        </div>
    );
}
