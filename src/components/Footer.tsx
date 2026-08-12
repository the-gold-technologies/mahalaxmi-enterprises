'use client';

import React, { useState } from 'react';
import { Facebook, Youtube, Instagram, Mail, X, Bot, Send } from 'lucide-react';

interface FooterProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hello! I am your HP Lubricants Assistant. How can I help you find engine oils or distributors today?',
    },
  ]);

  const quickPrompts = [
    'Locate Nearest Dealer',
    'Recommend Engine Oil',
    'Wholesale Price Inquiry',
  ];

  const handlePrompt = (txt: string) => {
    setChatMessages((prev) => [...prev, { sender: 'user', text: txt }]);
    setTimeout(() => {
      let reply = 'Thank you for contacting HP Lubricants!';
      if (txt.includes('Dealer')) {
        reply = 'You can use the Locate Distributor tool above or call Toll-Free 18001214725.';
      } else if (txt.includes('Recommend')) {
        reply = 'For 2-Wheelers: HP Racer Gen6. For Cars: HP Futur-X 5W-30. For Trucks: HP Milcy Fleet.';
      } else if (txt.includes('Wholesale') || txt.includes('Inquiry')) {
        reply = 'Please click the ENQUIRY button to request bulk prices from Mahalaxmi Enterprises.';
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 500);
  };

  return (
    <>
      {/* Dark Navy Footer matching original site */}
      <footer className="bg-[#002b5c] text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold">
          {/* Left Copyright */}
          <div>
            <p>© 2026 HP Lubricants. All rights reserved.</p>
          </div>

          {/* Middle Links */}
          <div className="flex items-center gap-6 text-gray-300">
            <a href="#" className="hover:text-white transition">
              Site Map
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
          </div>

          {/* Partner Badges */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded">
              <span className="text-[10px] font-black text-[#002b5c]">HPCL</span>
            </div>
            <div className="bg-white px-2 py-0.5 rounded text-[10px] font-bold text-gray-800">
              india.gov.in
            </div>
            <div className="bg-white px-2 py-0.5 rounded text-[10px] font-bold text-gray-800">
              UN Global Compact
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/hindustanpetroleumcorporateltd"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center hover:opacity-90 transition"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCJzt53YmvAJQjT-rLSTqNjg"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#cd201f] flex items-center justify-center hover:opacity-90 transition"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <a
              href="https://www.instagram.com/hplubricants_hpcl/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#e4405f] flex items-center justify-center hover:opacity-90 transition"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* Persistent Red Sticky ENQUIRY Button on Bottom Right Edge */}
      <button
        onClick={() => onOpenEnquiry('General Site Enquiry')}
        className="fixed bottom-10 right-0 z-50 bg-[#eb1e25] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-l shadow-2xl flex items-center gap-1.5 hover:bg-[#c4141a] transition animate-bounce"
      >
        <Mail size={14} />
        <span>ENQUIRY</span>
      </button>

      {/* Floating HP Chat Mascot Bot Button */}
      <div className="fixed bottom-24 right-4 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 bg-[#002b5c] border-2 border-[#eb1e25] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition"
            title="HP Chat Assistant"
          >
            <Bot size={26} />
          </button>
        ) : (
          <div className="w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="bg-[#002b5c] text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-[#eb1e25]" />
                <span className="text-xs font-bold">HP Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray-300 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 bg-gray-50 overflow-y-auto flex flex-col gap-2">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`text-xs p-2.5 rounded-lg max-w-[85%] ${
                    m.sender === 'bot'
                      ? 'bg-white text-gray-800 border border-gray-200 self-start'
                      : 'bg-[#eb1e25] text-white self-end'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Quick Pills */}
            <div className="p-2 bg-white border-t border-gray-200 flex flex-wrap gap-1">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handlePrompt(p)}
                  className="text-[10px] font-bold bg-gray-100 text-gray-700 hover:bg-[#eb1e25] hover:text-white px-2 py-1 rounded transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
