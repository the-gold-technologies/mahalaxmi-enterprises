'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle2, FileText } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  pdfType: 'TDS' | 'MSDS';
  pdfUrl?: string;
}

export default function DownloadModal({
  isOpen,
  onClose,
  productName,
  pdfType = 'TDS',
  pdfUrl = ''
}: DownloadModalProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsDownloaded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloaded(true);

    // Trigger PDF download simulation / file fetch
    const link = document.createElement('a');
    link.href = pdfUrl || '#';
    link.download = `${productName.replace(/\s+/g, '_')}_${pdfType}.pdf`;
    document.body.appendChild(link);
    // In real app, link.click() downloads the asset
    document.body.removeChild(link);
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

        {!isDownloaded ? (
          <>
            {/* Header */}
            <div className="mb-5 pr-6">
              <span className="text-[11px] font-extrabold text-[#eb1e25] uppercase tracking-wider block mb-1">
                TECHNICAL DATASHEET DOWNLOAD
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#002b5c] flex items-center gap-2">
                <FileText size={22} className="text-[#eb1e25]" /> Download {pdfType} PDF
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Product: <strong className="text-[#002b5c]">{productName}</strong>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Full Name <span className="text-[#eb1e25]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
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
                    Email Address <span className="text-[#eb1e25]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mahalaxmi Industries"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#eb1e25] hover:bg-[#c4141a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={16} /> Download {pdfType} PDF Document
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 size={44} className="mx-auto text-green-500 mb-3" />
            <h3 className="text-xl font-extrabold text-[#002b5c] mb-1">
              Download Started!
            </h3>
            <p className="text-xs text-gray-600 mb-6 leading-relaxed">
              Thank you <strong>{name}</strong>. The technical document <strong>{productName} ({pdfType})</strong> is downloading to your device.
            </p>
            <button
              onClick={() => {
                setIsDownloaded(false);
                onClose();
              }}
              className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
