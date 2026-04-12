"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, Building2, Activity } from "lucide-react";

const colors = {
  blackish: "#041a14",
  vibrantOrange: "#F36F21",
  goldenYellow: "#F4B400",
  darkOrange: "#D64B27",
  deepOrange: "#D84315",
  warmCream: "#FFF4E6",
  brightOrange: "#F2A71D",
};

const MASTER_PLAN = {
  id: 0,
  name: "MASTER PLAN",
  tag: "", 
  src: "/Master Plan.jpg",
};

const PLANS = [
  { id: 1, name: "BLOCK-A", tag: "UNIT-A", src: "/BLOCK-A.jpg" },
  { id: 2, name: "BLOCK A", tag: "UNIT-B | TYPE 1", src: "/BLOCK A UNIT B TYPE 1.jpg" },
  { id: 3, name: "BLOCK A ", tag: "UNIT-B | TYPE 2", src: "/BLOCK A UNIT 1 TYPE 2.jpg" },
  { id: 4, name: "BLOCK A", tag: "UNIT-B | TYPE 3", src: "/BLOCK A TYPE 3.jpg" },
  { id: 5, name: "BLOCK A", tag: "UNIT-B (DUPLEX) | LOWER FLOOR", src: "/BLOCK A 13TH FLOOR.jpg" },
  { id: 6, name: "BLOCK A", tag: "UNIT-B (DUPLEX) | UPPER FLOOR", src: "/BLOCK A 14TH FLOOR.jpg" },
  { id: 7, name: "BLOCK B ", tag: "UNIT-C", src: "/BLOCK B UNIT C.jpg" },
  { id: 8, name: "BLOCK B ", tag: "UNIT-D | TYPE 1", src: "/BLOCK B UNIT D.jpg" },
  { id: 9, name: "BLOCK B ", tag: "UNIT-D | TYPE 2", src: "/BLOCK B UNIT 2 TYPE 2.jpg" },
  { id: 10, name: "BLOCK B", tag: "UNIT-E", src: "/BLOCK B UNIT E.jpg" },
  { id: 11, name: "BLOCK B ", tag: "UNIT-F (DUPLEX) | LOWER FLOOR", src: "/BLOCK B UNIT F.jpg" },
  { id: 12, name: "BLOCK B ", tag: "UNIT-F (DUPLEX) | UPPER FLOOR", src: "/BLOCK B UNIT F UPPER FLOOR.jpg" },
  { id: 13, name: "BLOCK B ", tag: "UNIT-G (DUPLEX) | LOWER FLOOR", src: "/BLOCK B UNIT G.jpg" },
  { id: 14, name: "BLOCK B ", tag: "UNIT-G (DUPLEX) | UPPER FLOOR", src: "/BLOCK B UNIT G UPPER FLOOR.jpg" },
  { id: 15, name: "BLOCK B", tag: "UNIT-H (DUPLEX) | LOWER FLOOR", src: "/BLOCK B UNIT H LOWER FLOOR.jpg" },
  { id: 16, name: "BLOCK B", tag: "UNIT-H (DUPLEX) | UPPER FLOOR", src: "/BLOCK H UPPER FLOOR.jpg" },
];

