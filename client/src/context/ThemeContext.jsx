import { createContext, useContext, useState, useEffect } from "react";

// Theme definitions — each theme provides CSS custom property values.
// We apply these to :root dynamically, so any component can read them
// without needing separate Tailwind class sets per theme.
export const themes = {
  "deep-space": {
    label: "Deep Space",
    emoji: "🌌",
    // Background layers
    "--bg-primary":    "#05050A",
    "--bg-secondary":  "#120d1d",
    "--bg-card":       "#120d1d",
    "--bg-input":      "#191425",
    // Text
    "--text-primary":  "#ffffff",
    "--text-secondary":"#9ca3af",
    "--text-muted":    "#4b5563",
    // Accent colors
    "--accent-1":      "#8A2BE2",    // violet
    "--accent-2":      "#00F0FF",    // cyan
    "--accent-gradient":"linear-gradient(135deg, #8A2BE2, #00F0FF)",
    // Borders
    "--border-color":  "rgba(255,255,255,0.05)",
    "--border-hover":  "rgba(255,255,255,0.1)",
  },
  "cyber-neon": {
    label: "Cyber Neon",
    emoji: "⚡",
    "--bg-primary":    "#0a0a0f",
    "--bg-secondary":  "#0d1117",
    "--bg-card":       "#111827",
    "--bg-input":      "#0d1117",
    "--text-primary":  "#f0fdf4",
    "--text-secondary":"#86efac",
    "--text-muted":    "#4ade80",
    "--accent-1":      "#f0abfc",    // pink
    "--accent-2":      "#4ade80",    // neon green
    "--accent-gradient":"linear-gradient(135deg, #f0abfc, #4ade80)",
    "--border-color":  "rgba(74,222,128,0.1)",
    "--border-hover":  "rgba(240,171,252,0.2)",
  },
  "minimal-light": {
    label: "Minimal Light",
    emoji: "☀️",
    "--bg-primary":    "#f8fafc",
    "--bg-secondary":  "#ffffff",
    "--bg-card":       "#ffffff",
    "--bg-input":      "#f1f5f9",
    "--text-primary":  "#0f172a",
    "--text-secondary":"#475569",
    "--text-muted":    "#94a3b8",
    "--accent-1":      "#6d28d9",    // purple
    "--accent-2":      "#0891b2",    // teal
    "--accent-gradient":"linear-gradient(135deg, #6d28d9, #0891b2)",
    "--border-color":  "rgba(0,0,0,0.08)",
    "--border-hover":  "rgba(0,0,0,0.15)",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Persist theme preference across page reloads
  const [theme, setTheme] = useState(
    () => localStorage.getItem("dc-theme") || "deep-space"
  );

  // Whenever theme changes, inject CSS variables into :root
  // This means components can use var(--accent-1) directly in Tailwind arbitrary values
  useEffect(() => {
    const vars = themes[theme];
    const root = document.documentElement;

    Object.entries(vars).forEach(([key, value]) => {
      // Only apply CSS variable entries (they start with "--")
      if (key.startsWith("--")) {
        root.style.setProperty(key, value);
      }
    });

    // data-theme attribute lets you target themes in CSS if needed
    root.setAttribute("data-theme", theme);
    localStorage.setItem("dc-theme", theme);
  }, [theme]);

  // Cycle through themes in order — useful for a single toggle button
  const cycleTheme = () => {
    const keys = Object.keys(themes);
    const currentIndex = keys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % keys.length;
    setTheme(keys[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook — avoids importing useContext + ThemeContext everywhere
export const useTheme = () => useContext(ThemeContext);
