'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export default function EnquiryModal({ isOpen, onClose, initialProduct = '' }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState(initialProduct || 'HP FUTUR-X 5W-30');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative shadow-2xl animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="border-b border-gray-200 pb-3 mb-4">
              <span className="text-[10px] font-extrabold text-[#eb1e25] uppercase tracking-wider">
                HP LUBRICANTS ENQUIRY
              </span>
              <h2 className="text-xl font-black text-[#002b5c]">Request Product Quote</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name*</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#eb1e25]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number*</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#eb1e25]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#eb1e25]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Requirement*</label>
                <input
                  type="text"
                  required
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#eb1e25]"
                />
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full bg-[#eb1e25] text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded hover:bg-[#c4141a] transition shadow flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Submit Enquiry
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 size={48} className="mx-auto text-green-500 mb-3" />
            <h3 className="text-lg font-extrabold text-[#002b5c]">Enquiry Submitted!</h3>
            <p className="text-xs text-gray-600 mt-2">
              Thank you <strong>{name}</strong>. Our HP Lubricants representative will reach out to you at <strong>{mobile}</strong> shortly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-6 bg-[#002b5c] text-white text-xs font-bold px-6 py-2 rounded hover:bg-opacity-90 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
