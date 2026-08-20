"use client";

import React from "react";
import {
  Building2,
  Boxes,
  Wrench,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default function AboutMahalaxmiContent() {
  const whyChooseItems = [
    {
      icon: Building2,
      title: "Industrial Lube Distributor",
      description: "Catering over 100 plus Industries.",
    },
    {
      icon: Boxes,
      title: "Wide Product Portfolio",
      description:
        "Complete lubrication and industrial maintenance solutions under one roof.",
    },
    {
      icon: Wrench,
      title: "Technical Expertise",
      description:
        "Professional guidance for selecting the right products for every application.",
    },
    {
      icon: Truck,
      title: "Reliable Supply",
      description: "Consistent product availability with timely delivery.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description: "Only genuine, high-performance industrial products.",
    },
    {
      icon: Headphones,
      title: "Customer-Centric Support",
      description:
        "Dedicated service to ensure long-term customer satisfaction.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Main Section Header */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase mb-8 border-b-2 border-gray-100 pb-4">
        ABOUT MAHALAXMI ENTERPRISES
      </h1>

      {/* Sub-header: Proprietor Info */}
      <h2 className="text-xl md:text-2xl font-bold text-[#eb1e25] mb-6">
        Neha Goyal – Proprietor, Mahalaxmi Enterprises
      </h2>

      {/* Text Paragraphs */}
      <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed font-sans">
        <p>
          <strong className="text-gray-900 font-semibold">Neha Goyal</strong> is
          the Proprietor of{" "}
          <strong className="text-gray-900 font-semibold">
            Mahalaxmi Enterprises
          </strong>
          , an authorized{" "}
          <strong className="text-gray-900 font-semibold">
            Industrial Lubricants Distributor (ILD)
          </strong>{" "}
          for{" "}
          <strong className="text-gray-900 font-semibold">HP Lubricants</strong>
          , serving the{" "}
          <strong className="text-gray-900 font-semibold">
            Baghpat region
          </strong>
          . With over a decade of experience in the lubricants industry, she has
          developed extensive expertise in providing reliable lubrication
          solutions across a wide range of industrial applications.
        </p>

        <p>
          Since establishing Mahalaxmi Enterprises in{" "}
          <strong className="text-gray-900 font-semibold">2023</strong>, she has
          been committed to delivering high-quality HP Lubricants, backed by
          technical knowledge, prompt service, and a customer-centric approach.
          Under her leadership, the company has earned the trust of more than{" "}
          <strong className="text-gray-900 font-semibold">
            100 industrial customers
          </strong>{" "}
          and has successfully supplied lubricants to various{" "}
          <strong className="text-gray-900 font-semibold">
            government departments
          </strong>
          .
        </p>

        <p>
          Her focus on long-term relationships, product reliability, and
          consistent service has positioned Mahalaxmi Enterprises as a
          dependable partner for industries seeking efficient and cost-effective
          lubrication solutions. With a vision to continuously expand the
          company's reach and service capabilities, Neha Goyal remains dedicated
          to helping customers enhance equipment performance, improve
          operational efficiency, and reduce maintenance costs through the right
          lubrication practices.
        </p>
      </div>

      {/* Why Choose Mahalaxmi Enterprises Section */}
      <div className="mt-14 pt-10 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] tracking-tight uppercase mb-2">
          WHY CHOOSE MAHALAXMI ENTERPRISES
        </h2>
        <p className="text-[#eb1e25] font-bold text-base md:text-lg mb-8">
          Delivering Quality. Building Trust.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseItems.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="bg-[#f8f9fa] border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-[#002b5c] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#002b5c] text-white flex items-center justify-center mb-4">
                  <IconComp size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#002b5c] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
