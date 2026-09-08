"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function genCode(len = 6): string {
  return Array.from({ length: len }, () =>
    CHARS[Math.floor(Math.random() * CHARS.length)]
  ).join("");
}

// --- Canvas Wave CAPTCHA Renderer ---
function drawCaptcha(canvas: HTMLCanvasElement, code: string) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#eef2ff");
  bg.addColorStop(1, "#fdf2f8");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Noise dots
  for (let i = 0; i < 80; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * W,
      Math.random() * H,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `hsla(${Math.random() * 360}, 60%, 60%, 0.4)`;
    ctx.fill();
  }

  // Noise lines
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.lineTo(Math.random() * W, Math.random() * H);
    ctx.strokeStyle = `hsla(${Math.random() * 360}, 50%, 55%, 0.35)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Characters with wave offset
  const charW = W / (code.length + 1);
  const colors = ["#1e3a8a", "#7c3aed", "#be185d", "#065f46", "#c2410c", "#0e7490"];

  code.split("").forEach((ch, i) => {
    const x = charW * (i + 0.7);
    const yBase = H / 2 + 6;
    const waveY = Math.sin((i / code.length) * Math.PI * 2) * 7;
    const angle = ((Math.random() - 0.5) * Math.PI) / 8;
    const size = 22 + Math.random() * 6;

    ctx.save();
    ctx.translate(x, yBase + waveY);
    ctx.rotate(angle);
    ctx.font = `900 ${size}px 'Courier New', monospace`;
    ctx.fillStyle = colors[i % colors.length];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Subtle shadow
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });

  // Wave overlay line across characters
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  for (let x = 0; x < W; x++) {
    ctx.lineTo(x, H / 2 + Math.sin((x / W) * Math.PI * 3) * 4);
  }
  ctx.strokeStyle = "rgba(99,102,241,0.25)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// --- Canvas Component ---
function CaptchaCanvas({ code }: { code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, code);
    }
  }, [code]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={56}
      className="rounded-lg border-2 border-[#002b5c]/30 shadow-sm select-none"
      aria-label="CAPTCHA image"
    />
  );
}

// --- Public CaptchaInput Component ---
interface CaptchaProps {
  value: string;
  onChange: (v: string) => void;
  isValid: boolean;
  onRefresh: () => void;
  code: string;
}

export function CaptchaInput({
  value,
  onChange,
  isValid,
  onRefresh,
  code,
}: CaptchaProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Canvas CAPTCHA image */}
        <CaptchaCanvas code={code} />

        {/* Refresh button */}
        <button
          type="button"
          onClick={onRefresh}
          className="text-gray-400 hover:text-[#002b5c] transition-colors cursor-pointer p-1 rounded hover:bg-gray-100"
          title="Generate new CAPTCHA"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Text input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase().replace(/\s/g, ""))}
        maxLength={6}
        placeholder="Type the characters above"
        autoComplete="off"
        className={`w-full max-w-[220px] px-3 py-2 text-sm border-2 rounded-lg focus:outline-none transition-colors font-mono tracking-[0.25em] uppercase ${
          value.length === 6
            ? isValid
              ? "border-green-500 bg-green-50 text-green-800"
              : "border-red-400 bg-red-50 text-red-800"
            : "border-gray-300 focus:border-[#002b5c] bg-white"
        }`}
      />
    </div>
  );
}

// --- Hook ---
export function useCaptcha() {
  const [code, setCode] = useState(genCode);
  const [input, setInput] = useState("");

  const refresh = useCallback(() => {
    setCode(genCode());
    setInput("");
  }, []);

  const isValid = input.toUpperCase() === code;

  return { code, input, setInput, refresh, isValid };
}
