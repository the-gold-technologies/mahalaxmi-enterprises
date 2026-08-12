'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

interface ContactSectionProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function LocateDistributorContactSection({ onOpenEnquiry }: ContactSectionProps) {
  const [lubeType, setLubeType] = useState('ILD');
  const [country, setCountry] = useState('India');
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResults([
      {
        name: 'Mahalaxmi Enterprises - Authorized Lube Stockist',
        type: lubeType === 'ILD' ? 'Industrial Lube Distributor' : 'Bazaar Lube Distributor',
        address: 'Hindustan Petroleum Depot, Lower Parel (E), Mumbai - 400013',
        phone: '18001214725 / +91 98765 43210',
      },
    ]);
  };

  return (
    <section id="contact" className="py-16 bg-[#f4f6f9]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Card: Locate Lube Distributor */}
          <div className="bg-[#e5e9f0] border border-gray-300 rounded p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase leading-tight section-underline text-left">
              Locate An Industrial Lube Distributor (ILD)/ Bazaar Lube Distributor (BLD)
            </h2>

            <p className="mt-6 text-xs text-gray-700 font-medium">
              Find the dealer of HP products in your area by selecting your options below.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
                <label className="text-xs font-bold text-gray-800">
                  Type<span className="text-red-500">*</span>:
                </label>
                <select
                  value={lubeType}
                  onChange={(e) => setLubeType(e.target.value)}
                  className="sm:col-span-2 px-3 py-1.5 text-xs border border-gray-300 rounded bg-white focus:outline-none"
                >
                  <option value="ILD">Industrial Lube Distributor (ILD)</option>
                  <option value="BLD">Bazaar Lube Distributor (BLD)</option>
                  <option value="CFA">CFA Distributor</option>
                  <option value="Caltex">Caltex Distributor</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2">
                <label className="text-xs font-bold text-gray-800">
                  Country<span className="text-red-500">*</span>:
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="sm:col-span-2 px-3 py-1.5 text-xs border border-gray-300 rounded bg-white focus:outline-none"
                >
                  <option value="India">India</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-[#eb1e25] text-white text-xs font-bold uppercase tracking-wider px-8 py-2.5 rounded hover:bg-[#c4141a] transition shadow"
                >
                  Search
                </button>
              </div>
            </form>

            {searchResults && (
              <div className="mt-6 p-4 bg-white border border-gray-300 rounded text-left">
                <h4 className="text-xs font-bold text-[#002b5c]">Search Result:</h4>
                {searchResults.map((res, i) => (
                  <div key={i} className="mt-2 text-xs text-gray-700">
                    <p className="font-bold text-[#eb1e25]">{res.name}</p>
                    <p>{res.address}</p>
                    <p className="font-semibold">Phone: {res.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Card: Contact Details */}
          <div className="bg-[#e5e9f0] border border-gray-300 rounded p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase section-underline text-left">
              Contact Details
            </h2>

            <div className="mt-6">
              <img
                src="https://www.hplubricants.in/sites/default/files/logo.png"
                alt="HP Lubricants Logo"
                className="h-16 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://www.hplubricants.in/sites/default/files/fevicon.png';
                }}
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 text-xs text-gray-700">
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-gray-800 flex-shrink-0 mt-0.5" />
                <p>
                  Hindustan Petroleum, 10th Floor, A Wing, Marathon Futurex Building, N. M. Joshi Marg, Lower Parel (E),Mumbai-400013, Maharashtra India.
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-gray-800 flex-shrink-0" />
                <p>
                  Toll Free: <strong>18001214725</strong>
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <Clock size={16} className="text-gray-800 flex-shrink-0 mt-0.5" />
                <p>
                  Working Hours Monday to Saturday from 9.00 am to 6.00pm except for Public Holidays.
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={16} className="text-gray-800 flex-shrink-0" />
                <p>
                  Email: <strong>lubescare@hpcl.in</strong>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onOpenEnquiry('Direct Contact Support')}
                className="bg-[#eb1e25] text-white text-xs font-bold uppercase tracking-wider px-8 py-2.5 rounded hover:bg-[#c4141a] transition shadow"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
