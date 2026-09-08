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
  if (typeof document === "undefined") return false;
  const c = document.cookie || "";
  if (c.indexOf("googtrans=/en/hi") !== -1 || c.indexOf("googtrans=%2Fen%2Fhi") !== -1) {
    return true;
  }
  try {
    return localStorage.getItem("mahalaxmi_language") === "HI";
  } catch {
    return false;
  }
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

export function changeLanguage(lang: "EN" | "HI") {
  if (typeof window === "undefined") return;

  const targetCode = lang === "HI" ? "hi" : "en";
  const domain = window.location.hostname;

  try {
    localStorage.setItem("mahalaxmi_language", lang);
  } catch {}

  window.dispatchEvent(new Event("languagechange"));

  if (lang === "EN") {
    // Reveal immediately for English
    document.documentElement.classList.remove("translating-hi");

    // Clear / set cookies to English
    document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    if (domain.includes(".")) {
      document.cookie = `googtrans=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
    document.cookie = "googtrans=/en/en; path=/;";
    document.cookie = `googtrans=/en/en; path=/; domain=${domain};`;

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = "en";
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  } else {
    // Add anti-flicker class during Hindi translation swap
    document.documentElement.classList.add("translating-hi");

    const cookieVal = "/en/hi";
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain};`;
    if (domain.includes(".")) {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domain};`;
    }

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (select) {
      select.value = "hi";
      select.dispatchEvent(new Event("change"));
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
          select.value = "hi";
          select.dispatchEvent(new Event("change"));
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
