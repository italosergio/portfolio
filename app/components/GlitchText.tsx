import { type ReactNode, useEffect, useState, useRef } from "react";

export default function GlitchText({ children, className, hoverText }: { children: string; className?: string; hoverText?: ReactNode }) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const [tapped, setTapped] = useState(false);
  const tapTimer = useRef<ReturnType<typeof setTimeout>>();
  const didTap = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const trigger = () => {
      setActive(true);
      setTimeout(() => setActive(false), 200);
      timeout = setTimeout(trigger, [1000, 2000, 3000][Math.floor(Math.random() * 3)]);
    };
    timeout = setTimeout(trigger, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Desktop hover flicker
  useEffect(() => {
    if (!hovered || !hoverText) { setShowAlt(false); return; }
    let timeout: ReturnType<typeof setTimeout>;
    const flicker = () => {
      setShowAlt(true);
      setTimeout(() => setShowAlt(false), 150 + Math.random() * 150);
      timeout = setTimeout(flicker, 800 + Math.random() * 2000);
    };
    timeout = setTimeout(flicker, 300);
    return () => { clearTimeout(timeout); setShowAlt(false); };
  }, [hovered, hoverText]);

  // Mobile tap flicker for 3s — same timing as hover
  useEffect(() => {
    if (!tapped || !hoverText) return;
    let timeout: ReturnType<typeof setTimeout>;
    const flicker = () => {
      setShowAlt(true);
      setTimeout(() => setShowAlt(false), 150 + Math.random() * 150);
      timeout = setTimeout(flicker, 800 + Math.random() * 2000);
    };
    flicker();
    tapTimer.current = setTimeout(() => { setTapped(false); setShowAlt(false); }, 3000);
    return () => { clearTimeout(timeout); clearTimeout(tapTimer.current); setShowAlt(false); };
  }, [tapped, hoverText]);

  const handleTap = hoverText ? () => {
    didTap.current = true;
    setTapped(true);
  } : undefined;

  const handleClick = hoverText ? (e: React.MouseEvent) => {
    if (didTap.current) {
      didTap.current = false;
    }
  } : undefined;

  const display = showAlt && hoverText ? hoverText : children;

  return (
    <span
      className={`relative inline-block ${className || ""}`}
      onMouseEnter={hoverText ? () => { if (!("ontouchstart" in window)) setHovered(true); } : undefined}
      onMouseLeave={hoverText ? () => setHovered(false) : undefined}
      onTouchStart={handleTap}
      onClick={handleClick}
    >
      <span className={showAlt ? "invisible" : ""}>{children}</span>
      {showAlt && <span className="absolute inset-0 flex items-center justify-center">{hoverText}</span>}
      {active && (
        <>
          <span
            className="absolute inset-0 text-[#10B981]"
            style={{ animation: "glitchColor1 200ms steps(2) forwards" }}
            aria-hidden="true"
          >{showAlt ? "" : children}</span>
          <span
            className="absolute inset-0 text-[#06B6D4]"
            style={{ animation: "glitchColor2 200ms steps(2) forwards" }}
            aria-hidden="true"
          >{showAlt ? "" : children}</span>
        </>
      )}
    </span>
  );
}
