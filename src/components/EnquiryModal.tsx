'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  initialProduct = ''
}: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState(initialProduct || 'HP FUTUR-X 5W-30');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Simple Clean Header */}
            <div className="mb-5 pr-6">
              <span className="text-[11px] font-extrabold text-[#eb1e25] uppercase tracking-wider block mb-1">
                HP LUBRICANTS ENQUIRY
              </span>
              <h2 className="text-2xl font-black text-[#002b5c]">
                Request Product Quote
              </h2>
            </div>

            {/* Clean Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Full Name <span className="text-[#eb1e25]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Mobile Number <span className="text-[#eb1e25]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Product Requirement <span className="text-[#eb1e25]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors font-medium text-[#002b5c]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={15} /> Submit Enquiry
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 size={44} className="mx-auto text-green-500 mb-3" />
            <h3 className="text-xl font-extrabold text-[#002b5c] mb-1">
              Enquiry Submitted!
            </h3>
            <p className="text-xs text-gray-600 mb-6 leading-relaxed">
              Thank you <strong>{name}</strong>. Our HP Lubricants representative will contact you at <strong>{mobile}</strong> shortly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