function Modal({ plan, onClose }) {
  const [scale, setScale] = useState(1);
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
        style={{ background: "rgba(4,26,20,0.88)", backdropFilter: "blur(6px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="flex flex-col rounded-2xl overflow-hidden w-full max-w-4xl"
          style={{ background: "#fff", maxHeight: "90vh" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b gap-4" style={{ background: colors.warmCream }}>
            <div className="flex items-center min-w-0 flex-1 gap-2">
              <span className="text-sm font-bold text-[#041a14] whitespace-nowrap flex-shrink-0">{plan.name}</span>
              {plan.tag && <span className="text-sm font-normal opacity-50 whitespace-nowrap overflow-hidden text-ellipsis">| {plan.tag}</span>}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-black/5 text-xl hover:bg-black/10 transition-colors">✕</button>
          </div>
          
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-[#f5ece0] relative group">
            <motion.img 
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={plan.src} 
              alt={plan.name} 
              className="max-w-full max-h-[70vh] object-contain origin-center" 
            />
          </div>

          <div className="flex items-center justify-center gap-6 py-4 border-t" style={{ background: colors.warmCream }}>
            <button onClick={handleZoomOut} className="p-3 border rounded-full hover:bg-white transition-all bg-black/5 flex items-center justify-center shadow-sm">
              <ZoomOut className="w-6 h-6 text-[#041a14]" />
            </button>
            <button onClick={handleZoomIn} className="p-3 border rounded-full hover:bg-white transition-all bg-black/5 flex items-center justify-center shadow-sm">
              <ZoomIn className="w-6 h-6 text-[#041a14]" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PlanCard({ plan, index, onClick, isMaster }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl overflow-hidden border border-black/5 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 w-full ${isMaster ? 'max-w-4xl' : ''}`}
    >
      <div className={`bg-[#f8f0e6] p-4 flex items-center justify-center group ${isMaster ? 'aspect-video' : 'aspect-[4/3]'}`}>
        <img src={plan.src} alt={plan.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div className="p-4 flex items-center justify-between gap-1 overflow-hidden">
        <h4 className="text-sm font-bold text-[#041a14] whitespace-nowrap flex-shrink-0">
          {plan.name.trim()}
        </h4>
        {plan.tag && (
          <span className="text-[11px] md:text-[9px] leading-tight font-bold px-2 py-1 text-orange-700 whitespace-nowrap overflow-hidden text-ellipsis min-w-0 flex-1 text-right">
            {plan.tag}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function PlanningSection() {
  const [activeTab, setActiveTab] = useState("Master Plan");
  const [activeSubTab, setActiveSubTab] = useState("All");
  const [activeId, setActiveId] = useState(null);

  const filteredPlans = useMemo(() => {
    if (activeTab === "Master Plan") return [MASTER_PLAN];
    const blockKeyword = activeTab.toUpperCase(); 
    let list = PLANS.filter(p => 
      p.name.toUpperCase().replace(/-/g, " ").includes(blockKeyword)
    );
    if (activeSubTab !== "All") {
      list = list.filter(p => {
        const tag = p.tag.toUpperCase();
        const subTab = activeSubTab.toUpperCase();
        const isDuplex = tag.includes("DUPLEX");
        if (subTab === "UNIT-B") return tag.startsWith("UNIT-B") && !isDuplex;
        if (subTab.includes("DUPLEX")) {
          const unit = subTab.split(" ")[0]; 
          return tag.startsWith(unit) && isDuplex;
        }
        return tag.startsWith(subTab);
      });
    }
    return list;
  }, [activeTab, activeSubTab]);

  const subTabs = useMemo(() => {
    if (activeTab === "Master Plan") return [];
    const blockKeyword = activeTab.toUpperCase();
    const currentBlockPlans = PLANS.filter(p => p.name.toUpperCase().includes(blockKeyword));
    
    const types = new Set(["All"]);
    currentBlockPlans.forEach(p => {
      if (p.tag.includes("|")) types.add(p.tag.split("|")[0].trim());
      else if (p.tag.includes("DUPLEX")) types.add("Duplex");
      else types.add(p.tag.split(" ")[0]);
    });
    return Array.from(types);
  }, [activeTab]);

  const activePlan = activeId === 0 ? MASTER_PLAN : PLANS.find(p => p.id === activeId);

  return (
    <>
      <section id="plan" style={{ background: colors.warmCream, padding: "80px 16px" }}>
        <div className="text-center mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-4" style={{ color: colors.darkOrange }}>Layouts & Architecture</p>
          <h2 className="font-serif text-5xl md:text-7xl text-[#041a14] mb-12">Explore Our <br /><span className="italic font-light" style={{ color: colors.darkOrange }}>Planning Designs</span></h2>
          <p className="text-sm md:text-base text-[#041a14]/70 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our 3 & 4 BHK residences and duplex homes, designed for comfort, privacy, and style. 
            Smart layouts ensure natural light, ventilation, and practical living for modern families.
          </p>
          <div className="grid grid-cols-3 gap-2 mb-8 md:flex md:justify-center md:gap-3">
            {["Master Plan", "Block A", "Block B"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setActiveSubTab("All"); }}
                className={`text-center px-2 py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all border-2 md:px-8 ${
                  activeTab === tab
                    ? "bg-[#041a14] text-white border-[#041a14]"
                    : "bg-transparent text-[#041a14]/50 border-[#041a14]/10 hover:border-[#041a14]/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {subTabs.length > 1 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 px-4">
                {subTabs.map(sub => (
                  <button 
                    key={sub} 
                    onClick={() => setActiveSubTab(sub)} 
                    className={`text-xs uppercase tracking-[0.2em] font-bold pb-1 border-b-2 transition-all ${activeSubTab === sub ? "border-orange-500 text-orange-600" : "border-transparent text-black/30 hover:text-black/60"}`}
                  >
                    {sub}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`max-w-[1200px] mx-auto mb-20 md:mb-32 ${
          activeTab === "Master Plan" 
            ? 'flex justify-center px-4' 
            : activeTab === "Block A" && activeSubTab === "All"
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
        }`}>
          {filteredPlans.map((plan, i) => (
            <div key={plan.id} className={activeTab === "Master Plan" ? 'w-full max-w-4xl' : ''}>
              <PlanCard 
                plan={plan} 
                index={i} 
                onClick={() => setActiveId(plan.id)} 
                isMaster={activeTab === "Master Plan"} 
              />
            </div>
          ))}
        </div>

        {/* --- ARCHITECTURAL VISION --- */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // Changed mobile height to min-h-auto to allow content to fit, and fixed crop by prioritizing object-top
            className="relative rounded-[2.5rem] md:rounded-[5rem] overflow-hidden min-h-[520px] md:h-[600px] lg:h-[700px] group shadow-2xl flex flex-col justify-end" 
            style={{ backgroundColor: colors.blackish }}
          >
            <img 
              src="/why.jpg" 
              alt="Subham Kishori Heights Architecture" 
              // FIXED: object-top prevents the building facade from being cut off at the top
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 opacity-70"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#041a14] via-[#041a14]/40 to-transparent"></div>
            
            <div className="relative z-10 p-6 md:p-20 flex flex-col justify-end h-full">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-12">
                
                <div className="max-w-2xl w-full text-left">
                  <div className="w-12 md:w-20 h-1 mb-4 md:mb-8" style={{ backgroundColor: colors.brightOrange }}></div>
                  <h3 className="font-serif text-3xl md:text-6xl text-white mb-3 md:mb-8 leading-tight">
                    Architecture <br/> 
                    <span className="italic font-light" style={{ color: colors.brightOrange }}>in Harmony</span>
                  </h3>
                  <p className="text-white/90 text-base md:text-xl leading-relaxed font-light mb-6 lg:mb-0">
                    Modern high-rise towers with clean vertical lines and a well-lit facade. 
                    Thoughtful space planning ensures natural light and open views for all 
                    65 exclusive residences.
                  </p>
                </div>
                
                <div className="flex flex-row w-full lg:w-auto gap-3 md:gap-6">
                   <div className="flex-1 lg:flex-none bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 text-white text-center">
                      <Building2 className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-2 md:mb-4" style={{ color: colors.brightOrange }} />
                      <p className="text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-60 mb-0.5">Structure</p>
                      <p className="text-sm md:text-xl font-serif">2 Towers</p>
                   </div>
                   <div className="flex-1 lg:flex-none bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 text-white text-center">
                      <Activity className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-2 md:mb-4" style={{ color: colors.brightOrange }} />
                      <p className="text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-60 mb-0.5">Elevation</p>
                      <p className="text-sm md:text-xl font-serif">B+G+14</p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {activeId !== null && activePlan && (
          <Modal
            plan={activePlan}
            onClose={() => setActiveId(null)}
          />
        )}
      </section>

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}