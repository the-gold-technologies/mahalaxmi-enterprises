"use client";

import React from "react";
import {
  Building2,
  Boxes,
  Wrench,
  Truck,
  ShieldCheck,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const iconMap = [Building2, Boxes, Wrench, Truck, ShieldCheck, Headphones];

export default function AboutMahalaxmiContent() {
  const { pages, pageSEO } = useCMSStore();
  const cmsStory =
    pages["about-us"]?.AboutMahalaxmiContent ||
    pages["about-us"]?.MahalaxmiStory;

  if (!cmsStory) {
    return null;
  }

  const title = cmsStory.title || "";
  const subtitle = cmsStory.subtitle || "";
  const proprietorRole =
    cmsStory.proprietorRole || cmsStory.proprietorDesignation || "";
  const paragraphs: string[] = Array.isArray(cmsStory.paragraphs)
    ? cmsStory.paragraphs
    : cmsStory.description
      ? [cmsStory.description]
      : [];

  const hpclOverview = cmsStory.hpclOverview;
  const whyChooseTitle = cmsStory.whyChooseTitle || "";
  const whyChooseSubtitle = cmsStory.whyChooseSubtitle || "";
  const whyChooseItems: { title: string; description: string }[] =
    cmsStory.whyChooseItems || [];

  const proprietorPhoto = cmsStory.proprietorPhoto || "";
  const proprietorPhotoAlt =
    cmsStory.proprietorPhotoAlt ||
    (subtitle ? `${subtitle} — ${proprietorRole || "Proprietor"}` : "");

  const distributorBadge = cmsStory.distributorBadge || "";
  const distributorCompany = cmsStory.distributorCompany || "";

  const HeadingTag = getHeadingTag(pageSEO["about-us"]?.headingOptions, "h1");

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Main Section Header */}
      {title && (
        <HeadingTag className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase mb-8 border-b-2 border-gray-100 pb-4">
          {title}
        </HeadingTag>
      )}

      {/* Executive Leadership & Story Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 mb-12">
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#002b5c] via-[#004b93] to-[#eb1e25]" />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Proprietor Profile Frame */}
            {proprietorPhoto && (
              <div className="shrink-0 w-full sm:w-64 md:w-72 lg:w-80">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 shadow-sm">
                  <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                    <img
                      src={proprietorPhoto}
                      alt={proprietorPhotoAlt}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="pt-4 pb-1 px-1 text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#002b5c] tracking-tight">
                      {subtitle}
                    </h2>
                    {proprietorRole && (
                      <div className="mt-1.5 inline-flex items-center gap-1.5 bg-red-50 text-[#eb1e25] border border-red-100 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {proprietorRole}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Narrative Paragraphs & Executive Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-sans">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">
                    <FormattedText text={p} />
                  </p>
                ))}
              </div>

              {/* Verified ILD Status Note inside Card */}
              {(distributorBadge || distributorCompany) && (
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                  {distributorBadge && (
                    <span className="flex items-center gap-1.5 text-[#002b5c] font-semibold">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#eb1e25]" />
                      {distributorBadge}
                    </span>
                  )}
                  {distributorCompany && (
                    <span className="text-slate-400">
                      {distributorCompany}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* HPCL Overview Card */}
      {hpclOverview && (hpclOverview.title || hpclOverview.description) && (
        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
          {hpclOverview.title && (
            <h3 className="text-lg font-bold text-[#002b5c] mb-2">
              {hpclOverview.title}
            </h3>
          )}
          {hpclOverview.description && (
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              <FormattedText text={hpclOverview.description} />
            </p>
          )}
          {Array.isArray(hpclOverview.bullets) &&
            hpclOverview.bullets.length > 0 && (
              <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                {hpclOverview.bullets.map((b: string, idx: number) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            )}
        </div>
      )}

      {/* Why Choose Mahalaxmi Enterprises Section */}
      {(whyChooseTitle || whyChooseItems.length > 0) && (
        <div className="mt-14 pt-10 border-t border-gray-200">
          {whyChooseTitle && (
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] tracking-tight uppercase mb-2">
              {whyChooseTitle}
            </h2>
          )}
          {whyChooseSubtitle && (
            <p className="text-[#eb1e25] font-bold text-base md:text-lg mb-8">
              {whyChooseSubtitle}
            </p>
          )}

          {/* Feature Grid */}
          {whyChooseItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseItems.map((item, index) => {
                const IconComp =
                  iconMap[index % iconMap.length] || CheckCircle2;
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
          )}
        </div>
      )}
    </section>
  );
}
