import { ref, push } from "firebase/database";
import { rtdb } from "./firebase";

export function trackPageView(path: string) {
  if (devMode) return;
  const conn = (navigator as any).connection;
  push(ref(rtdb, "pageviews"), {
    path,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || null,
    language: navigator.language,
    screen: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio,
    platform: navigator.platform,
    mobile: /Mobi|Android/i.test(navigator.userAgent),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    online: navigator.onLine,
    cores: navigator.hardwareConcurrency || null,
    memory: (navigator as any).deviceMemory || null,
    connection: conn ? { type: conn.effectiveType, downlink: conn.downlink } : null,
    touchPoints: navigator.maxTouchPoints,
    colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  });
}

export function trackEvent(category: string, action: string, label?: string) {
  if (devMode) return;
  push(ref(rtdb, "events"), {
    category,
    action,
    label: label || null,
    timestamp: Date.now(),
    path: window.location.pathname,
    clickX: Math.round((lastClickPos.x / window.innerWidth) * 100),
    clickY: Math.round((lastClickPos.y / window.innerHeight) * 100),
    scrollY: Math.round((window.scrollY / document.documentElement.scrollHeight) * 100),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen: `${screen.width}x${screen.height}`,
    mobile: /Mobi|Android/i.test(navigator.userAgent),
    language: navigator.language,
    userAgent: navigator.userAgent,
  });
}

const lastClickPos = { x: 0, y: 0 };

let devMode = false;
export function isDevMode() { return devMode; }
export function setDevMode(v: boolean) { devMode = v; }

export function initClickTracking() {
  document.addEventListener("mousedown", (e) => { lastClickPos.x = e.clientX; lastClickPos.y = e.clientY; });
  document.addEventListener("touchstart", (e) => { if (e.touches[0]) { lastClickPos.x = e.touches[0].clientX; lastClickPos.y = e.touches[0].clientY; } }, { passive: true });

  let lastEvent = "";
  let lastTime = 0;

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-analytics-panel]")) return;
    const link = target.closest("a");
    const button = target.closest("button");

    const now = Date.now();
    let key = "";

    if (link) {
      const href = link.getAttribute("href") || "";
      const label = link.getAttribute("aria-label") || link.textContent?.trim().slice(0, 50) || href;
      key = `link:${href}`;

      if (key === lastEvent && now - lastTime < 1000) return;
      lastEvent = key;
      lastTime = now;

      if (href.startsWith("#")) {
        trackEvent("navigation", "anchor", label);
      } else if (href.startsWith("mailto:")) {
        trackEvent("contact", "email", label);
      } else if (href.includes("wa.me")) {
        trackEvent("contact", "whatsapp", label);
      } else if (href.startsWith("http")) {
        trackEvent("outbound", "click", label);
      }
    } else if (button) {
      const label = button.getAttribute("aria-label") || button.textContent?.trim().slice(0, 50) || "unknown";
      key = `btn:${label}`;

      if (key === lastEvent && now - lastTime < 1000) return;
      lastEvent = key;
      lastTime = now;

      trackEvent("button", "click", label);
    }
  });
}
