import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Users, User, Mail, Code, Lock, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", github: "", password: "" });
  const [activeRole, setActiveRole] = useState("Full-Stack");

  const roles = ["Full-Stack", "Frontend", "Backend", "UI/UX"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;
    localStorage.setItem("user", JSON.stringify({ email: formData.email, name: formData.name, role: activeRole }));
    navigate("/dashboard");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-300 font-sans flex flex-col items-center justify-center relative overflow-hidden px-6 lg:px-12 py-10">

      {/* Ambient Background Glow (Very slow infinite pulse) */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none -z-10"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#00F0FF]/15 to-[#8A2BE2]/15 rounded-full blur-[160px]" />
      </motion.div>

      {/* Main Entrance Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.8 }}
        className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-16 z-10"
      >

        {/* Left Side Content */}
        <div className="flex-1 flex flex-col justify-center max-w-[500px]">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-[#602ee6] rounded-full p-2 flex items-center justify-center">
              <Code className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-xl tracking-wide">DevCollab</span>
          </div>

          <h1 className="text-[44px] md:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-4">
            Enter the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF]">
              Deep Abyss.
            </span>
          </h1>

          <p className="text-[17px] text-gray-400 leading-relaxed mb-10 max-w-[420px]">
            Join the ultimate workspace for elite developers. Connect, build, and ship faster in an environment designed for deep focus.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            {/* Feature Cards */}
            <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] transition-colors">
              <Rocket className="w-6 h-6 text-[#00F0FF] mb-3" />
              <h3 className="text-white font-semibold mb-1">Ship Faster</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">Integrated tools to accelerate your workflow.</p>
            </div>
            <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] transition-colors">
              <Users className="w-6 h-6 text-[#8A2BE2] mb-3" />
              <h3 className="text-white font-semibold mb-1">Collaborate</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">Real-time sync with your entire engineering team.</p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full max-w-[440px] flex justify-center relative">
          <div className="w-full bg-[#120d1d]/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative">
            <div className="mb-8 text-left">
              <h2 className="text-[28px] font-bold text-white mb-2 tracking-tight">Create Workspace</h2>
              <p className="text-[13px] text-gray-400">Join the premium developer community today.</p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1.5">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-[18px] h-[18px] text-gray-500 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Alex Developer"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-[#191425] border border-white/5 rounded-xl text-[14px] text-white focus:outline-none focus:border-[#602ee6] transition-colors placeholder-gray-500 shadow-inner"
                  />
                </div>
              </motion.div>

              {/* Email Address */}
              <motion.div variants={itemVariants}>
                <label className="block text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1.5">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-[18px] h-[18px] text-gray-500 absolute left-4 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-[#191425] border border-white/5 rounded-xl text-[14px] text-white focus:outline-none focus:border-[#602ee6] transition-colors placeholder-gray-500 shadow-inner"
                  />
                </div>
              </motion.div>

              {/* GitHub Username */}
              <motion.div variants={itemVariants}>
                <label className="block text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1.5">
                  GitHub Username
                </label>
                <div className="relative flex items-center">
                  <Code className="w-[18px] h-[18px] text-gray-500 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    name="github"
                    placeholder="alexdev"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-[#191425] border border-white/5 rounded-xl text-[14px] text-white focus:outline-none focus:border-[#602ee6] transition-colors placeholder-gray-500 shadow-inner"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label className="block text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-[18px] h-[18px] text-gray-500 absolute left-4 pointer-events-none" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-11 py-3 bg-[#191425] border border-white/5 rounded-xl text-[14px] text-white focus:outline-none focus:border-[#602ee6] transition-colors placeholder-gray-500 tracking-widest shadow-inner"
                  />
                  <button type="button" className="absolute right-4 text-gray-500 hover:text-gray-300 transition-colors">
                    <EyeOff className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </motion.div>

              {/* Primary Role Selector */}
              <motion.div variants={itemVariants} className="pt-1">
                <label className="block text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-2">
                  Primary Role
                </label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setActiveRole(role)}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ease-out border ${activeRole === role
                          ? "bg-[#602ee6] text-white border-transparent shadow-[0_0_15px_rgba(96,46,230,0.4)]"
                          : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-gray-200"
                        }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Initialize Workspace Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#602ee6] hover:bg-[#5025d1] text-white text-[14px] font-semibold transition-colors flex items-center justify-center shadow-[0_4px_14px_0_rgba(96,46,230,0.39)] hover:shadow-[0_6px_20px_rgba(96,46,230,0.23)] hover:-translate-y-[1px] transform duration-200"
                >
                  Initialize Workspace
                </button>
              </motion.div>
            </motion.form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="mx-4 text-[10px] font-bold tracking-widest text-gray-600 uppercase">Or continue with</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <div className="flex gap-3 mb-8">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#191425] border border-white/5 hover:bg-white/10 transition-colors text-[13px] font-medium">
                <svg className="w-[18px] h-[18px] text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#191425] border border-white/5 hover:bg-white/10 transition-colors text-[13px] font-medium">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>

            <p className="text-center text-gray-400 text-[13px]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8b5cf6] font-semibold hover:text-[#9b4cf6] hover:underline transition-colors">
                Log in here
              </Link>
            </p>
          </div>

          {/* Footer constraints notice */}
          <div className="absolute -bottom-12 left-0 w-full text-center pb-4">
            <p className="text-[11px] text-gray-600 font-medium">
              By signing up, you agree to our <a href="#" className="hover:text-gray-400 underline decoration-gray-600 underline-offset-2">Terms of Service</a> and <a href="#" className="hover:text-gray-400 underline decoration-gray-600 underline-offset-2">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}