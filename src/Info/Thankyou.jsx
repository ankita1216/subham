"use client";

import React, { useState, useEffect } from "react";
import { Download, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

export default function Thankyou() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Links
  const desktopBrochure = "https://subhamgroup.com/pdf/subham-kishori-heights-brohcure.pdf";
  const mobileBrochure = "/mobile brochure.pdf"; 

  // Color Palette
  const colors = {
    blackish: "#041a14",
    brightOrange: "#F2A71D",
    mediumOrange: "#E97323",
    white: "#ffffff",
  };

  useEffect(() => {
    // Detect device on mount
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      
      {/* 1. FULL SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/thankyou.jpg" 
          alt="Thank You Background" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 opacity-90"
          style={{ backgroundColor: colors.blackish }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>

      {/* --- LOGO PLACEMENT (Top Left) --- */}
      <Link to="/" className="absolute top-6 left-6 z-30 md:top-10 md:left-10 cursor-pointer hover:opacity-80 transition-opacity">
        <img 
          src="/Logo.png" 
          alt="Subham Group" 
          className="w-28 md:w-40 object-contain brightness-0 invert" 
        />
      </Link>

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-20 w-full max-w-4xl px-6 flex flex-col items-center justify-center text-center">
        
        {/* --- TOP: PROFILE 3 VECTOR --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-[#F2A71D] blur-[60px] opacity-20 rounded-full"></div>
          <img 
            src="/profile_3.png" 
            alt="Team Member" 
            className="relative w-40 md:w-56 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10" 
          />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -right-2 bottom-4 bg-white text-green-600 rounded-full p-2 shadow-xl z-20"
          >
            <CheckCircle2 className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* --- CENTER TEXT --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 tracking-tight text-white">
            Inquiry <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#F2A71D] to-[#E97323]">
              Received.
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Thank you for choosing Subham Kishori Heights. <br className="hidden md:block" />
            We have successfully recorded your interest.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full">
            
            {/* Download Brochure - DIRECT LOGIC IN HREF */}
            <a 
              href={isMobile ? mobileBrochure : desktopBrochure}
              target="_blank"
              rel="noopener noreferrer"
              // The 'download' attribute helps mobile browsers treat it as a file
              download={isMobile ? "Subham-Brochure.pdf" : undefined}
              className="group relative px-8 py-4 rounded-full font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              style={{ backgroundColor: colors.mediumOrange }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Download className="w-5 h-5 relative z-10" /> 
              <span className="relative z-10">Download Brochure</span>
            </a>

            {/* Back to Home (Arrow Button) */}
            <Link 
              to="/"
              className="group px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white hover:text-[#041a14] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 w-full text-center opacity-30 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.5em] text-white">Subham Group • Dibrugarh</span>
      </div>
    </section>
  );
}