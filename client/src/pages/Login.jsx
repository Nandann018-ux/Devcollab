import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    localStorage.setItem("user", JSON.stringify({ email: formData.email }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0b0714] text-gray-300 font-sans flex flex-col relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>
      <header className="w-full px-8 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#602ee6] rounded-full p-1.5 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-wide">DevCollab</span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
          <a href="#" className="hover:text-white transition">Product</a>
          <a href="#" className="hover:text-white transition">Enterprise</a>
          <a href="#" className="hover:text-white transition">Docs</a>
        </nav>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>New to DevCollab?</span>
          <button className="text-white border border-white/10 hover:bg-white/5 px-5 py-2 rounded-full transition font-medium">
            Sign Up
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 pb-10">
        <div className="w-full max-w-[420px] bg-[#120d1d] border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl mb-8">

          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#1c1433] flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[#8b5cf6]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 1.5a5 5 0 0 0-5 5v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3a5 5 0 0 0-5-5Zm-3.5 5a3.5 3.5 0 1 1 7 0v3h-7v-3Zm3.5 8.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-[26px] font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-gray-400">Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 tracking-widest uppercase mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <svg className="w-5 h-5 text-gray-500 absolute left-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#191425] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#602ee6] focus:ring-1 focus:ring-[#602ee6] transition-all placeholder-gray-600"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">
                  Password
                </label>
                <a href="#" className="text-[11px] text-[#8b5cf6] hover:text-purple-400 transition">
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <svg className="w-5 h-5 text-gray-500 absolute left-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#191425] border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-[#602ee6] focus:ring-1 focus:ring-[#602ee6] transition-all placeholder-gray-600 tracking-widest"
                />
                <button type="button" className="absolute right-4 text-gray-500 hover:text-gray-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-full bg-[#6a35ff] hover:bg-[#5a28e5] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              Sign In 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="mx-4 text-[10px] font-bold tracking-widest text-gray-600 uppercase">Or continue with</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="flex gap-4 mb-8">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#191425] border border-white/5 hover:bg-white/5 transition text-sm font-medium">
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#191425] border border-white/5 hover:bg-white/5 transition text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <span className="text-white font-semibold hover:underline cursor-pointer">
              Create account
            </span>
          </p>
        </div>

        <footer className="w-full flex justify-center gap-6 text-[12px] text-gray-500 font-medium">
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-300 transition">Help Center</a>
        </footer>
      </main>
    </div>
  );
}