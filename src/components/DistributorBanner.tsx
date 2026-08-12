'use client';

import React from 'react';

interface DistributorBannerProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function DistributorBanner({ onOpenEnquiry }: DistributorBannerProps) {
  return (
    <section className="bg-[#f4f6f9] py-6 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <button
          onClick={() => onOpenEnquiry('Distributor Dealership Application')}
          className="w-full md:w-auto bg-[#eb1e25] hover:bg-[#c4141a] text-white font-extrabold text-sm md:text-base uppercase tracking-wide px-8 py-3.5 rounded shadow transition transform hover:scale-[1.01]"
        >
          BECOME AN INDUSTRIAL LUBE DISTRIBUTOR (ILD)/ BAZAAR LUBE DISTRIBUTOR (BLD)
        </button>
      </div>
    </section>
  );
}
