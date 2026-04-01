import { useLanguage } from "~/lib/LanguageContext";
import { locales, type Locale } from "~/lib/i18n";

const labels: Record<Locale, string> = { pt: "PT", en: "EN", es: "ES" };

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md rounded-l-sm shadow-lg p-1.5" role="radiogroup" aria-label="Idioma">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          role="radio"
          aria-checked={locale === l}
          className={`px-2 py-1.5 rounded-sm text-xs font-bold transition-all ${
            locale === l
              ? "bg-[#0B5D1E] dark:bg-[#10B981] text-white"
              : "text-[#6B7280] dark:text-[#94A3B8] hover:bg-[#0B5D1E]/10 dark:hover:bg-[#10B981]/10 hover:text-[#0B5D1E] dark:hover:text-[#10B981]"
          }`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
