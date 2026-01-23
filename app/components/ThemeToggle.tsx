import { useTheme } from "~/lib/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 px-2 py-1 bg-transparent hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] rounded-full transition-colors theme-toggle-btn"
      aria-label="Toggle theme"
    >
      <span className={`text-[10px] font-medium transition-colors ${theme === "front" ? "text-[#0B5D1E] dark:text-[#10B981]" : "text-[#9CA3AF]"}`}>
        Frontend
      </span>
      <div className="relative w-7 h-3.5 bg-[#E5E7EB] dark:bg-[#374151] rounded-full">
        <div
          className={`absolute top-0.5 w-2.5 h-2.5 bg-gradient-to-r from-[#0891B2] to-[#10B981] rounded-full transition-all ${
            theme === "front" ? "left-0.5" : "left-4"
          }`}
        />
      </div>
      <span className={`text-[10px] font-medium transition-colors ${theme === "back" ? "text-[#0B5D1E] dark:text-[#10B981]" : "text-[#9CA3AF]"}`}>
        Backend
      </span>
    </button>
  );
}
