"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Star, X, Sparkles, User, Mail, Phone as PhoneIcon, Lock, CheckCircle2, Send, Briefcase, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../lib/firebase";

// --- INTERNAL CONTACT MODAL COMPONENT ---
function ContactModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const colors = {
    blackish: "#0b1c14",
    brightOrange: "#F2A71D",
  };

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", profession: "", pincode: "", interest: "3 BHK", callTime: "9 AM to 12 PM", utm_source: "direct",
  });

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
    }
  };

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) return alert("Enter valid 10-digit phone number");
    setLoading(true);
    try {
      setupRecaptcha();
      const phoneNumber = `+91${formData.phone.replace(/\D/g, "")}`;
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
    } catch (error) {
      alert("Error sending OTP.");
      if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
    } finally { setLoading(false); }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpSent) return handleSendOtp();
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      const payload = new URLSearchParams(formData);
      await fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzMTA0MzA1MjZkNTUzMjUxMzMi_pc", {
        method: "POST", mode: "no-cors", body: payload.toString(),
      });
      setSubmitted(true);
      setTimeout(() => navigate("/Info/Thankyou"), 1500);
    } catch (error) { alert("Invalid OTP."); } finally { setLoading(false); }
  };

  const inputStyle = "w-full bg-white border border-gray-100 rounded-xl px-9 md:px-10 py-2.5 md:py-3 outline-none focus:ring-2 focus:ring-[#F2A71D]/10 transition-all placeholder:text-gray-400 text-gray-700 shadow-sm text-xs md:text-sm";
  const iconStyle = "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300";

  return (
    <div className="relative w-full max-w-[92vw] md:max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden font-sans border border-gray-100 mx-auto">
      <div id="recaptcha-container"></div>
      <div className="p-5 md:p-6 pb-10 text-white relative" style={{ backgroundColor: colors.blackish }}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2 text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: colors.brightOrange }}>
            <Sparkles className="w-3 h-3" /> Quick Connect
          </div>
          <button onClick={onClose} className="p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        <h2 className="text-white font-serif text-2xl md:text-3xl leading-tight">Experience <span className="italic font-light block" style={{ color: colors.brightOrange }}>Subham Kishori Heights.</span></h2>
      </div>
      <div className="px-4 md:px-8 pb-6 md:pb-8 mt-2 relative z-10">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl border border-gray-50">
          {!submitted ? (
            <form onSubmit={handleFinalSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <User className={iconStyle} />
                  <input type="text" placeholder="Name" required className={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="relative">
                  <Mail className={iconStyle} />
                  <input type="email" placeholder="Email" required className={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <Briefcase className={iconStyle} />
                  <input type="text" placeholder="Profession" required className={inputStyle} onChange={(e) => setFormData({...formData, profession: e.target.value})} />
                </div>
                <div className="relative">
                  <MapPin className={iconStyle} />
                  <input type="number" placeholder="Pincode" required className={inputStyle} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                </div>
              </div> */}
              <div className="relative">
                <PhoneIcon className={iconStyle} />
                <input type="tel" placeholder="10-digit Phone" required className={inputStyle} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                {formData.phone.length >= 10 && !isOtpSent && (
                  <button type="button" onClick={handleSendOtp} className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-[#F2A71D] bg-[#0b1c14] px-2.5 py-1.5 rounded-lg hover:bg-black transition-all">Verify</button>
                )}
              </div>
              <AnimatePresence>
                {isOtpSent && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="relative overflow-hidden">
                    <Lock className={iconStyle} />
                    <input type="text" placeholder="Enter OTP" required className={inputStyle} onChange={(e) => setOtp(e.target.value)} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select className={`${inputStyle} appearance-none cursor-pointer`} onChange={(e) => setFormData({...formData, interest: e.target.value})}>
                    <option>3 BHK-Starting at @90L</option>
                    <option>4 BHK-Starting at @1.15Cr</option>
                    <option>Duplex-Starting at @1.65cr</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className={`${inputStyle} appearance-none cursor-pointer`} onChange={(e) => setFormData({...formData, callTime: e.target.value})}>
                    <option>Before 9 AM</option>
                    <option>9 AM to 12 PM</option>
                    <option>12 PM to 3 PM</option>
                    <option>3 PM to 5 PM</option>
                    <option>5 PM to 7 PM</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all ${isOtpSent ? "bg-[#0b1c14] text-white hover:bg-black hover:-translate-y-0.5" : "bg-gray-200 text-black cursor-not-allowed opacity-100"}`}>
                {loading ? "..." : isOtpSent ? "Confirm Inquiry" : "Send Verification"} <Send className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> Secure Rera Verified
              </div>
            </form>
          ) : ( 
            <div className="py-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <h3 className="text-lg font-serif">Thank You!</h3>
            </div> 
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN HERO SECTION ---
export default function HeroSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // If mobile, don't run any popup logic
    if (isMobile) return;

    // Logic for Desktop (Exit Intent)
    const handleMouseLeave = (e) => {
      // Trigger ONLY when mouse moves above the top edge (clientY <= 5)
      if (e.clientY <= 5 && !hasShown) {
        setIsPopupOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const colors = {
    blackish: "#041a14",      
    vibrantOrange: "#F36F21", 
    goldenYellow: "#F4B400",  
    deepOrange: "#D84315",    
    warmCream: "#FFF4E6",     
    premiumVanilla: "#FFF9F0",
  };

  return (
    <>
      <section id="hero" className="w-full min-h-screen bg-white px-4 py-6 md:px-8 lg:px-12 flex flex-col font-sans">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="rounded-[3rem] p-12 md:p-16 lg:p-20 flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ backgroundColor: colors.blackish }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F36F21]/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter relative z-10 text-white">
              Experience The  <br />New Way Of <span className="italic font-light" style={{ color: colors.vibrantOrange }}>Active</span> Living
            </h1>
            <p className="mt-8 text-white/60 text-lg max-w-md font-medium leading-relaxed relative z-10">
              Discover Subham Kishori Heights—Dibrugarh’s first "Active Lifestyle" landmark designed for 65 exclusive families.
            </p>
            <div className="mt-12 flex flex-col items-center gap-6 relative z-10">
              <button onClick={scrollToAbout} className="flex items-center gap-2 px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-2xl text-white group" style={{ backgroundColor: colors.deepOrange }}>
                Discover the Ascent <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full h-full min-h-[300px] sm:min-h-[350px] rounded-[3rem] overflow-hidden group shadow-sm"
          >
            <img src="/night.jpeg" alt="Subham Kishori Heights" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10" />
            
            {/* UPDATED PREMIUM BADGE - Adjusted mobile positioning (bottom-2) */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-2 right-4 md:bottom-10 md:right-10 
                backdrop-blur-xl border border-white/20
                flex flex-col items-center justify-center text-center
                -rotate-12 transition-all duration-300 hover:scale-110 hover:rotate-0 z-20 overflow-hidden" 
              style={{ 
                height: "100px",
                width: "100px",
                borderRadius: "35% 65% 68% 32% / 41% 33% 67% 59%",
                background: `linear-gradient(135deg, ${colors.deepOrange}ee, ${colors.vibrantOrange}dd)`,
                boxShadow: "0 10px 30px -5px rgba(216, 67, 21, 0.4)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center leading-none text-white">
                <Star className="w-3 h-3 mb-1 fill-white animate-pulse" />
                <span className="block text-[9px] md:text-[10px] uppercase font-black tracking-widest opacity-80 mb-1">Starting at</span>
                <div className="flex items-baseline">
                  <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter">90</span>
                  <span className="text-[10px] md:text-[12px] font-bold ml-0.5">LAC</span>
                </div>
                <div className="w-6 h-0.5 bg-white/40 mt-1 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPopupOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full flex justify-center items-center max-h-[95vh] overflow-y-auto no-scrollbar">
              <ContactModal onClose={() => setIsPopupOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}