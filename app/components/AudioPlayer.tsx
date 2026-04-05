import { useEffect, useRef, useState } from "react";
import { Music } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;

    const play = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };
    window.addEventListener("click", play);
    window.addEventListener("touchend", play);
    window.addEventListener("keydown", play);
    const cleanup = () => {
      window.removeEventListener("click", play);
      window.removeEventListener("touchend", play);
      window.removeEventListener("keydown", play);
    };
    audio.addEventListener("playing", cleanup, { once: true });
    return () => {
      cleanup();
      audio.removeEventListener("playing", cleanup);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Mutar áudio" : "Tocar áudio"}
        className={`fixed bottom-14 left-5 z-[9997] transition-colors ${
          playing
            ? "text-[#10B981] drop-shadow-[0_0_8px_#10B981]"
            : "text-[#94A3B8] hover:text-[#10B981]"
        }`}
      >
        <Music className={`w-4 h-4 ${playing ? "animate-pulse" : ""}`} />
      </button>
    </>
  );
}
