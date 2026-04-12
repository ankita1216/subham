"use client";

import React from 'react';
import { Building2, Activity, Users, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ActiveLivingShowcase = () => {
  
  // Color Palette
  const colors = {
    blackish: "#041a14",
    brightOrange: "#F2A71D",
    mediumOrange: "#E97323",
    darkOrange: "#D64B27",
  };

  const cardData = [
    { 
      title: "For Families", 
      tag: "COMMUNITY BONDING",
      desc: "Space efficiency and open panoramic views to nurture modern community living and relationships.",
      icon: <Users className="w-6 h-6" style={{ color: colors.brightOrange }} />,
      bg: "text-white shadow-2xl z-10",
      customBg: colors.blackish,
      isHighlighted: true
    },
    { 
      title: "For Children", 
      tag: "ENERGY & PLAY",
      desc: "Designed to spark movement and physical growth through active, purposeful play environments.",
      icon: <Sparkles className="w-6 h-6" style={{ color: "#fff" }} />,
      bg: "bg-white border border-gray-100 text-white",
      customBg: null
    },
    { 
      title: "For Seniors", 
      tag: "WELLNESS & CALM",
      desc: "Emotional grounding and calm aesthetics curated for a healthy, dignified, and energetic lifestyle.",
      icon: <Heart className="w-6 h-6" style={{ color: colors.blackish }} />,
      bg: "text-white",
      customBg: "#D48806",
    }
  ];

  return (
    <section id="highlights" className="w-full bg-[#fafaf8] pt-0 pb-10 px-4 md:px-12 lg:px-24 font-sans text-[#041a14]">
      
      {/* --- MULTI-GENERATIONAL FOCUS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 lg:mb-24">
        {cardData.map((item, idx) => (
          <motion.div 
            key={idx} 
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`${item.bg} cursor-pointer rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 flex flex-col min-h-[380px] md:h-[450px] justify-between group transition-all duration-500 ${item.isHighlighted ? 'md:scale-105' : ''}`}
            style={
              item.title === "For Children"
              ? {
                  backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/children.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }
              : item.customBg
              ? { backgroundColor: item.customBg }
              : {}
            }
          >
            {/* Updated Icon Container: Uses glassmorphism for visibility on all backgrounds */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-transform group-hover:rotate-12">
              {item.icon}
            </div>
            
            <div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest mb-3 block ${
                  item.title === "For Children" ? "text-white" : ""
                }`}
              >
                {item.tag}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl mb-4 md:mb-6">{item.title}</h3>
              <p className="text-base leading-relaxed opacity-80 font-medium">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      
    </section>
  );
};

export default ActiveLivingShowcase;