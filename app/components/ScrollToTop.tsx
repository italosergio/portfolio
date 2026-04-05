import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed bottom-4 right-4 z-[9997] w-10 h-10 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm border border-white/10 rounded-full text-[#94A3B8] hover:text-[#10B981] hover:border-[#10B981] transition-colors"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
