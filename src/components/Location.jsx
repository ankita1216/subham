"use client";

import React from "react";
import { MapPin } from "lucide-react";

export default function Location() {
  // Official Brand Palette
  const colors = {
    blackish: "#041a14",
    brightOrange: "#F2A71D",
    mediumOrange: "#E97323",
    darkOrange: "#D64B27",
  };

  return (
    <section id="location" className="w-full py-12 md:py-16 px-6 md:px-12 lg:px-24 font-sans" style={{ backgroundColor: colors.blackish }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Gap reduced to gap-8 for a tighter layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Header + Address + Home Types */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Header */}
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-3" style={{ color: colors.brightOrange }}>
                Strategically Positioned
              </p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-tight text-white">
                Project <br />
                <span className="italic font-light" style={{ color: colors.darkOrange }}>Location</span>
              </h2>
            </div>

            {/* Address Block */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4" style={{ color: colors.brightOrange }} />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-white">The Address</p>
              </div>
              <p className="text-xl md:text-2xl font-medium leading-tight text-white">
                Subham Kishori Heights, <br />
                Seujpur, Dibrugarh, <br />
                Assam - 786001
              </p>
            </div>
            
            {/* Home Types Block */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 text-white">Home Types</p>
              <div className="flex gap-6 text-xl font-serif italic mb-2" style={{ color: colors.brightOrange }}>
                <span>3 BHK</span>
                <span>4 BHK</span>
                <span>Duplex</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 text-white">
                B+G+14 · 65 Exclusive Homes
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Google Maps - Height Increased */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/10 group grayscale transition-all duration-700 hover:grayscale-0 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7079.215212334554!2d94.931217!3d27.481473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374099001efa57bd%3A0x663a1239c1e15167!2sSUBHAM%20KISHORI%20HEIGHTS!5e0!3m2!1sen!2sin!4v1770731429352!5m2!1sen!2sin"
                height="100%" 
                width="100%"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Subham Kishori Heights Location"
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </section>
  );
}