'use client';

import React from 'react';
import Link from 'next/link';
import { useCMSStore } from '@/store/useCMSStore';
import { FormattedText } from '@/components/FormattedText';

export default function AboutSection() {
  const { pages } = useCMSStore();
  const cmsAbout = pages["home"]?.AboutSection;

  if (!cmsAbout) {
    return null;
  }

  const title = cmsAbout.title || '';
  const subtitle = cmsAbout.subtitle || '';
  const description = cmsAbout.description || cmsAbout.bodyText || '';
  const buttonText = cmsAbout.buttonText || 'Read More';
  const buttonLink = cmsAbout.buttonLink || '/about-us';

  return (
    <section id="about" className="py-16 bg-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Heading with dark blue underline */}
        {title && (
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="mt-4 text-base md:text-lg font-semibold text-[#002b5c] max-w-3xl mx-auto font-sans">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-sans">
            <FormattedText text={description} />
          </p>
        )}

        {buttonText && (
          <div className="mt-8">
            <Link
              href={buttonLink}
              className="inline-block bg-[#eb1e25] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded hover:bg-[#c4141a] transition shadow-md"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
