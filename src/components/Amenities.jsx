"use client";

import React from "react";
import { 
  Train, Hospital, School, 
  ShoppingBag, GraduationCap, Compass, 
  Sparkles, Target, Zap, Waves, Award 
} from "lucide-react";

const Amenities = ({ onOpenPopup }) => {
  // Official Brand Palette
  const colors = {
    blackish: "#041a14",
    brightOrange: "#F2A71D",
    mediumOrange: "#E97323",
    darkOrange: "#D64B27",
    lightOrangeBG: "#F2A71D15", // Lighter transparent shade for badges
  };

  const connectivityData = [
    {
      category: "Transport",
      icon: <Train className="w-6 h-6" />,
      items: [
        { name: "Dibrugarh Railway Station", dist: "3.4 km" },
        { name: "ASTC Bus Stand", dist: "4.4 km" },
        { name: "Dibrugarh Airport", dist: "13 km" },
      ],
    },
    {
      category: "Healthcare",
      icon: <Hospital className="w-6 h-6" />,
      items: [
        { name: "Srishti Hospital & Research Centre", dist: "1.5 km" },
        { name: "Assam Medical College & Hospital", dist: "3.5 km" },
        { name: "Dibrugarh Cancer Centre", dist: "3.8 km" },
      ],
    },
    {
      category: "Schools",
      icon: <School className="w-6 h-6" />,
      items: [
        { name: "Little Flower High School", dist: "1.1 km" },
        { name: "St. Mary’s High School", dist: "1.2 km" },
        { name: "Don Bosco High School", dist: "2.8 km" },
      ],
    },
    {
      category: "University",
      icon: <GraduationCap className="w-6 h-6" />,
      items: [
        { name: "DHSK College", dist: "850 m" },
        { name: "St. Fernando College of Nursing", dist: "3.1 km" },
        { name: "Dibrugarh University", dist: "7.2 km" },
      ],
    },
    {
      category: "Leisure",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        { name: "Smart Shopping Mall", dist: "01 km" },
        { name: "Zudio", dist: "2.3 km" },
        { name: "Junction Mall", dist: "03 km" },
      ],
    },
    {
      category: "Attractions",
      icon: <Compass className="w-6 h-6" />,
      items: [
        { name: "Sri Jagannath Temple", dist: "Nearby" },
        { name: "Brahmaputra Point", dist: "Walking" },
        { name: "Tea Garden", dist: "Scenic" },
      ],
    },
  ];

  return (
    <section id="location" className="relative w-full bg-[#fafaf8] py-12 lg:py-24 overflow-hidden font-sans text-[#041a14]">

      {/* --- CUSTOM VECTOR ART --- */}
      <div className="absolute -right-20 top-20 w-[300px] h-[300px] pointer-events-none z-0 select-none opacity-20">
        <div className="relative w-full h-full">
            <div className="absolute inset-0 border-[40px] rounded-full animate-spin-slow" style={{ borderColor: `${colors.brightOrange}10` }} />
            <div className="absolute inset-10 border-[2px] border-dashed rounded-full animate-reverse-spin" style={{ borderColor: colors.brightOrange }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Waves className="w-20 h-20" style={{ color: colors.darkOrange }} />
            </div>
        </div>
      </div>

      <div className="absolute right-[15%] top-[20%] opacity-20 animate-pulse">
        <Target className="w-8 h-8" style={{ color: colors.darkOrange }} />
      </div>
      <div className="absolute left-[10%] bottom-[30%] opacity-20 animate-bounce">
        <Zap className="w-6 h-6" style={{ color: colors.brightOrange }} />
      </div>

      {/* FIXED: Increased z-index to 30 and adjusted bottom/left for visibility over cards */}
      <div className="absolute left-0 md:-left-12 -bottom-6 md:-bottom-12 w-[140px] md:w-[350px] pointer-events-none z-30 select-none rotate-6">
        <img src="/profile_1.png" alt="Design Element" className="w-full h-auto drop-shadow-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-24 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 lg:gap-4 text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] mb-6 lg:mb-10" style={{ color: colors.darkOrange }}>
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 animate-spin-slow" style={{ color: colors.brightOrange }} />
              Strategic Connectivity
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-[0.9] lg:leading-[0.8] tracking-tighter text-[#041a14]">
              In the Heart of <br />
              <span className="italic font-light" style={{ color: colors.darkOrange }}>Everything</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-20">
            <p className="text-[#041a14]/70 text-lg lg:text-xl font-medium leading-relaxed border-l-4 pl-6 lg:pl-8" style={{ borderLeftColor: colors.brightOrange }}>
              Subham Kishori Heights is strategically located in Dibrugarh, offering 
              effortless access to premier education, healthcare, and transport hubs.
            </p>
          </div>
        </div>

        {/* --- CONNECTIVITY GRID --- */}
        {/* FIXED: Added relative z-20 to ensure cards stay below the profile image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-12 gap-y-10 md:gap-y-12 lg:gap-y-12 relative z-0">
          {connectivityData.map((section, idx) => (
            <div key={idx} className="group relative">
              <div className="relative bg-white/40 backdrop-blur-sm p-8 rounded-[3rem] border border-transparent hover:border-gray-200 transition-all duration-500 hover:shadow-2xl">
                <div className="flex items-center justify-between gap-3 mb-8 border-b pb-6" style={{ borderBottomColor: `${colors.blackish}10` }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110" style={{ backgroundColor: colors.blackish, color: colors.brightOrange }}>
                    {section.icon}
                  </div>
                  <h3 className="font-serif text-3xl italic">{section.category}</h3>
                </div>

                <ul className="space-y-6">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex flex-col gap-2 group/item">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold tracking-tight text-[#041a14]/80 group-hover/item:text-[#041a14] transition-colors">
                            {item.name}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-sm border border-[#F2A71D30]" style={{ backgroundColor: colors.lightOrangeBG, color: colors.darkOrange }}>
                          {item.dist}
                        </span>
                      </div>
                      <div className="w-full h-[1px] relative overflow-hidden" style={{ backgroundColor: `${colors.blackish}05` }}>
                        <div className="absolute top-0 left-0 h-full w-0 transition-all duration-1000 ease-out group-hover:w-full" style={{ backgroundColor: colors.brightOrange }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin-reverse 8s linear infinite;
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
    </section>
  );
};

export default Amenities;