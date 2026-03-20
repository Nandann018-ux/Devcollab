import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, BellRing, Github, Sparkles, Upload, Camera } from "lucide-react";

// Dummy Data Architecture
const userProfile = {
    name: "Alex Rivera",
    role: "Senior Full-Stack Engineer",
    email: "alex.rivera@example.com",
    github: "alexdev1337",
    bio: "Building high-performance distributed systems. Open-source contributor. Obsessed with perfect responsive design.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    avatar: "Alex"
};

const navTabs = [
    { id: "profile", label: "Public Profile", icon: User },
    { id: "account", label: "Account Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: BellRing },
];

// Generate fake github contribution data
const generateContributionGraph = () => {
    const weeks = 52;
    const daysPerWeek = 7;
    const grid = [];

    for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < daysPerWeek; d++) {
            // Create organic looking heat map
            const randomBase = Math.random();
            let intensity = 0;
            if (randomBase > 0.85) intensity = 4; // #00F0FF (Neon Cyan)
            else if (randomBase > 0.65) intensity = 3; // #8A2BE2 (Bright Purple)
            else if (randomBase > 0.4) intensity = 2; // Mid Purple
            else if (randomBase > 0.2) intensity = 1; // Dark Purple
            else intensity = 0; // Empty

            week.push(intensity);
        }
        grid.push(week);
    }
    return grid;
};

