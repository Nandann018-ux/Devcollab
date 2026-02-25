import { useState } from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "Complete backend refactor for the main e-commerce platform.",
      tags: [
        { name: "React", bg: "bg-blue-500/10", text: "text-blue-400" },
        { name: "Go", bg: "bg-teal-500/10", text: "text-teal-400" },
        { name: "Supabase", bg: "bg-emerald-500/10", text: "text-emerald-400" },
      ],
      updatedAt: "Updated 2h ago",
      gradient: "from-[#1a2a3a] to-[#0d131a]",
    },
    {
      id: 2,
      title: "Project Beta",
      description: "Internal analytics dashboard for tracking user engagement metrics.",
      tags: [
        { name: "Svelte", bg: "bg-orange-500/10", text: "text-orange-400" },
        { name: "Python", bg: "bg-yellow-500/10", text: "text-yellow-400" },
      ],
      updatedAt: "Updated 1d ago",
      gradient: "from-[#162b2b] to-[#0b1414]",
    },
    {
      id: 3,
      title: "Mobile API",
      description: "RESTful API development for the new iOS application.",
      tags: [
        { name: "Node.js", bg: "bg-purple-500/10", text: "text-purple-400" },
        { name: "GraphQL", bg: "bg-pink-500/10", text: "text-pink-400" },
        { name: "Docker", bg: "bg-blue-600/10", text: "text-blue-400" },
      ],
      updatedAt: "Updated 3d ago",
      gradient: "from-[#2d1b36] to-[#140c1a]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0714] text-gray-300 font-sans flex flex-col">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0b0714]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="bg-[#602ee6] rounded-full p-1.5 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-wide">DevCollab</span>
          </div>

          <div className="hidden md:flex relative items-center">
            <svg className="w-4 h-4 text-gray-500 absolute left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-9 pr-4 py-2 bg-[#191425] border border-white/5 rounded-full text-sm text-white focus:outline-none focus:border-[#602ee6] focus:ring-1 focus:ring-[#602ee6] transition-all w-64"
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <div className="relative text-white pb-1 border-b-2 border-[#8b5cf6]">
            Dashboard
          </div>
          <a href="#" className="text-gray-400 hover:text-white transition pb-1 border-b-2 border-transparent">Teams</a>
          <a href="#" className="text-gray-400 hover:text-white transition pb-1 border-b-2 border-transparent">Settings</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0.5 w-2.5 h-2.5 bg-[#8b5cf6] border-2 border-[#0b0714] rounded-full"></span>
          </button>
          
          <button className="hidden sm:flex items-center gap-2 bg-[#602ee6] hover:bg-[#5a28e5] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#602ee6] to-pink-500 p-[2px] cursor-pointer" title={user?.email || "Guest"}>
            <div className="w-full h-full rounded-full border-2 border-[#0b0714] bg-[#1c1425] flex items-center justify-center overflow-hidden text-white font-bold text-sm">
               {userInitial}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Your Projects</h1>
            <p className="text-sm text-gray-400">Manage and collaborate on your active repositories.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#191425] rounded-lg p-1 border border-white/5">
              <button className="p-1.5 bg-[#2a223e] rounded shadow-sm text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                </svg>
              </button>
              <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                </svg>
              </button>
            </div>
            
            <button className="flex items-center gap-2 bg-[#191425] hover:bg-white/5 border border-white/5 px-4 py-2 rounded-lg text-sm text-gray-300 transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Sort by: Recent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#120d1d] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:shadow-2xl hover:shadow-[#602ee6]/10 transition-all group flex flex-col">
              <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                <div className="w-3/4 h-2/3 border border-white/10 rounded-lg bg-black/20 flex flex-col px-3 py-2 gap-2">
                   <div className="w-1/3 h-2 bg-white/10 rounded-full"></div>
                   <div className="w-1/2 h-2 bg-white/10 rounded-full"></div>
                   <div className="w-full h-full border border-white/5 rounded mt-1 bg-white/5"></div>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md rounded-lg p-1 cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.map((tag, index) => (
                    <span key={index} className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${tag.bg} ${tag.text}`}>
                      {tag.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#120d1d] flex items-center justify-center text-[10px] text-white font-bold z-10">JS</div>
                    <div className="w-7 h-7 rounded-full bg-pink-500 border-2 border-[#120d1d] flex items-center justify-center text-[10px] text-white font-bold -ml-2 z-20">AL</div>
                    <div className="w-7 h-7 rounded-full bg-[#2a223e] border-2 border-[#120d1d] flex items-center justify-center text-[10px] text-gray-300 font-bold -ml-2 z-30">+3</div>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">{project.updatedAt}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-transparent border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 min-h-[300px] hover:border-[#602ee6]/50 hover:bg-[#602ee6]/5 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-[#1c142b] border border-[#602ee6]/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#602ee6] transition-all duration-300">
              <svg className="w-5 h-5 text-[#8b5cf6] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Create New Project</h3>
            <p className="text-sm text-gray-500 text-center max-w-[200px]">
              Start a new repository or import an existing project.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}