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
    pages["about-us"]?.AboutMahalaxmiContent || pages["about-us"]?.MahalaxmiStory;

  if (!cmsStory) {
    return null;
  }

  const title = cmsStory.title || "";
  const subtitle = cmsStory.subtitle || "";
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

  const HeadingTag = getHeadingTag(pageSEO["about-us"]?.headingOptions, "h1");

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Main Section Header */}
      {title && (
        <HeadingTag className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase mb-8 border-b-2 border-gray-100 pb-4">
          {title}
        </HeadingTag>
      )}

      {/* Sub-header: Proprietor Info */}
      {subtitle && (
        <h2 className="text-xl md:text-2xl font-bold text-[#eb1e25] mb-6">
          {subtitle}
        </h2>
      )}

      {/* Text Paragraphs */}
      {paragraphs.length > 0 && (
        <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed font-sans">
          {paragraphs.map((p, idx) => (
            <p key={idx}>
              <FormattedText text={p} />
            </p>
          ))}
        </div>
      )}

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
          {Array.isArray(hpclOverview.bullets) && hpclOverview.bullets.length > 0 && (
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
                const IconComp = iconMap[index % iconMap.length] || CheckCircle2;
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
