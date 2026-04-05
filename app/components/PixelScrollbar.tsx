import { useEffect, useRef, useState } from "react";

export default function PixelScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startPos = useRef(0);
  const startScroll = useRef(0);
  const prevPos = useRef(0);
  const [thumbPos, setThumbPos] = useState(0);
  const [thumbSize, setThumbSize] = useState(0);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight <= clientHeight) { setVisible(false); return; }
      setVisible(true);
      const trackLength = isMobile ? window.innerWidth : clientHeight;
      const ratio = clientHeight / scrollHeight;
      const size = Math.max(ratio * trackLength, 40);
      const pos = (scrollTop / (scrollHeight - clientHeight)) * (trackLength - size);
      setThumbSize(size);
      setThumbPos(pos);

      const prev = prevPos.current;
      const diff = pos - prev;
      if (diff > 3) {
        setTrail(t => [...t, prev].slice(-3));
      } else if (diff < -3) {
        setTrail(t => [...t, prev].slice(-1));
      }
      prevPos.current = pos;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [isMobile]);

  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => setTrail(t => t.slice(1)), 150);
    return () => clearTimeout(timer);
  }, [trail]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const { scrollHeight, clientHeight } = document.documentElement;
      const delta = isMobile ? e.clientX - startPos.current : e.clientY - startPos.current;
      const trackLength = isMobile ? window.innerWidth : clientHeight;
      const scrollRange = scrollHeight - clientHeight;
      const trackRange = trackLength - thumbSize;
      window.scrollTo(0, startScroll.current + (delta / trackRange) * scrollRange);
    };
    const onUp = () => { dragging.current = false; document.body.style.userSelect = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [thumbSize, isMobile]);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startPos.current = isMobile ? e.clientX : e.clientY;
    startScroll.current = document.documentElement.scrollTop;
    document.body.style.userSelect = "none";
  };

  const onTrackClick = (e: React.MouseEvent) => {
    if (e.target === thumbRef.current) return;
    const { scrollHeight, clientHeight } = document.documentElement;
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = isMobile
      ? (e.clientX - rect.left) / rect.width
      : (e.clientY - rect.top) / rect.height;
    window.scrollTo({ top: ratio * (scrollHeight - clientHeight), behavior: "smooth" });
  };

  if (!visible) return null;

  if (isMobile) {
    return (
      <div
        ref={trackRef}
        onClick={onTrackClick}
        className="fixed top-0 left-0 w-full h-[6px] z-[9999] cursor-pointer"
        style={{ background: "#0F172A" }}
      >
        {trail.map((pos, i) => (
          <div
            key={`${pos}-${i}`}
            className="absolute top-0 h-[6px] pointer-events-none"
            style={{ left: pos, width: 12, background: "#10B981", opacity: (i + 1) / trail.length * 0.5 }}
          />
        ))}
        <div
          ref={thumbRef}
          onMouseDown={onMouseDown}
          className="absolute top-0 h-[6px] cursor-grab active:cursor-grabbing"
          style={{ left: thumbPos, width: thumbSize, background: "#10B981" }}
        />
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      onClick={onTrackClick}
      className="fixed top-0 right-0 w-[10px] h-full z-[9999] cursor-pointer"
      style={{ background: "#0F172A" }}
    >
      {trail.map((pos, i) => (
        <div
          key={`${pos}-${i}`}
          className="absolute right-0 w-[10px] pointer-events-none"
          style={{ top: pos, height: 16, background: "#10B981", opacity: (i + 1) / trail.length * 0.5 }}
        />
      ))}
      <div
        ref={thumbRef}
        onMouseDown={onMouseDown}
        className="absolute right-0 w-[10px] cursor-grab active:cursor-grabbing"
        style={{ top: thumbPos, height: thumbSize, background: "#10B981" }}
      />
    </div>
  );
}
