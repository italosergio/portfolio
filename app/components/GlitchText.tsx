import { useEffect, useState } from "react";

export default function GlitchText({ children, className }: { children: string; className?: string }) {
  const [active, setActive] = useState(false);

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

  return (
    <span className={`relative inline-block ${className || ""}`}>
      {children}
      {active && (
        <>
          <span
            className="absolute inset-0 text-[#10B981]"
            style={{ animation: "glitchColor1 200ms steps(2) forwards" }}
            aria-hidden="true"
          >{children}</span>
          <span
            className="absolute inset-0 text-[#06B6D4]"
            style={{ animation: "glitchColor2 200ms steps(2) forwards" }}
            aria-hidden="true"
          >{children}</span>
        </>
      )}
    </span>
  );
}
