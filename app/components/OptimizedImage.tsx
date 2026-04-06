import { useState, useRef, useEffect } from "react";
import { useNetworkStatus, type NetworkQuality } from "~/lib/useNetworkStatus";

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Hide completely on low network instead of showing placeholder */
  hideOnSlow?: boolean;
}

function Placeholder({ className, quality }: { className?: string; quality: NetworkQuality }) {
  return (
    <div className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
      <div className="text-center p-4">
        <svg className="w-8 h-8 mx-auto mb-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {quality === "low" ? "Imagem oculta (rede lenta)" : "Carregando..."}
        </p>
      </div>
    </div>
  );
}

export default function OptimizedImage({ src, alt, className = "", priority = false, hideOnSlow = false }: Props) {
  const { quality } = useNetworkStatus();
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || inView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [priority, inView]);

  // Low network: show placeholder or hide
  if (quality === "low" && !priority) {
    if (hideOnSlow) return null;
    return <Placeholder className={className} quality={quality} />;
  }

  // Not in view yet: placeholder
  if (!inView) {
    return <div ref={ref}><Placeholder className={className} quality={quality} /></div>;
  }

  return (
    <div ref={ref} className="relative">
      {!loaded && <Placeholder className={`absolute inset-0 ${className}`} quality={quality} />}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
