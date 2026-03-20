import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Clock, MessageSquare, Paperclip } from "lucide-react";

// Dummy Data Architecture
const initialColumns = [
    { id: "col-1", title: "Backlog", count: 3 },
    { id: "col-2", title: "In Progress", count: 2 },
    { id: "col-3", title: "In Review", count: 1 },
    { id: "col-4", title: "Completed", count: 4 },
];

const initialTasks = [
    {
        id: "task-1",
        columnId: "col-1",
        title: "Implement SSO Authentication",
        priority: "high", // red
        tags: ["OAuth", "Backend"],
        assignee: { name: "Alex R.", avatar: "Alex" },
        comments: 4,
        attachments: 1,
    },
    {
        id: "task-2",
        columnId: "col-1",
        title: "Design System Migration",
        priority: "medium", // yellow
        tags: ["UI/UX", "Tailwind"],
        assignee: { name: "Sarah C.", avatar: "Sarah" },
        comments: 12,
        attachments: 3,
    },
    {
        id: "task-3",
        columnId: "col-1",
        title: "Update Terms of Service",
        priority: "low", // green
        tags: ["Legal"],
        assignee: { name: "Mike T.", avatar: "Mike" },
        comments: 0,
        attachments: 0,
    },
    {
        id: "task-4",
        columnId: "col-2",
        title: "WebSocket Dashboard Integration",
        priority: "high",
        tags: ["Real-time", "React"],
        assignee: { name: "Alex R.", avatar: "Alex" },
        comments: 8,
        attachments: 2,
    },
    {
        id: "task-5",
        columnId: "col-2",
        title: "Database Indexing Optimization",
        priority: "medium",
        tags: ["PostgreSQL", "Performance"],
        assignee: { name: "Marcus T.", avatar: "Marcus" },
        comments: 2,
        attachments: 0,
    },
    {
        id: "task-6",
        columnId: "col-3",
        title: "Landing Page Three.js Hero",
        priority: "medium",
        tags: ["WebGL", "Frontend"],
        assignee: { name: "Sarah C.", avatar: "Sarah" },
        comments: 15,
        attachments: 4,
    },
    {
        id: "task-7",
        columnId: "col-4",
        title: "Setup CI/CD Pipeline",
        priority: "high",
        tags: ["DevOps", "GitHub Actions"],
        assignee: { name: "Alex R.", avatar: "Alex" },
        comments: 5,
        attachments: 0,
    },
];

const priorityColors = {
    high: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
    medium: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]",
    low: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
};

export default function Projects() {
    const [columns] = useState(initialColumns);
    const [tasks] = useState(initialTasks);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const columnVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } }
    };

    return (
        <div className="h-full font-sans p-8 flex flex-col relative overflow-hidden">

            {/* Background Ambient Nebula */}
            <motion.div
                animate={{
                    scale: [0.95, 1.05, 0.95],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[800px] h-[800px] pointer-events-none z-0"
            >
                <div className="w-full h-full bg-gradient-to-l from-[#8A2BE2]/10 to-[#00F0FF]/10 rounded-full blur-[140px]" />
            </motion.div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex items-center justify-between mb-8 relative z-10"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Project Alpha Kanban</h1>
                    <p className="text-[14px] text-gray-400">Manage tasks, track progress, and ship faster.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center -space-x-2 mr-4">
                        {["Alex", "Sarah", "Mike"].map((seed, i) => (
                            <img
                                key={seed}
                                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e2e8f0`}
                                className={`w-8 h-8 rounded-full border-2 border-[#05050A] bg-gray-800 z-${30 - i * 10}`}
                                alt={seed}
                            />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-[#05050A] bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400 z-0">+2</div>
                    </div>
                    <button className="bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-2 rounded-lg text-sm text-gray-300 transition-colors flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        2 Weeks
                    </button>
                    <button className="bg-gradient-to-r from-[#602ee6] to-[#8A2BE2] hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(96,46,230,0.3)]">
                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                        New Task
                    </button>
                </div>
            </motion.div>

            {/* Kanban Board */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 flex gap-6 overflow-x-auto pb-4 relative z-10 scrollbar-hide"
            >
                {columns.map(col => (
                    <motion.div
                        key={col.id}
                        variants={columnVariants}
                        className="flex-shrink-0 w-[320px] flex flex-col bg-[#120d1d]/60 border border-white/5 rounded-2xl backdrop-blur-md overflow-hidden"
                    >
                        {/* Column Header */}
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-white text-[15px]">{col.title}</h3>
                                <span className="bg-white/10 text-gray-300 text-[11px] font-bold px-2 py-0.5 rounded-full">{col.count}</span>
                            </div>
                            <button className="text-gray-500 hover:text-white transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Column Tasks */}
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-[150px]">
                            {tasks.filter(t => t.columnId === col.id).map(task => (
                                <motion.div
                                    key={task.id}
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="bg-[#191425] border border-white/5 hover:border-white/10 p-4 rounded-xl cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl hover:shadow-[#602ee6]/10 transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex flex-wrap gap-2">
                                            {task.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-bold tracking-wider text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className={`w-2.5 h-2.5 rounded-full mt-1 ${priorityColors[task.priority]}`} title={`${task.priority} priority`} />
                                    </div>

                                    <h4 className="text-[14px] font-semibold text-gray-100 mb-4 group-hover:text-white leading-snug">
                                        {task.title}
                                    </h4>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex gap-3 text-gray-500 text-[12px]">
                                            {task.comments > 0 && (
                                                <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    <span>{task.comments}</span>
                                                </div>
                                            )}
                                            {task.attachments > 0 && (
                                                <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                                                    <Paperclip className="w-3.5 h-3.5" />
                                                    <span>{task.attachments}</span>
                                                </div>
                                            )}
                                        </div>
                                        <img
                                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${task.assignee.avatar}&backgroundColor=transparent`}
                                            alt={task.assignee.name}
                                            title={task.assignee.name}
                                            className="w-6 h-6 rounded-full bg-[#2a223e] border border-white/10"
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Drop Zone Placeholder effect */}
                            <div className="h-20 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 hover:border-white/20 transition-all cursor-pointer">
                                <span className="text-[12px] text-gray-500 font-medium">Drop card here</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
