"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

interface DistributorBannerProps {
  onOpenEnquiry?: (productName?: string) => void;
  onOpenDistributor?: (type?: string) => void;
}

export default function DistributorBanner({
  onOpenEnquiry,
  onOpenDistributor,
}: DistributorBannerProps) {
  const { pages } = useCMSStore();
  const cmsBanner = pages["home"]?.DistributorBanner;

  if (!cmsBanner) {
    return null;
  }

  const btnLabel = cmsBanner.btnLabel || cmsBanner.buttonText || "";
  const enquirySubject = cmsBanner.enquirySubject || "Industrial Lube Distributor (ILD)";

  if (!btnLabel) {
    return null;
  }

  return (
    <section className="bg-[#EDEEF2] py-4">
      <div className="max-w-7xl mx-auto text-center px-4">
        <button
          onClick={() => {
            if (onOpenDistributor) {
              onOpenDistributor(enquirySubject);
            } else if (onOpenEnquiry) {
              onOpenEnquiry(enquirySubject);
            }
          }}
          className="px-4 py-2.5 bg-[#EB1E25] hover:bg-[#c4141a] transition-colors text-white rounded-sm font-bold text-lg sm:text-xl md:text-2xl cursor-pointer shadow-xs"
        >
          {btnLabel}
        </button>
      </div>
    </section>
  );
}
