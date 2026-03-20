import { useAuth } from "../context/AuthContext";

// GlobalFooter — shown on all internal pages when no real user session exists.
// The intent is to clearly mark simulated/dummy data so reviewers understand
// the UI is populated with placeholder data, not live production data.
export default function GlobalFooter() {
  const { user } = useAuth();

  // If a real user is logged in, don't show the disclaimer
  if (user && user.token) return null;

  return (
    <div className="w-full px-6 py-3 flex items-center justify-center gap-3 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(138,43,226,0.06)] backdrop-blur-sm">
      <span className="text-[11px]" role="img" aria-label="info">
        ℹ️
      </span>
      <p className="text-[11px] text-gray-400 text-center leading-relaxed">
        <span className="font-semibold text-[#8A2BE2]">Simulated Environment</span>
        {" · "}
        Currently displaying demo data. Please{" "}
        <a
          href="/login"
          className="text-[#00F0FF] underline underline-offset-2 hover:text-white transition-colors"
        >
          log in
        </a>{" "}
        to access and manage your personal workspace.
      </p>
    </div>
  );
}
