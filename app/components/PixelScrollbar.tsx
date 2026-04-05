import { useEffect, useRef, useState } from "react";

export default function PixelScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);
  const prevTop = useRef(0);
  const thumbH = useRef(0);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const trails = useRef<{ el: HTMLDivElement; timer: number }[]>([]);

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
      const mobile = window.innerWidth < 640;
      const trackLen = mobile ? window.innerWidth : clientHeight;
      const ratio = clientHeight / scrollHeight;
      const size = Math.max(ratio * trackLen, 40);
      const pos = (scrollTop / (scrollHeight - clientHeight)) * (trackLen - size);
      thumbH.current = size;

      const thumb = thumbRef.current;
      if (thumb) {
        if (mobile) {
          thumb.style.left = `${pos}px`;
          thumb.style.width = `${size}px`;
        } else {
          thumb.style.top = `${pos}px`;
          thumb.style.height = `${size}px`;
        }
      }

      // Trail
      const prev = prevTop.current;
      const diff = pos - prev;
      if (Math.abs(diff) > 3 && trackRef.current) {
        const t = document.createElement("div");
        t.style.position = "absolute";
        t.style.background = "#10B981";
        t.style.pointerEvents = "none";
        t.style.opacity = "0.4";
        if (mobile) {
          t.style.top = "0";
          t.style.height = "6px";
          t.style.left = `${prev}px`;
          t.style.width = "12px";
        } else {
          t.style.right = "0";
          t.style.width = "10px";
          t.style.top = `${prev}px`;
          t.style.height = "16px";
        }
        trackRef.current.appendChild(t);
        const timer = window.setTimeout(() => {
          t.remove();
        }, 200);
        trails.current.push({ el: t, timer });
      }
      prevTop.current = pos;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      trails.current.forEach(t => { clearTimeout(t.timer); t.el.remove(); });
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const { scrollHeight, clientHeight } = document.documentElement;
      const mobile = window.innerWidth < 640;
      const delta = mobile ? e.clientX - startY.current : e.clientY - startY.current;
      const trackLen = mobile ? window.innerWidth : clientHeight;
      const scrollRange = scrollHeight - clientHeight;
      const trackRange = trackLen - thumbH.current;
      window.scrollTo(0, startScroll.current + (delta / trackRange) * scrollRange);
    };
    const onUp = () => { dragging.current = false; document.body.style.userSelect = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startY.current = isMobile ? e.clientX : e.clientY;
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
        <div
          ref={thumbRef}
          onMouseDown={onMouseDown}
          className="absolute top-0 h-[6px] cursor-grab active:cursor-grabbing"
          style={{ background: "#10B981" }}
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
      <div
        ref={thumbRef}
        onMouseDown={onMouseDown}
        className="absolute right-0 w-[10px] cursor-grab active:cursor-grabbing"
        style={{ background: "#10B981" }}
      />
    </div>
  );
}
