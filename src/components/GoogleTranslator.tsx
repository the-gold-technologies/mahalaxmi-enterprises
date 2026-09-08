"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function isHindiActive(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;

  // 1. Explicit user selection in localStorage takes absolute priority
  try {
    const saved = localStorage.getItem("mahalaxmi_language");
    if (saved === "HI") return true;
    if (saved === "EN") return false;
  } catch {}

  // 2. Cookie fallback for initial visits or external translations
  const c = document.cookie || "";
  if (c.indexOf("googtrans=/en/hi") !== -1 || c.indexOf("googtrans=%2Fen%2Fhi") !== -1) {
    return true;
  }

  return false;
}

export function useLanguage(): "EN" | "HI" {
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    const update = () => {
      setLang(isHindiActive() ? "HI" : "EN");
    };
    update();
    window.addEventListener("languagechange", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("languagechange", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return lang;
}

function waitForHindi(onDone: () => void, maxTimeoutMs = 600) {
  const start = Date.now();
  let done = false;

  const check = () => {
    if (done) return;

    // Use textContent for fast, non-blocking check unaffected by CSS opacity
    const bodyText = document.body ? document.body.textContent || "" : "";
    const hasDevanagari = /[\u0900-\u097F]/.test(bodyText);
    const hasFont = !!document.querySelector("font font");

    // Reveal as soon as Google Translate has begun inserting Hindi text nodes
    if ((hasDevanagari && hasFont) || Date.now() - start >= maxTimeoutMs) {
      done = true;
      onDone();
      return;
    }
    requestAnimationFrame(check);
  };

  requestAnimationFrame(check);
}

let switchTimer: any = null;

export function changeLanguage(lang: "EN" | "HI") {
  if (typeof window === "undefined") return;

  const domain = window.location.hostname;

  try {
    localStorage.setItem("mahalaxmi_language", lang);
  } catch {}

  window.dispatchEvent(new Event("languagechange"));

  // Cancel any pending switch timer from rapid consecutive clicks
  if (switchTimer) {
    clearTimeout(switchTimer);
    switchTimer = null;
  }

  if (lang === "EN") {
    // Reveal immediately for English
    document.documentElement.classList.remove("translating-hi");

    // Clear googtrans cookie across all possible domains and paths
    const host = window.location.hostname;
    const paths = ["/", window.location.pathname];
    const domains = ["", host, `.${host}`];
    if (host.includes(".")) {
      const rootDomain = host.split(".").slice(-2).join(".");
      domains.push(rootDomain, `.${rootDomain}`);
    }

    paths.forEach((p) => {
      domains.forEach((d) => {
        const domPart = d ? `; domain=${d}` : "";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}${domPart};`;
      });
    });

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      // Find original / empty option
      let originalIndex = 0;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === "" || select.options[i].value === "en") {
          originalIndex = i;
          break;
        }
      }
      select.selectedIndex = originalIndex;
      select.value = select.options[originalIndex]?.value || "";
      select.dispatchEvent(new Event("input", { bubbles: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Also trigger restore button in Google Translate frame if present
    try {
      const banner = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement | null;
      if (banner && banner.contentDocument) {
        const restoreBtn = banner.contentDocument.querySelector(".goog-te-button button, #\\:1\\.restore") as HTMLElement | null;
        if (restoreBtn) restoreBtn.click();
      }
    } catch {}
  } else {
    // Switching to Hindi
    document.documentElement.classList.add("translating-hi");

    const cookieVal = "/en/hi";
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain};`;
    if (domain.includes(".")) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domain};`;
    }

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      let hindiIndex = -1;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === "hi") {
          hindiIndex = i;
          break;
        }
      }

      if (hindiIndex !== -1) {
        // If already at hindiIndex, reset first so change event fires
        if (select.selectedIndex === hindiIndex) {
          select.selectedIndex = 0;
          select.value = select.options[0]?.value || "";
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }

        switchTimer = setTimeout(() => {
          if (select) {
            select.selectedIndex = hindiIndex;
            select.value = "hi";
            select.dispatchEvent(new Event("input", { bubbles: true }));
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
          switchTimer = null;
        }, 25);
      } else {
        select.value = "hi";
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }

      waitForHindi(() => {
        document.documentElement.classList.remove("translating-hi");
      }, 500);
    } else {
      window.location.reload();
    }
  }
}

export default function GoogleTranslator() {
  const pathname = usePathname();

  // Watch for route/tab changes to prevent English flashing when in Hindi mode
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isHindiActive()) {
      document.documentElement.classList.add("translating-hi");

      const trigger = () => {
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === "hi") {
              select.selectedIndex = i;
              select.value = "hi";
              select.dispatchEvent(new Event("change"));
              break;
            }
          }
        }
      };

      trigger();
      const t1 = setTimeout(trigger, 25);

      const timer = setTimeout(() => {
        waitForHindi(() => {
          document.documentElement.classList.remove("translating-hi");
        }, 400);
      }, 25);

      return () => {
        clearTimeout(t1);
        clearTimeout(timer);
      };
    } else {
      document.documentElement.classList.remove("translating-hi");
    }
  }, [pathname]);

  // Initial load observer for hard reload / initial mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    if (isHindiActive()) {
      document.documentElement.classList.add("translating-hi");

      waitForHindi(() => {
        document.documentElement.classList.remove("translating-hi");
      }, 500);
    } else {
      document.documentElement.classList.remove("translating-hi");
    }
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />;
}
