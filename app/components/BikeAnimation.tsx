import { Bike } from "lucide-react";

export default function BikeAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bike"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: "4s",
          }}
        >
          <Bike className="w-12 h-12 text-[#10B981] drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>
      ))}
    </div>
  );
}
