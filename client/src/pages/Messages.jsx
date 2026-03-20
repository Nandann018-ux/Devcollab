import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Hash, Plus, SendHorizontal, Paperclip, Smile, Phone, Video, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getInbox, sendMessage as sendMessageAPI } from "../services/messageService";
import GlobalFooter from "../components/GlobalFooter";

// Dummy Data Architecture
const initialChannels = [
    { id: "c-1", name: "general", unread: 0, active: true },
    { id: "c-2", name: "engineering", unread: 3, active: false },
    { id: "c-3", name: "design-sync", unread: 0, active: false },
    { id: "c-4", name: "watercooler", unread: 12, active: false },
];

const initialDMs = [
    { id: "dm-1", name: "Sarah Chen", avatar: "Sarah", status: "offline", unread: 0 },
    { id: "dm-2", name: "Marcus Thorne", avatar: "Marcus", status: "online", unread: 1 },
];

const chatHistory = [
    { id: "m-1", senderId: "dm-2", senderName: "Alex Rivera", avatar: "Alex", text: "Hey team, did we finalize the migration path for the new DB cluster?", time: "10:24 AM", isMe: false },
    { id: "m-2", senderId: "me", senderName: "You", avatar: "Self", text: "Working on it right now. I'll push the Terraform configs in about 30 mins.", time: "10:26 AM", isMe: true },
    { id: "m-3", senderId: "dm-1", senderName: "Sarah Chen", avatar: "Sarah", text: "Awesome. I need that ready so I can connect the new WebGL dashboard components.", time: "10:28 AM", isMe: false },
    { id: "m-4", senderId: "dm-2", senderName: "Alex Rivera", avatar: "Alex", text: "Perfect. @me let me know when it's merged.", time: "10:30 AM", isMe: false },
];

