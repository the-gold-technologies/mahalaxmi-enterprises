"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("mahalaxmi_cookie_consent");
      if (!consent) {
        // Smooth entrance delay
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Handle private browsing or restricted localStorage
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("mahalaxmi_cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem("mahalaxmi_cookie_consent", "rejected");
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 max-w-[calc(100vw-2rem)] sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] text-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#eb1e25] border border-red-100 flex items-center justify-center flex-shrink-0">
            <Cookie size={18} />
          </div>
          <h3 className="text-sm font-bold tracking-tight text-slate-900">Cookie Preferences</h3>
        </div>
        <button
          onClick={handleReject}
          aria-label="Dismiss cookie banner"
          className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
        >
          <X size={15} />
        </button>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-4">
        We use cookies to improve your browsing experience, optimize site performance, and analyze
        traffic. Read our{" "}
        <Link
          href="/privacy-policy"
          className="text-[#eb1e25] underline underline-offset-2 hover:text-[#c4141a] font-semibold transition-colors"
        >
          Privacy Policy
        </Link>{" "}
        to learn more.
      </p>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleReject}
          className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all cursor-pointer"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="flex-1 py-2 px-3 text-xs font-bold text-white bg-[#eb1e25] hover:bg-[#c4141a] active:scale-[0.98] rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
        >
          Accept Cookies
        </button>
      </div>
    </aside>
  );
}
