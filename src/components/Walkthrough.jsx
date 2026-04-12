"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Play, Pause, X, Volume2, VolumeX, 
  ArrowUpRight, ArrowRight, Sparkles, Building2, 
  Trees, ShieldCheck 
} from "lucide-react";

export default function Walkthrough() {
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const colors = {
    blackish: "#041a14",
    brightOrange: "#F2A71D",
    mediumOrange: "#E97323",
    darkOrange: "#D64B27",
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setIsMuted(false);
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleExit = () => {
    setIsActive(false);
    setIsPlaying(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0; 
  };

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section 
      id="video" 
      className={`relative w-full overflow-hidden font-sans transition-all duration-700
        ${isMobile ? "h-auto mt-10" : "h-screen min-h-[750px] mt-20"}`} 
      style={{ backgroundColor: colors.blackish }}
    >
      {/* STAGE 1: CINEMATIC MASK */}
      <div 
        className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-1000 ease-in-out
          ${isActive ? "opacity-0 pointer-events-none scale-110" : "opacity-100"}`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        {/* Placeholder for Mobile to maintain height before video loads */}
        {isMobile && !isActive && (
           <div className="absolute inset-0 w-full h-full bg-black/20 aspect-video lg:aspect-auto" />
        )}

        <div className="relative z-0 text-center flex flex-col items-center px-4">
          <button 
            onClick={handleStart}
            // FIXED: Scaled down icon size for mobile specifically
            className={`group relative flex items-center justify-center mb-6 md:mb-10 ${isMobile ? "w-16 h-16" : "w-32 h-32 md:w-44 md:h-44"}`}
          >
            <div className="absolute inset-0 rounded-full border animate-ping" style={{ borderColor: `${colors.brightOrange}30` }} />
            <div className="absolute inset-2 rounded-full border animate-pulse" style={{ borderColor: `${colors.brightOrange}50` }} />
            
            <div className="w-full h-full rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-2xl" style={{ backgroundColor: colors.brightOrange, color: colors.blackish }}>
              <Play className={`${isMobile ? "w-6 h-6" : "w-12 h-12"} fill-current ml-1 md:ml-2`} />
            </div>
          </button>
          
          {/* FIXED: Scaled down font size for mobile specifically */}
          <h2 className={`font-serif text-white italic leading-none mb-4 md:mb-6 ${isMobile ? "text-2xl" : "text-5xl md:text-8xl"}`}>
            Witness the <br /> <span className="not-italic font-bold uppercase tracking-tighter" style={{ color: colors.brightOrange }}>Ascent</span>
          </h2>
          <p className={`${isMobile ? "text-[7px]" : "text-[10px]"} font-black uppercase tracking-[0.6em] text-white/50`}>
            Click to start the immersive walkthrough
          </p>
        </div>
      </div>

      {/* STAGE 2: THE SPLIT THEATER */}
      <div className={`flex w-full ${isMobile ? "h-auto" : "h-full"}`}>
        <div className={`relative transition-all duration-1000 ease-[cubic-bezier(0.2,0,0,1)] 
          ${isActive ? "w-full lg:w-[78%]" : "w-full"}
          ${isMobile ? "h-auto" : "h-full"}`}>
          
          <video
            key={isMobile ? "mobile" : "desktop"}
            ref={videoRef}
            loop
            muted={isMuted}
            playsInline
            className={`w-full ${isMobile ? "h-auto object-contain aspect-video" : "h-full object-contain"}`}
            style={{ display: 'block' }}
          >
            <source 
              src={isMobile ? "/mobile-walkthrough.mp4" : "https://subhamgroup.com/video/SubhamKishoriHeights.mp4"} 
              type="video/mp4" 
            />
          </video>

          {/* CONTROLS OVERLAY */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 
            flex gap-3 md:gap-4 flex-wrap justify-center w-[95%]
            transition-opacity duration-1000 
            ${isActive ? "opacity-100" : "opacity-0"}`}>
            
            <button 
              onClick={togglePlay}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4 md:w-5 h-5" /> : <Play className="w-4 h-4 md:w-5 h-5 ml-1" />}
            </button>

            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all"
            >
              {isMuted ? <VolumeX className="w-4 h-4 md:w-5 h-5" /> : <Volume2 className="w-4 h-4 md:w-5 h-5" />}
            </button>

            <button 
              onClick={handleExit}
              className="px-4 md:px-6 h-10 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2"
            >
              <X className="w-3 h-3 md:w-4 md:h-4" /> Exit
            </button>
          </div>
        </div>

        {/* SIDEBAR (Desktop Only) */}
        <div className={`relative h-full bg-[#fafaf8] transition-all duration-1000 ease-[cubic-bezier(0.2,0,0,1)] 
          hidden lg:flex flex-col
          ${isActive ? "lg:w-[22%] opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
          
          <div className="p-6 lg:p-8 flex flex-col h-full justify-between text-[#041a14]">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] mb-12" style={{ color: colors.darkOrange }}>
                <Sparkles className="w-4 h-4" style={{ color: colors.brightOrange }} />
                Visual Tour
              </div>
              
              <h3 className="font-serif text-2xl lg:text-3xl mb-16 italic leading-tight">
                Architectural <br /> Verticality.
              </h3>

              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <Building2 className="w-5 h-5 mt-1 shrink-0" style={{ color: colors.brightOrange }} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Scale</p>
                    <p className="text-xs font-bold">B+G+14 Modern Towers</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={scrollToContact}
              className="group w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform shadow-lg"
              style={{ backgroundColor: colors.blackish, color: colors.brightOrange }}
            >
              Book Site Visit <ArrowUpRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}