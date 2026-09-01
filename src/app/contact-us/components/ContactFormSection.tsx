"use client";

import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ArrowRight,
  User,
} from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";

export default function ContactFormSection() {
  const { pages, pageSEO, submitEnquiry } = useCMSStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Exact CMS API Sections
  const sections = pages["contact-us"] || {};
  const contactHeadquarter = sections.ContactHeadquarter;
  const contactForm = sections.ContactForm;

  // Exact fields from ContactHeadquarter
  const companyName = contactHeadquarter?.companyName || "";
  const badge = contactHeadquarter?.badge || "";
  const proprietor = contactHeadquarter?.proprietor || "";
  const description = contactHeadquarter?.description || "";
  const phone = contactHeadquarter?.phone || "";
  const email = contactHeadquarter?.email || "";
  const address = contactHeadquarter?.address || "";
  const workingHours = contactHeadquarter?.workingHours || "";
  const whatsapp = contactHeadquarter?.whatsapp || "";

  // Exact fields from ContactForm
  const formBadge = contactForm?.badge || "";
  const formTitle = contactForm?.title || "";
  const formSubtitle = contactForm?.subtitle || "";
  const buttonText = contactForm?.buttonText || "";

  // Dynamic SEO Heading
  const HeadingTag = getHeadingTag(pageSEO["contact-us"]?.headingOptions, "h1");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        product: formData.product || "General Enquiry",
        message: formData.message,
      });

      if (res && res.error) {
        setErrorMessage(res.error);
      } else {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          product: "",
          message: "",
        });
      }
    } catch (err: any) {
      console.error("Enquiry submit error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50/50 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT SIDE: ContactHeadquarter */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-[#eb1e25] text-xs font-bold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#eb1e25]"></span>
                  {badge}
                </div>
              )}

              {companyName && (
                <HeadingTag className="text-3xl sm:text-4xl font-black text-[#002b5c] tracking-tight leading-tight mb-3">
                  {companyName}
                </HeadingTag>
              )}

              {description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Contact Details from ContactHeadquarter */}
            <div className="space-y-6 pt-2 border-t border-gray-200/80">
              {/* Phone */}
              {phone && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#eb1e25] shadow-xs shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Phone / Contact
                    </div>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-base font-bold text-gray-900 hover:text-[#eb1e25] transition-colors inline-flex items-center gap-1.5 mt-0.5"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Proprietor */}
              {proprietor && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-slate-700 shadow-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Proprietor
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">
                      {proprietor}
                    </p>
                  </div>
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#002b5c] shadow-xs shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Office Address
                    </div>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed mt-0.5 whitespace-pre-line">
                      {address}
                    </p>
                  </div>
                </div>
              )}

              {/* Email */}
              {email && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-blue-600 shadow-xs shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Email
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-gray-900 hover:text-[#002b5c] transition-colors block mt-0.5"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              )}

              {/* Working Hours */}
              {workingHours && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-emerald-600 shadow-xs shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Working Hours
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {workingHours}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp */}
            {whatsapp && (
              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsapp}?text=Hello%20${encodeURIComponent(companyName)},%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Chat on WhatsApp ({phone})
                </a>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: ContactForm */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-gray-200 shadow-lg shadow-gray-200/50">
            {(formBadge || formTitle || formSubtitle) && (
              <div className="mb-6 pb-4 border-b border-gray-100">
                {formBadge && (
                  <span className="text-xs font-bold text-[#eb1e25] uppercase tracking-wider block mb-1">
                    {formBadge}
                  </span>
                )}
                {formTitle && (
                  <h2 className="text-2xl font-extrabold text-[#002b5c] tracking-tight">
                    {formTitle}
                  </h2>
                )}
                {formSubtitle && (
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    {formSubtitle}
                  </p>
                )}
              </div>
            )}

            {isSubmitted ? (
              <div className="py-10 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3.5 text-green-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting{" "}
                  {companyName ? <strong>{companyName}</strong> : "us"}. We will
                  get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  Send Another Message
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-[#eb1e25]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Mobile Number <span className="text-[#eb1e25]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Email & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Product Requirement
                    </label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      placeholder="e.g. HP Lubricants"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:bg-white focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Your Message / Requirement Details{" "}
                    <span className="text-[#eb1e25]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your inquiry or product requirement..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#eb1e25] hover:bg-[#c9151c] active:scale-[0.99] disabled:opacity-60 text-white text-sm font-bold uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{buttonText}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
