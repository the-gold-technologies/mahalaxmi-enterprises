'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function LatestVideosSection() {
  const [activeVideo, setActiveVideo] = useState({
    id: 'diwali',
    title: 'Yeh Diwali Friction Free Wali!',
    desc: 'On roads or in relationships, the journey becomes smoother when there’s care. This Diwali, let’s light up hearts with warmth and connection. Come, let’s Deliver Happiness! HP Lubricants, from the house of Hindustan Petroleum, wishes you a friction-free Diwali! Engine mein HP toh engine Happy!',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
  });

  const playlist = [
    {
      id: 'diwali',
      title: 'Yeh Diwali Friction Free Wali!',
      desc: 'On roads or in relationships, the journey becomes smoother when there’s care. This Diwali, let’s light up hearts with warmth and connection.',
      thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'futurx',
      title: 'HP Lubricants Futur-X',
      desc: 'Give your vehicle’s engine a taste of super premium HP Lubricants Futur-X, and feel the difference in every drive.',
      thumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'commercial',
      title: 'HP Lubricants Commercial',
      desc: 'The brand new commercial from HP Lubricants.',
      thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'wheels',
      title: 'Wheels of the Nation',
      desc: 'They keep the wheels of the nation turning, quite literally. They ensure that the speed of progress never slows down.',
      thumbnail: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <section id="videos" className="py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
          Latest Videos
        </h2>

        <p className="mt-4 text-gray-600 text-sm max-w-3xl mx-auto">
          What has HP Lubricants has been up to recently? Find out with their latest corporate and brand videos.
        </p>

        {/* Video Grid matching exact layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Main Video Embed Container */}
          <div className="lg:col-span-2 bg-black rounded shadow-md overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-gray-900 group cursor-pointer">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => alert(`Playing video: "${activeVideo.title}"`)}
                  className="w-16 h-16 bg-[#eb1e25] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition duration-300"
                  aria-label="Play Video"
                >
                  <Play size={32} className="ml-1 fill-white" />
                </button>
              </div>
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur">
                HP Lubricants
              </div>
            </div>
            <div className="p-4 bg-gray-900 text-white">
              <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2">{activeVideo.desc}</p>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="bg-[#f8f9fa] border border-gray-200 rounded p-3 flex flex-col gap-3 max-h-[460px] overflow-y-auto">
            {playlist.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveVideo(item as any)}
                className={`flex gap-3 bg-white p-2.5 rounded border cursor-pointer hover:border-[#eb1e25] transition ${
                  activeVideo.id === item.id ? 'border-[#eb1e25] ring-1 ring-[#eb1e25]' : 'border-gray-200'
                }`}
              >
                <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play size={14} className="fill-white text-white" />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <a
            href="https://www.youtube.com/channel/UCJzt53YmvAJQjT-rLSTqNjg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#eb1e25] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded hover:bg-[#c4141a] transition shadow-md"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
