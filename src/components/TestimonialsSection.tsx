"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RedQuoteBadge = ({ className }: { className?: string }) => (
  <div
    className={`inline-flex gap-1.5 items-center justify-center z-20 pointer-events-none ${className}`}
  >
    <span className="w-3 h-7 bg-[#eb1e25] -skew-x-[18deg] block rounded-[2px]" />
    <span className="w-3 h-7 bg-[#eb1e25] -skew-x-[18deg] block rounded-[2px]" />
  </div>
);

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "MR. Gudu Bhai",
      role: "MECHANIC",
      org: "National Automobiles",
      location: "Valsad-Vapi Market - Gujarat",
      quote:
        "We are using Milcy happy with different skims running by the firm.",
      image: "/testimonial-1.png",
    },
    {
      id: 2,
      name: "Sanjay Aggarwal",
      role: "Retailer",
      org: "Aggarwal Auto Enterprises",
      location: "Chandrapur - Maharashtra",
      quote: "Milcy has given great performance with longer durability.",
      image: "/testimonial-2.png",
    },
    {
      id: 3,
      name: "Mr. Babasaheb Kale",
      role: "Sr. Manager - Sourcing & Supply Chain",
      org: "Gabriel India Ltd",
      location: "Pune - Maharashtra",
      quote:
        "We are associated with HPCL for long time. We are happy with the services extended to us and support in new product development.",
      image: "/hp-testimonial-3.png",
    },
    {
      id: 4,
      name: "Kartik R Shah",
      role: "Director",
      org: "Shah Foils Limited",
      location: "Gandhinagar - Gujarat",
      quote:
        "Excellent Team and Product. We are using HP Rolmet 40 from last 15 years for cold rolling of stainless steel. Till now not faced any quality issue.",
      image: "/hp-testimonial-4.png",
    },
    {
      id: 5,
      name: "Sanjay Dahiya",
      role: "Fuel Inspector",
      org: "Tughlakabad Diesel Shed",
      location: "Tughlakabad - Delhi",
      quote:
        "HPCL cares for product quality and customer requirements. Customer service and resolution action are very prompt. Response of HP TS office is quick.",
      image: "/hp-testimonial-5.png",
    },
    {
      id: 6,
      name: "Mr Dilipbhai Javia",
      role: "Founder & Managing Partner",
      org: "Ravi Corporation",
      location: "Rajkot - Gujarat",
      quote:
        "We have been using HPCL Quenching Oil, Metaquench 43 since last 7 years for Heat Treatment. We are very satisfied with product quality & service.",
      image: "/hp-testimonial-6.png",
    },
    {
      id: 7,
      name: "Shri Deepak Sharma",
      role: "Technical Head",
      org: "Tex Corp Ltd",
      location: "Gurgaon - Haryana",
      quote:
        "Satisfied customer of Hytherm S. Mahalaxmi Enterprises has delivered superior performance across all our manufacturing operations.",
      image: "/hp-testimonial-7.png",
    },
    {
      id: 8,
      name: "Prakashraj Jain",
      role: "Managing Director",
      org: "Real Strips Ltd.",
      location: "Ahmedabad - Gujarat",
      quote:
        "HP Rolmet 40 & HP Rolmet 7 are best grades for cold rolling of stainless steel. Response of technical team and sales team is very good.",
      image: "/hp-testimonial-8.png",
    },
    {
      id: 9,
      name: "Mr. Santosh Sankpal",
      role: "Deputy Manager – Heat Treatment",
      org: "SKF India Limited",
      location: "Pune - Maharashtra",
      quote:
        "We in SKF Pune using the Metaquench-42 Quenching oil from more than 15 years, this is the best oil among the industry.",
      image: "/hp-testimonial-9.jpg",
    },
    {
      id: 10,
      name: "Shri. S D KOKATE",
      role: "C & MS (G)",
      org: "Diesel Loco Shed GPR",
      location: "Pune - Maharashtra",
      quote:
        "Mahalaxmi Enterprises is most trusted partner for Indian Railways and the only approved supplier for coolant.",
      image: "/hp-testimonial-10.jpg",
    },
    {
      id: 11,
      name: "Shri. K W DESHMUKH",
      role: "ADME",
      org: "Diesel Loco Shed GPR",
      location: "Pune - Maharashtra",
      quote:
        "Mahalaxmi Enterprises cares its customer for timely delivery and uninterrupted supply of its products. Customer service is prompt and efficient.",
      image: "/hp-testimonial-11.jpg",
    },
    {
      id: 12,
      name: "Mr. Harish Samtani",
      role: "G.M - Materials",
      org: "Sunbeam Auto Pvt Ltd",
      location: "Gurugram - Delhi NCR",
      quote:
        "We are using Hydraulic and Cutting oil for more than 20 years now. Performance is very good and technical support is exceptional.",
      image: "/hp-testimonial-12.jpg",
    },
    {
      id: 13,
      name: "Shishir Tripathi",
      role: "Manager Procurement",
      org: "CEAT",
      location: "Mumbai - Maharashtra",
      quote:
        "Mahalaxmi Enterprises has been a reliable and strategic partner. We expect to continue this relationship and grow together for many years to come.",
      image: "/hp-testimonial-13.png",
    },
    {
      id: 14,
      name: "Amit Soni",
      role: "Retailer",
      org: "Amit Tractors",
      location: "Naubagh - Fatehpur",
      quote:
        "Mahalaxmi Enterprises Retailer Program is best. Great rewards program for retailers and dealers across India.",
      image: "/hp-testimonial-14.png",
    },
    {
      id: 15,
      name: "Praveen Kumar Singh",
      role: "Asst. General Manager",
      org: "JCB Alliance Industrial Marketing",
      location: "New Delhi",
      quote:
        "Mahalaxmi Enterprises always deserves appreciation for their prompt action and technical support services.",
      image: "/hp-testimonial-3.png",
    },
    {
      id: 16,
      name: "Sandeep Das",
      role: "Secretary",
      org: "Vintage Car & Motorcycle Club",
      location: "Kolkata - West Bengal",
      quote:
        "Even for our Vintage Cars and Motorcycles, we bank upon Mahalaxmi Enterprises for maximum performance.",
      image: "/hp-testimonial-4.png",
    },
    {
      id: 17,
      name: "Yogesh Wadhwa",
      role: "Mechanical Engineer",
      org: "Grasim Industries Limited",
      location: "Jagdishpur - Amethi",
      quote:
        "We have been associated with HPCL for many years taking turbine oil supply with zero issues.",
      image: "/hp-testimonial-5.png",
    },
    {
      id: 18,
      name: "Birendra Kumar",
      role: "SSE / Motive Power",
      org: "RDSO Manak Nagar",
      location: "Lucknow - Uttar Pradesh",
      quote:
        "I appreciate HP Lube Technical Services for their support & timely response to Indian Railways.",
      image: "/hp-testimonial-6.png",
    },
    {
      id: 19,
      name: "Rajan Mallick",
      role: "Retailer",
      org: "Metro Auto Center",
      location: "Jamshedpur - Jharkhand",
      quote:
        "Mahalaxmi Enterprises is best in the Market. Superior quality and price structure for customers.",
      image: "/hp-testimonial-7.png",
    },
    {
      id: 20,
      name: "Kishor Bhai",
      role: "Retailer",
      org: "Mihir Traders",
      location: "Bhuj - Gujarat",
      quote:
        "Mahalaxmi Enterprises is excellent with best price and Milcy is best success product.",
      image: "/hp-testimonial-9.jpg",
    },
    {
      id: 21,
      name: "Samir Bhai",
      role: "MECHANIC",
      org: "Samir Auto Garage",
      location: "Bhuj - Gujarat",
      quote:
        "Mahalaxmi Enterprises products give top performance, good grade wise performance like Milcy and Racer4.",
      image: "/hp-testimonial-10.jpg",
    },
    {
      id: 22,
      name: "Arvind Srivastava",
      role: "Retailer",
      org: "Smita Motors",
      location: "Unnao - Uttar Pradesh",
      quote:
        "We sell lubricants from Mahalaxmi Enterprises. High quality products with no complaints so far from mechanics or end-users.",
      image: "/hp-testimonial-11.jpg",
    },
    {
      id: 23,
      name: "Pavitra Khanna",
      role: "Managing Director",
      org: "Natraj JCB",
      location: "Jhansi - Uttar Pradesh",
      quote:
        "We are dealing with Mahalaxmi Enterprises for last 4 years. Customers using your lubricants are fully satisfied.",
      image: "/hp-testimonial-12.jpg",
    },
    {
      id: 24,
      name: "Pankaj Barman",
      role: "Retailer",
      org: "Pooja Earth Movers",
      location: "Chandrapur - Maharashtra",
      quote:
        "HP lubes are the high quality lubes with affordable price for all types of consumers.",
      image: "/hp-testimonial-13.png",
    },
  ];

  const cardsPerPage = 4;
  const maxIndex = testimonials.length - cardsPerPage;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Automatic slide transition every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  return (
    <section
      id="testimonials"
      className="py-16  text-center font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          Our Prominent Customers
        </h2>

        <p className="mt-4 text-gray-600 text-sm md:text-base max-w-3xl mx-auto font-medium">
          Mahalaxmi Enterprises has always been in the forefront supplying and
          delivering technology advanced lubricants as per industrial market trends
        </p>

        {/* Carousel Slider Outer Wrapper (Hover to Pause) */}
        <div
          className="mt-14 relative px-2 sm:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-30"
            aria-label="Previous Testimonials"
          >
            <ChevronLeft size={38} strokeWidth={4} />
          </button>

          {/* Testimonials Smooth Overflow Window */}
          <div className="overflow-hidden py-4 px-1">
            <div
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% / 4 + 6px)))`,
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-shrink-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] relative bg-white border border-[#d1d5db] pt-9 pb-9 px-5 flex flex-col justify-between text-center shadow-sm transition-all duration-300 hover:shadow-md min-h-[440px]"
                >
                  {/* Top-Left Red Double Quote Badge Overlapping Top Border Line */}
                  <RedQuoteBadge className="absolute -top-[14px] left-6" />

                  {/* Center Profile Avatar */}
                  <div className="flex justify-center mt-1 mb-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-24 h-24 rounded-full object-cover border border-gray-100 shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80";
                      }}
                    />
                  </div>

                  {/* Name & Role in Dark Navy */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-sm font-bold text-[#001a36] tracking-tight">
                      {t.name}
                    </h3>
                    <p className="text-sm  font-bold text-[#001a36] mt-0.5 uppercase">
                      {t.role}
                    </p>

                    {/* Organization & Location in Bold Red */}
                    <p className="text-sm font-bold text-[#eb1e25] mt-2 leading-snug">
                      {t.org}
                    </p>
                    {t.location && (
                      <p className="text-sm font-bold text-[#eb1e25] mt-0.5 leading-snug">
                        {t.location}
                      </p>
                    )}
                  </div>

                  {/* Light Gray Horizontal Divider Line */}
                  <div className="w-full border-t border-[#d1d5db] my-4" />

                  {/* Quote Text Body */}
                  <div className="flex-grow flex items-center justify-center pb-2">
                    <p className="text-sm text-[#374151] font-normal leading-relaxed font-sans px-1">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Bottom-Right Red Double Quote Badge Overlapping Bottom Border Line */}
                  <RedQuoteBadge className="absolute -bottom-[14px] right-6" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-30"
            aria-label="Next Testimonials"
          >
            <ChevronRight size={38} strokeWidth={4} />
          </button>
        </div>
      </div>
    </section>
  );
}
