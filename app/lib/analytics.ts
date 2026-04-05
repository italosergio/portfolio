import { ref, push } from "firebase/database";
import { rtdb } from "./firebase";

export function trackPageView(path: string) {
  push(ref(rtdb, "pageviews"), {
    path,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || null,
    language: navigator.language,
    screen: `${screen.width}x${screen.height}`,
  });
}

export function trackEvent(category: string, action: string, label?: string) {
  push(ref(rtdb, "events"), {
    category,
    action,
    label: label || null,
    timestamp: Date.now(),
    path: window.location.pathname,
  });
}

export function initClickTracking() {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a");
    const button = target.closest("button");

    if (link) {
      const href = link.getAttribute("href") || "";
      const label = link.getAttribute("aria-label") || link.textContent?.trim().slice(0, 50) || href;

      if (href.startsWith("#")) {
        trackEvent("navigation", "anchor", label);
      } else if (href.startsWith("http")) {
        trackEvent("outbound", "click", label);
      } else if (href.startsWith("mailto:")) {
        trackEvent("contact", "email", label);
      } else if (href.startsWith("https://wa.me")) {
        trackEvent("contact", "whatsapp", label);
      }
    } else if (button) {
      const label = button.getAttribute("aria-label") || button.textContent?.trim().slice(0, 50) || "unknown";
      trackEvent("button", "click", label);
    }
  });
}
