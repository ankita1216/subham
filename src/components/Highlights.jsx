"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Shield, Zap, Flame, Award, Play, Pause, History } from "lucide-react";

export default function Specifications() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // NEW PALETTE: Orange and Blackish Combo
  const colors = {
    blackish: "#041a14",      // Deeper architectural dark base
    brightOrange: "#F2A71D", // Accent Highlight
    mediumOrange: "#E97323", // Primary action color
    darkOrange: "#D64B27",   // Red-Orange branding accent
  };

  const themeImages = [
    { src: "/theme_1.png", title: "Kids' Play Area" },
    { src: "/theme_2.png", title: "Swimming Pool" },
    { src: "/theme_3.png", title: "Lawn"},
    { src: "/theme_4.png", title: "Gymnasium" },
  { src: "/theme_5.png", title: "Indoor Games Room" },
  { src: "/theme_6.png", title: "Community Hall"},
  ];

  const technicalData = [
    { category: "Structure", icon: <Shield />, info: "RCC Frame with Earthquake Resistant Structure" },
    { category: "Flooring", icon: <History />, info: "Vitrified tiles for all rooms, drawing, and dining" },
    { category: "Power", icon: <Zap />, info: "24×7 Generator backup for common area & 2KVA Power backup per flat" },
    { category: "Safety", icon: <Flame />, info: "Equipped with fire alarms & fighting devices" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % themeImages.length);
  }, [themeImages.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    // ✅ CHANGED: Reduced py-24 to py-16 for mobile
    <section id="high" className="w-full bg-[#fafaf8] py-5 overflow-hidden font-sans text-[#041a14]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-18 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 lg:gap-4 text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] mb-6 lg:mb-10" style={{ color: colors.darkOrange }}>
              <Award className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: colors.brightOrange }} />
              Curated Amenities
            </div>
            {/* ✅ CHANGED: Responsive text sizing to fit mobile screens */}
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[110px] leading-[0.9] lg:leading-[0.8] tracking-tighter text-[#041a14]">
              The <span className="italic font-light" style={{ color: colors.darkOrange }}>Standard</span> <br />
              of Living
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-20">
            <p className="text-[#041a14]/70 text-lg lg:text-xl font-medium leading-relaxed border-l-4 pl-6 lg:pl-8" style={{ borderLeftColor: colors.brightOrange }}>
             Every detail at Subham Kishori Heights is designed for an active, vibrant lifestyle with comfort, wellness, and modern living.
            </p>
          </div>
        </div>

        {/* --- AUTO-PLAYING SLIDER --- */}
        <div 
          // ✅ CHANGED: Mobile aspect ratio & border radius
          className="relative w-full aspect-[16/9] md:aspect-video lg:aspect-[21/9] rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-2xl mb-20 lg:mb-32 group"
          style={{ backgroundColor: colors.blackish }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {themeImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${
                idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-contain md:object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
              
              {/* ✅ CHANGED: Padding reduced for mobile (p-8 vs p-20) */}
              <div className="absolute inset-0 p-6 md:p-10 lg:p-20 flex flex-col justify-end pb-6 md:pb-10 lg:pb-20 pointer-events-none">
                <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] mb-2 lg:mb-4 block" style={{ color: colors.brightOrange }}>
                  {img.tag}
                </span>
                <h3 className="font-serif text-lg sm:text-xl md:text-4xl lg:text-6xl text-white italic leading-tight max-w-[80%] md:max-w-none mb-6 md:mb-0">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}

          {/* AUTO-PLAY PROGRESS BAR */}
          <div className="absolute bottom-0 left-0 w-full h-1 lg:h-1.5 bg-white/10 z-20">
            <div 
              key={currentSlide}
              className="h-full"
              style={{ 
                backgroundColor: colors.brightOrange,
                animation: isPaused ? 'none' : 'progressAnimation 5s linear forwards'
              }}
            />
          </div>

          {/* MANUAL CONTROLS */}
          {/* ✅ CHANGED: Position adjusted for mobile (bottom-6 right-6) */}
          <div className="absolute bottom-1 md:bottom-8 lg:bottom-12 right-4 md:right-8 lg:right-12 flex items-center gap-3 md:gap-4 lg:gap-6 z-20">
             <button 
                onClick={() => setIsPaused(!isPaused)} 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-white hover:text-black"
              >
                {isPaused ? <Play className="w-3 h-3 lg:w-4 lg:h-4 fill-current" /> : <Pause className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />}
             </button>
             <div className="flex gap-2">
                {themeImages.map((_, i) => (
                   <div 
                    key={i} 
                    className={`h-1 lg:h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? "w-6 lg:w-8" : "w-2 bg-white/30"}`} 
                    style={{ backgroundColor: currentSlide === i ? colors.brightOrange : "" }}
                   />
                ))}
             </div>
          </div>
        </div>

        {/* --- TECHNICAL DATA GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {technicalData.map((spec, idx) => (
            <div key={idx} className="group relative pt-10 lg:pt-12 border-t border-gray-200 transition-all duration-500 hover:border-gray-400">
              {/* ✅ CHANGED: Icon positioning adjusted slightly for mobile */}
              <div 
                className="absolute -top-5 lg:-top-6 left-0 w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-transform"
                style={{ backgroundColor: colors.blackish, color: colors.brightOrange }}
              >
                {React.cloneElement(spec.icon, { className: "w-4 h-4 lg:w-5 lg:h-5" })}
              </div>
              <h4 className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] mb-4 lg:mb-6" style={{ color: colors.darkOrange }}>
                {spec.category}
              </h4>
              <p className="text-base lg:text-lg font-medium leading-relaxed text-[#041a14]/80 group-hover:text-[#041a14] transition-colors">
                {spec.info}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progressAnimation {
          from { width: 0%; }
          to { width: 100%; }
        }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </section>
  );
}