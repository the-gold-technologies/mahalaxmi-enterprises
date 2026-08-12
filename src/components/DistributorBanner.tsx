"use client";

import React from "react";

interface DistributorBannerProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function DistributorBanner({
  onOpenEnquiry,
}: DistributorBannerProps) {
  return (
    <section className="bg-[#EDEEF2] py-4">
      <div className="max-w-7xl mx-auto text-center">
        <button
          onClick={() => onOpenEnquiry("Distributor Dealership Application")}
          className=" px-3 py-2.5 bg-[#EB1E25] text-white rounded-sm font-bold text-2xl"
        >
          BECOME AN INDUSTRIAL LUBE DISTRIBUTOR (ILD)/ BAZAAR LUBE DISTRIBUTOR
          (BLD)
        </button>
      </div>
    </section>
  );
}