const contributionColors = {
    0: "bg-white/5 border border-white/5",
    1: "bg-[#2d1b4e] border border-[#602ee6]/20",
    2: "bg-[#602ee6] shadow-[0_0_8px_rgba(96,46,230,0.4)]",
    3: "bg-[#8A2BE2] shadow-[0_0_12px_rgba(138,43,226,0.5)]",
    4: "bg-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.6)]",
};

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profileData, setProfileData] = useState(userProfile);
    const [contributions] = useState(generateContributionGraph());

    const handleChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
    };

    return (
        <div className="h-full font-sans p-8 flex flex-col relative overflow-hidden">

            {/* Background Ambient Nebula */}
            <motion.div
                animate={{
                    scale: [0.95, 1.05, 0.95],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] pointer-events-none z-0"
            >
                <div className="w-full h-full bg-gradient-to-l from-[#8A2BE2]/10 to-[#00F0FF]/10 rounded-full blur-[140px]" />
            </motion.div>

            <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row gap-12 pt-4">

                {/* LEFT PANE - Navigation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-[260px] flex-shrink-0 space-y-8"
                >
                    <motion.div variants={itemVariants}>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Settings</h1>
                        <p className="text-[14px] text-gray-400">Manage your workspace identity and preferences.</p>
                    </motion.div>

                    <nav className="space-y-2 relative">
                        {navTabs.map((tab) => (
                            <motion.div variants={itemVariants} key={tab.id} className="relative group">
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-[#602ee6]/10 border border-[#602ee6]/30 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabLine"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-[#00F0FF] rounded-r-full shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl relative z-10 transition-colors ${activeTab === tab.id ? "text-white font-semibold" : "text-gray-400 hover:text-gray-200"
                                        }`}
                                >
                                    <tab.icon className={`w-[18px] h-[18px] ${activeTab === tab.id ? "text-[#00F0FF]" : "text-gray-500"}`} />
                                    <span className="text-sm">{tab.label}</span>
                                </button>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-gradient-to-br from-[#602ee6]/20 to-[#00F0FF]/10 border border-[#602ee6]/30 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                        <Sparkles className="w-6 h-6 text-[#00F0FF] mb-3" />
                        <h3 className="text-white font-bold text-sm mb-1">Upgrade to Pro</h3>
                        <p className="text-[12px] text-gray-300 mb-4">Get unlimited repositories, advanced CI/CD, and priority support.</p>
                        <button className="w-full bg-white text-[#120D1D] font-bold text-[12px] py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            Upgrade Now
                        </button>
                    </motion.div>
                </motion.div>

                {/* RIGHT PANE - Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        className="flex-1 bg-[#120d1d]/80 border border-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
                    >
                        {activeTab === "profile" && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Public Profile</h2>
                                    <p className="text-sm text-gray-400">This will be displayed on your organizational team cards.</p>
                                </div>

                                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row gap-8">
                                    {/* Avatar Upload */}
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative group cursor-pointer w-28 h-28">
                                            <img
                                                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${profileData.avatar}&backgroundColor=e2e8f0`}
                                                alt="Profile"
                                                className="w-full h-full rounded-2xl border-2 border-white/10 bg-gray-800 object-cover group-hover:opacity-50 transition-opacity"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <button className="text-[12px] font-semibold text-[#8A2BE2] bg-[#8A2BE2]/10 px-4 py-1.5 rounded-lg hover:bg-[#8A2BE2]/20 transition-colors flex items-center gap-2">
                                            <Upload className="w-3.5 h-3.5" />
                                            Upload New
                                        </button>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="flex-1 space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={profileData.name}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#191425] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#602ee6] transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Current Role</label>
                                                <input
                                                    type="text"
                                                    name="role"
                                                    value={profileData.role}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#191425] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#602ee6] transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Bio</label>
                                            <textarea
                                                name="bio"
                                                value={profileData.bio}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full bg-[#191425] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#602ee6] transition-colors resize-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <Github className="w-3.5 h-3.5" /> GitHub Username
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-4 text-gray-500 text-sm">github.com/</span>
                                                <input
                                                    type="text"
                                                    name="github"
                                                    value={profileData.github}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#191425] border border-white/5 rounded-xl pl-24 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#602ee6] transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-8">
                                            <button className="px-5 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors">Cancel</button>
                                            <button className="bg-[#602ee6] hover:bg-[#5025d1] text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-[0_4px_14px_0_rgba(96,46,230,0.39)] transition-all transform hover:-translate-y-0.5">Save Changes</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Contribution Graph */}
                                <div className="mt-12 pt-8 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                                            Contribution Activity
                                        </h3>
                                        <span className="text-[12px] text-gray-500 font-medium">1,432 contributions in the last year</span>
                                    </div>

                                    <div className="bg-[#05050A] border border-white/5 rounded-xl p-6 overflow-x-auto shadow-inner">
                                        <div className="flex gap-1 min-w-max">
                                            {contributions.map((week, i) => (
                                                <div key={i} className="flex flex-col gap-1">
                                                    {week.map((day, j) => (
                                                        <motion.div
                                                            key={`${i}-${j}`}
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            whileInView={{ scale: 1, opacity: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: (i * 0.01) + (j * 0.02), type: "spring" }}
                                                            className={`w-3.5 h-3.5 rounded-sm ${contributionColors[day]} hover:scale-125 hover:z-10 transition-transform cursor-pointer`}
                                                            title={`${day} contributions`}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-end gap-2 mt-4 text-[11px] text-gray-500 font-medium">
                                            <span>Less</span>
                                            <div className={`w-3 h-3 rounded-sm ${contributionColors[0]}`}></div>
                                            <div className={`w-3 h-3 rounded-sm ${contributionColors[1]}`}></div>
                                            <div className={`w-3 h-3 rounded-sm ${contributionColors[2]}`}></div>
                                            <div className={`w-3 h-3 rounded-sm ${contributionColors[3]}`}></div>
                                            <div className={`w-3 h-3 rounded-sm ${contributionColors[4]}`}></div>
                                            <span>More</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {activeTab === "account" && (
                            <div className="space-y-8 min-h-[400px]">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Account Security</h2>
                                    <p className="text-sm text-gray-400">Manage your passwords and 2FA settings.</p>
                                </div>
                                {/* Placeholder for Account settings */}
                                <div className="w-full h-40 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-sm text-gray-500">
                                    Security settings dashboard
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-8 min-h-[400px]">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Notifications</h2>
                                    <p className="text-sm text-gray-400">Control how DevCollab alerts you to activity.</p>
                                </div>
                                {/* Placeholder for Notification settings */}
                                <div className="w-full h-40 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-sm text-gray-500">
                                    Push and Email preference toggles
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
}
