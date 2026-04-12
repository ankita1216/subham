"use client";

import React, { useState, useEffect } from "react";

export default function Intro({ onComplete }) {
  const [stage, setStage] = useState("building"); // building -> reveal -> complete
  const [textIndex, setTextIndex] = useState(0);
  const brandName = "SUBHAM";

  // Official Brand Palette
  const colors = {
    blackish: "#041a14",      // Deeper architectural dark base
    brightOrange: "#F2A71D", // High-energy orange
    darkOrange: "#D64B27",   // Red-Orange branding accent
  };

  useEffect(() => {
    // 1. Typing Phase
    if (textIndex < brandName.length) {
      const timer = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // 2. Hold, then trigger reveal
      const revealTimer = setTimeout(() => {
        setStage("reveal");
        // 3. Final completion
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1500);
      }, 1200);
      return () => clearTimeout(revealTimer);
    }
  }, [textIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden font-sans" style={{ backgroundColor: colors.blackish }}>
      
      {/* ARCHITECTURAL FRAMEWORK (Subtle Orange Lines) */}
      <div 
        className={`absolute inset-10 border transition-all duration-1000 ${stage === 'reveal' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} 
        style={{ borderColor: `${colors.brightOrange}10` }}
      />

      {/* MAIN TYPOGRAPHIC CENTER */}
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        
        <div className={`flex flex-col items-center transition-all duration-1000 ${stage === 'reveal' ? 'tracking-[2em] opacity-0' : 'tracking-normal opacity-100'}`}>
          
          {/* LOGO ELEMENT */}
          <div className="mb-6 md:mb-8 transition-opacity duration-500">
             <img 
                src="/logo4.png" 
                alt="Logo" 
                className="h-16 w-auto md:h-24 object-contain"
             />
          </div>

          {/* Brand Name with Orange Cursor */}
          <h1 className="font-serif text-white text-7xl md:text-9xl font-bold uppercase leading-none flex items-baseline">
            {brandName.substring(0, textIndex)}
            <span 
              className={`w-1 h-12 md:h-20 ml-2 ${textIndex === brandName.length ? 'animate-none opacity-0' : 'animate-pulse'}`} 
              style={{ backgroundColor: colors.brightOrange }}
            />
          </h1>

          {/* Vertical Separator */}
          <div 
            className={`w-[1px] transition-all duration-1000 ease-out mt-8 ${textIndex > 3 ? 'h-16 opacity-100' : 'h-0 opacity-0'}`} 
            style={{ backgroundColor: colors.brightOrange }}
          />

          {/* Project Tagline */}
          <div className={`overflow-hidden transition-all duration-1000 ${textIndex === brandName.length ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-[11px] font-black uppercase tracking-[0.6em] mt-6" style={{ color: colors.brightOrange }}>
              Kishori Heights
            </p>
          </div>
        </div>

        {/* DATA-DRIVEN FOOTNOTE */}
        <div className={`absolute bottom-20 flex flex-col items-center transition-opacity duration-700 ${stage === 'reveal' ? 'opacity-0' : 'opacity-100'}`}>
           <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 mb-2">
             10+ Years of Expertise
           </p>
           <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] opacity-30" style={{ backgroundColor: colors.brightOrange }} />
              <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: colors.darkOrange }}>Defining Active Living</span>
              <span className="w-8 h-[1px] opacity-30" style={{ backgroundColor: colors.brightOrange }} />
           </div>
        </div>
      </div>

      {/* THE "LENS SHUTTER" REVEAL (Clean blackish curtains) */}
      <div className={`absolute inset-0 z-50 pointer-events-none flex`}>
        <div 
          className={`h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] w-1/2 origin-left ${stage === 'reveal' ? 'scale-x-0' : 'scale-x-1'}`} 
          style={{ backgroundColor: colors.blackish }}
        />
        <div 
          className={`h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] w-1/2 origin-right ${stage === 'reveal' ? 'scale-x-0' : 'scale-x-1'}`} 
          style={{ backgroundColor: colors.blackish }}
        />
      </div>

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}