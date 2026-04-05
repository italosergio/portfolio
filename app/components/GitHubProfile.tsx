import { MapPin, Building2, FolderGit2, Users, GitCommitHorizontal, GitPullRequest, Eye } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";

export default function GitHubProfile() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 px-4 bg-[#F9FAFB] dark:bg-[#1E293B] overflow-hidden">
      {/* Pixel grid background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(11, 93, 30, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(11, 93, 30, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "8px 8px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Terminal-style card */}
        <div className="border-2 border-[#0B5D1E]/30 dark:border-[#10B981]/30 bg-white dark:bg-[#0F172A] shadow-xl"
          style={{ imageRendering: "pixelated" }}>
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1F2937] dark:bg-[#020617] border-b-2 border-[#0B5D1E]/30 dark:border-[#10B981]/30">
            <span className="w-3 h-3 bg-[#EF4444]" />
            <span className="w-3 h-3 bg-[#F59E0B]" />
            <span className="w-3 h-3 bg-[#10B981]" />
            <span className="ml-2 text-xs font-mono text-[#94A3B8]">github://italosergio</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch">
            {/* Photo with pixel border */}
            <div className="shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-[#0B5D1E]/30 dark:border-[#10B981]/30 overflow-hidden">
              <img
                src="/github-profile.png"
                alt="Ítalo Sérgio - GitHub Profile"
                className="w-full sm:w-[480px] h-auto sm:h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left font-mono p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-[#1F2937] dark:text-white mb-1">
                Ítalo Sérgio
              </h3>
              <p className="text-sm text-[#10B981] mb-3">
                @italosergio
              </p>
              <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] mb-4">
                {t.github.bio}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-5 text-sm text-[#6B7280] dark:text-[#94A3B8] mb-6">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Recife, PE</span>
                <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> Ameciclo</span>
                <span className="flex items-center gap-1"><FolderGit2 className="w-4 h-4" /> 22 repos</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 42 followers</span>
                <span className="flex items-center gap-1"><GitCommitHorizontal className="w-4 h-4" /> 1.8k+ commits</span>
                <span className="flex items-center gap-1"><GitPullRequest className="w-4 h-4" /> 87 PRs</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 12 reviews</span>
              </div>

              {/* Pixel art button */}
              <a
                href="https://github.com/italosergio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-black text-white text-sm font-mono font-bold
                  border-b-4 border-r-4 border-[#333]
                  hover:border-b-2 hover:border-r-2 hover:translate-x-[2px] hover:translate-y-[2px]
                  active:border-b-0 active:border-r-0 active:translate-x-1 active:translate-y-1
                  transition-all duration-75 cursor-pointer"
                style={{ imageRendering: "pixelated" }}
              >
                {">"} {t.github.viewProfile}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
