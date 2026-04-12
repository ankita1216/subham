"use client";

import React from "react";
import { ArrowUpRight, Activity, MapPin, Waves } from "lucide-react";

// ✅ Receive onOpenPopup from App.js
export default function ActiveLivingHero({ onOpenPopup }) {

  const colors = {
    blackish: "#041a14",
    brightOrange: "#F2A71D",
    mediumOrange: "#E97323",
    darkOrange: "#D64B27",
    deepOrange: "#D84315", 
  };

  return (
    <div id="about" className="bg-[#fafaf8] font-sans text-[#041a14] overflow-x-hidden relative">
      
      {/* --- PATTERN: LEFT SIDE (Shifted Up) --- */}
      <div className="absolute -left-24 top-10 w-[350px] h-[350px] pointer-events-none z-0 select-none opacity-20 hidden xl:block">
        <div className="relative w-full h-full">
            <div className="absolute inset-0 border-[40px] rounded-full animate-spin-slow" style={{ borderColor: `${colors.brightOrange}15` }} />
            <div className="absolute inset-12 border-[2px] border-dotted rounded-full animate-reverse-spin" style={{ borderColor: colors.mediumOrange }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Activity className="w-16 h-16" style={{ color: colors.deepOrange }} />
            </div>
        </div>
      </div>

      {/* --- PATTERN: RIGHT SIDE (Shifted Up) --- */}
      <div className="absolute -right-24 top-10 w-[350px] h-[350px] pointer-events-none z-0 select-none opacity-20 hidden xl:block">
        <div className="relative w-full h-full">
            <div className="absolute inset-0 border-[40px] rounded-full animate-spin-slow" style={{ borderColor: `${colors.brightOrange}15` }} />
            <div className="absolute inset-12 border-[2px] border-dashed rounded-full animate-reverse-spin" style={{ borderColor: colors.brightOrange }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Waves className="w-16 h-16" style={{ color: colors.deepOrange }} />
            </div>
        </div>
      </div>

      <div
        className="w-full py-4 overflow-hidden border-b"
        style={{
          backgroundColor: colors.blackish,
          borderBottomColor: `${colors.brightOrange}20`,
        }}
      >
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {/* FIRST COPY */}
          <div className="flex items-center text-xs font-bold uppercase tracking-[0.3em] px-4"
            style={{ color: colors.brightOrange }}
          >
            <span className="mx-8">To be active is to live</span>
            <Activity className="w-4 h-4 opacity-50" />
            <span className="mx-8">Activeness flows seven days a week</span>
            <Activity className="w-4 h-4 opacity-50" />
            <span className="mx-8">Step into a world designed to energize</span>
            <Activity className="w-4 h-4 opacity-50" />
          </div>

          {/* SECOND COPY */}
          <div className="flex items-center text-xs font-bold uppercase tracking-[0.3em] px-4"
            style={{ color: colors.brightOrange }}
          >
            <span className="mx-8">To be active is to live</span>
            <Activity className="w-4 h-4 opacity-50" />
            <span className="mx-8">Activeness flows seven days a week</span>
            <Activity className="w-4 h-4 opacity-50" />
            <span className="mx-8">Step into a world designed to energize</span>
            <Activity className="w-4 h-4 opacity-50" />
          </div>
        </div>
      </div>

      <main className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center">
        
        {/* --- MAIN CONTENT --- */}
        <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: colors.darkOrange }}>
            <MapPin className="w-3 h-3" />
           Seujpur, Dibrugarh
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1] mb-6" style={{ color: colors.blackish }}>
            Introducing Subham <br />
            <span className="italic font-light" style={{ color: colors.deepOrange }}>Kishori</span> Heights
          </h1>

          <div className="max-w-2xl mb-12">
            <p className="text-base md:text-lg font-medium leading-relaxed text-center break-words" style={{ color: colors.blackish }}>
              An architectural icon and Dibrugarh’s first “Active Lifestyle” landmark designed for modern families.
With only 65 exclusive residences, it offers privacy, light-filled interiors, and a serene environment.
A perfect place to live actively, stay connected, and invest in your future.
            </p>
          </div>

          {/* --- GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full">
            <div className="p-6 rounded-[2rem] border border-orange-100 flex flex-col items-center justify-center shadow-sm bg-white hover:bg-orange-50 transition-colors" >
               <span className="block text-3xl font-serif font-bold italic" style={{ color: colors.deepOrange }}>78%</span>
               <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 text-center">Open Space</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center" style={{ backgroundColor: colors.blackish }}>
               <span className="block text-3xl font-serif font-bold italic text-white" >65</span>
               <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 text-center text-white">Exclusive Units</span>
            </div>
            <div className="p-6 rounded-[2rem] flex flex-col items-center justify-center shadow-xl bg-white" >
               <span className="block text-xl font-serif font-bold italic " style={{ color: colors.deepOrange }}>3 & 4 BHK</span>
               <span className=" text-[10px] uppercase font-bold tracking-widest opacity-60 text-center">Duplex Available</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center" style={{ backgroundColor: colors.blackish }}>
               <span className="block text-xl font-serif font-bold italic text-white" >B + G + 14</span>
               <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 text-center text-white">Tallest Towers</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={onOpenPopup}
              className="group flex items-center gap-3 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_20px_40px_rgba(216,67,21,0.2)] text-white"
              style={{ backgroundColor: colors.deepOrange }}
            >
              Start Your Journey 
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="w-full max-w-xs h-[1px] bg-black/10 mt-16"></div>
      </main>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 38s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 10s linear infinite;
          }
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin-reverse 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}