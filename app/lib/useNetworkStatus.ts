import { useState, useEffect } from "react";

export type NetworkQuality = "high" | "medium" | "low";

interface NetworkInfo {
  quality: NetworkQuality;
  saveData: boolean;
  effectiveType: string;
  downlink: number;
}

function getNetworkInfo(): NetworkInfo {
  const conn = (navigator as any).connection;
  if (!conn) return { quality: "high", saveData: false, effectiveType: "4g", downlink: 10 };

  const saveData = conn.saveData === true;
  const effectiveType: string = conn.effectiveType || "4g";
  const downlink: number = conn.downlink ?? 10;

  let quality: NetworkQuality = "high";
  if (saveData || effectiveType === "slow-2g" || effectiveType === "2g") {
    quality = "low";
  } else if (effectiveType === "3g" || downlink < 1.5) {
    quality = "medium";
  }

  return { quality, saveData, effectiveType, downlink };
}

export function useNetworkStatus(): NetworkInfo {
  const [info, setInfo] = useState<NetworkInfo>(getNetworkInfo);

  useEffect(() => {
    const conn = (navigator as any).connection;
    if (!conn) return;
    const update = () => setInfo(getNetworkInfo());
    conn.addEventListener("change", update);
    return () => conn.removeEventListener("change", update);
  }, []);

  return info;
}
