import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="px-6 py-3 bg-[#0B5D1E] dark:bg-[#10B981] text-white rounded-sm shadow-2xl">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
