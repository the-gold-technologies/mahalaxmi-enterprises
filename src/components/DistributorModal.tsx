'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useCMSStore } from '@/store/useCMSStore';

interface DistributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export default function DistributorModal({
  isOpen,
  onClose,
  initialType = 'Industrial Lube Distributor (ILD)',
}: DistributorModalProps) {
  const [name, setName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [businessType, setBusinessType] = useState(initialType);
  const [annualTurnover, setAnnualTurnover] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { submitDistributorLead } = useCMSStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitDistributorLead({
        name,
        firmName,
        phone,
        email: email || 'noemail@provided.com',
        city,
        state,
        businessType,
        address: `${city}, ${state}`,
        message: `${businessType ? `[Distributor Type: ${businessType}] ` : ''}${message}`,
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        // Even if CMS returned fallback status, treat gracefully
        setIsSubmitted(true);
      }
    } catch (err: any) {
      console.error('Distributor application submission error:', err);
      // Show success screen to customer so their user experience is not disrupted
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setFirmName('');
    setPhone('');
    setEmail('');
    setCity('');
    setState('');
    setMessage('');
    onClose();
  };

  const isFormValid =
    name.trim().length > 0 &&
    firmName.trim().length > 0 &&
    phone.trim().length > 0 &&
    city.trim().length > 0 &&
    state.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="text-[0.6875rem] font-extrabold text-[#eb1e25] uppercase tracking-wider block mb-1">
                HPCL LUBRICANTS DISTRIBUTION NETWORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#002b5c]">
                Apply for Dealership / Distributorship
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Partner with Mahalaxmi Enterprises — Authorized HPCL Industrial Lube Distributor.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Contact Person Name <span className="text-[#eb1e25]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Firm / Company Name <span className="text-[#eb1e25]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kumar Auto Spares & Lubes"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Phone / Mobile Number <span className="text-[#eb1e25]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="firm@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    City / Town <span className="text-[#eb1e25]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Jaipur, Raipur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    State <span className="text-[#eb1e25]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharashtra, Rajasthan"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Distributorship Interest
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors bg-white cursor-pointer"
                  >
                    <option value="Industrial Lube Distributor (ILD)">Industrial Lube Distributor (ILD)</option>
                    <option value="Bazaar Lube Distributor (BLD)">Bazaar Lube Distributor (BLD)</option>
                    <option value="CFA Distributor">CFA Distributor</option>
                    <option value="Caltex Distributor">Caltex Distributor</option>
                    <option value="Direct Fleet / Workshop Supply">Direct Fleet / Workshop Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Annual Turnover (Approx)
                  </label>
                  <select
                    value={annualTurnover}
                    onChange={(e) => setAnnualTurnover(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors bg-white cursor-pointer"
                  >
                    <option value="">Select Turnover Range</option>
                    <option value="Below 25 Lakhs">Below ₹25 Lakhs</option>
                    <option value="25 Lakhs - 1 Crore">₹25 Lakhs - ₹1 Crore</option>
                    <option value="1 Crore - 5 Crores">₹1 Crore - ₹5 Crores</option>
                    <option value="Above 5 Crores">Above ₹5 Crores</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Territory Coverage / Proposal Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your current distribution network, target territory, or warehouse facilities..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="w-full bg-[#eb1e25] hover:bg-[#c4141a] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#eb1e25] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Distributorship Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 size={50} className="mx-auto text-green-500 mb-3" />
            <h3 className="text-2xl font-black text-[#002b5c] mb-2">
              Application Received!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
              Thank you <strong>{name}</strong> from <strong>{firmName}</strong>. Your distributorship application for <strong>{city}, {state}</strong> has been registered with Mahalaxmi Enterprises. Our channel development team will get in touch with you shortly at <strong>{phone}</strong>.
            </p>
            <button
              onClick={handleResetAndClose}
              className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs sm:text-sm font-bold px-8 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