export default function Messages() {
    const { user } = useAuth();
    const displayName = user?.name || "Nandan";
    const avatarSeed = user?.avatar || "Nandan";

    const [channels] = useState(initialChannels);
    const [dms] = useState(initialDMs);
    const [messages, setMessages] = useState(chatHistory);
    const [inputValue, setInputValue] = useState("");
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch real inbox messages when logged in.
    // Transform the API shape into the same flat structure our chat UI expects.
    useEffect(() => {
        if (user && user.token) {
            getInbox()
                .then((inbox) => {
                    if (inbox.length > 0) {
                        const mapped = inbox.map((m, i) => ({
                            id: m._id,
                            senderId: m.sender._id,
                            senderName: m.sender.name,
                            avatar: m.sender.avatar || m.sender.name,
                            text: m.content,
                            time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                            isMe: false,
                        }));
                        setMessages(mapped);
                    }
                })
                .catch(() => {}); // Keep dummy data on network error
        }
    }, [user]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMsg = {
            id: `m-${Date.now()}`,
            senderId: "me",
            senderName: displayName,
            avatar: avatarSeed,
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isMe: true,
        };

        setMessages([...messages, newMsg]);
        setInputValue("");

        // Fire and forget — optimistic UI update, API call in background
        if (user && user.token && dms[0]) {
            sendMessageAPI(dms[0].id, inputValue).catch(() => {});
        }
    };

    return (
        <div className="h-full flex flex-col overflow-hidden flex-1">
          <div className="flex flex-1 overflow-hidden">

            {/* LEFT PANE - Channels list */}
            <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-[280px] h-full bg-[#0A0512] border-r border-white/5 flex flex-col flex-shrink-0 z-20"
            >
                <div className="p-5 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Jump to..."
                            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/5 rounded-lg text-sm text-white focus:outline-none focus:border-[#602ee6] transition-colors"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-6">
                    {/* Channels Section */}
                    <div>
                        <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Channels</span>
                            <button className="text-gray-500 hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-0.5">
                            {channels.map(ch => (
                                <button
                                    key={ch.id}
                                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${ch.active ? 'bg-[#602ee6]/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Hash className={`w-4 h-4 ${ch.active ? 'text-[#00F0FF]' : 'text-gray-500'}`} />
                                        <span className={ch.unread > 0 ? "font-semibold text-white" : ""}>{ch.name}</span>
                                    </div>
                                    {ch.unread > 0 && (
                                        <span className="bg-[#602ee6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">{ch.unread}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Direct Messages Section */}
                    <div>
                        <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Direct Messages</span>
                            <button className="text-gray-500 hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-0.5">
                            {dms.map(dm => (
                                <button
                                    key={dm.id}
                                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors"
                                >
                                    <div className="flex items-center gap-2 relative">
                                        <img
                                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${dm.avatar}&backgroundColor=e2e8f0`}
                                            className="w-5 h-5 rounded border border-gray-700 bg-gray-600"
                                            alt={dm.name}
                                        />
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0A0512] ${dm.status === 'online' ? 'bg-[#00F0FF]' : 'bg-gray-500'}`} />
                                        <span className={dm.unread > 0 ? "font-semibold text-white" : ""}>{dm.name}</span>
                                    </div>
                                    {dm.unread > 0 && (
                                        <span className="bg-[#00F0FF] text-[#0A0512] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">{dm.unread}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT PANE - Active Chat */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col bg-[#120d1d]/40 relative"
            >
                {/* Background Ambient Nebula */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0">
                    <div className="w-full h-full bg-gradient-to-br from-[#602ee6]/10 to-[#00F0FF]/5 rounded-full blur-[100px]" />
                </div>

                {/* Chat Header */}
                <div className="h-16 border-b border-white/5 bg-[#05050A]/60 backdrop-blur-md px-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <Hash className="w-5 h-5 text-gray-400" />
                        <div>
                            <h3 className="text-[15px] font-bold text-white">general</h3>
                            <p className="text-[11px] text-[#00F0FF]">4 members • Company-wide announcements and work discussions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                        <button className="hover:text-white transition"><Phone className="w-5 h-5" /></button>
                        <button className="hover:text-white transition"><Video className="w-5 h-5" /></button>
                        <button className="hover:text-white transition"><Info className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 flex flex-col">
                    <div className="text-center my-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full">Today</span>
                    </div>

                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                            className={`flex gap-3 max-w-[80%] ${msg.isMe ? 'self-end flex-row-reverse' : 'self-start'}`}
                        >
                            <img
                                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${msg.avatar}&backgroundColor=e2e8f0`}
                                className="w-8 h-8 rounded-lg bg-gray-700 border border-white/10 flex-shrink-0"
                                alt="avatar"
                            />
                            <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-baseline gap-2 mb-1 px-1">
                                    <span className="text-[13px] font-semibold text-white">{msg.senderName}</span>
                                    <span className="text-[10px] text-gray-500 font-medium">{msg.time}</span>
                                </div>
                                <div className={`p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.isMe
                                        ? 'bg-gradient-to-br from-[#602ee6] to-[#4521a8] text-white rounded-tr-sm border border-[#602ee6]/50'
                                        : 'bg-[#191425] text-gray-300 rounded-tl-sm border border-white/5'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 px-6 bg-[#05050A]/80 backdrop-blur-xl border-t border-white/5 relative z-10">
                    <form onSubmit={handleSend} className="relative flex items-center bg-[#191425] border border-white/10 rounded-xl focus-within:border-[#602ee6]/50 focus-within:ring-1 focus-within:ring-[#602ee6]/30 transition-all shadow-inner">
                        <button type="button" className="p-3 text-gray-400 hover:text-[#00F0FF] transition-colors"><Plus className="w-5 h-5" /></button>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Message #general..."
                            className="flex-1 bg-transparent py-3 text-sm text-white focus:outline-none placeholder-gray-500"
                        />
                        <div className="flex items-center pr-2 gap-1">
                            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors"><Smile className="w-5 h-5" /></button>
                            <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors"><Paperclip className="w-5 h-5" /></button>
                            <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="p-2 text-[#602ee6] hover:text-[#8A2BE2] disabled:text-gray-600 transition-colors"
                            >
                                <SendHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
          </div>
          {/* GlobalFooter sits inside the outer root div, below the flex chat row */}
          <GlobalFooter />
        </div>
    );
}
