"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, X, Phone, User, Sparkles, Lock, 
  CheckCircle2, ChevronDown, Clock, Mail, Briefcase, MapPin 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../lib/firebase";

const StickyContact = ({ isOpen, setIsOpen, hideSticky }) => { 
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "3 BHK",
    callTime: "9 AM to 12 PM", 
    utm_source: "direct",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: ""
  });

 useEffect(() => {
    const section = document.getElementById("highlights");
    if (!section) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;

      // Show if we have reached the section, stay visible for everything below it
      if (scrollY >= sectionTop - 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check position on mount

    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      utm_source: params.get("utm_source") || "direct",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || ""
    }));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendToWebhook = async (data) => {
    try {
      const payload = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        payload.append(key, value);
      });

      await fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzMTA0MzA1MjZkNTUzMjUxMzMi_pc", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });
      return true;
    } catch (err) {
      console.error("Webhook Error:", err);
      return false;
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifierSticky) {
      window.recaptchaVerifierSticky = new RecaptchaVerifier(auth, 'recaptcha-sticky-container', {
        'size': 'invisible'
      });
    }
  };

  const handleSendOtp = async () => {
    if (formData.phone.length < 10) return alert("Enter valid phone");
    setLoading(true);
    try {
      setupRecaptcha();
      const phoneNumber = `+91${formData.phone.replace(/\D/g, "")}`;
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifierSticky);
      setConfirmationResult(result);
      setIsOtpSent(true);
    } catch (error) {
      console.error(error);
      alert("Verification failed. Please retry.");
      if (window.recaptchaVerifierSticky) window.recaptchaVerifierSticky.clear();
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Enter OTP");
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      await sendToWebhook(formData);
      setSubmitted(true);
      setTimeout(() => navigate("/Info/Thankyou"), 1500);
    } catch (error) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "bg-transparent border-none outline-none text-xs font-medium placeholder:text-gray-400 w-full h-full";

  return (
    <>
      <div id="recaptcha-sticky-container"></div>

      {/* --- DESKTOP: MODERN FLOATING ISLAND --- */}
      <AnimatePresence>
        {isVisible && !submitted && !hideSticky && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 w-full z-[9999] hidden lg:flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto bg-[#041a14]/95 backdrop-blur-md text-white p-2 rounded-full shadow-2xl border border-white/10 flex items-center gap-2 max-w-6xl w-full mx-6 transition-all duration-500 hover:scale-[1.01]">
              
              <div className="flex items-center gap-3 pl-4 pr-6 border-r border-white/10 shrink-0">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#F2A71D]" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#F2A71D]">Site Visit</p>
                    <p className="text-[9px] opacity-60">Book Priority Slot</p>
                 </div>
              </div>

              <form onSubmit={handleVerify} className="flex-none flex items-center gap-2 px-2 ">
                <div className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center w-32 focus-within:bg-white/10 transition-colors shrink-0">
                   <User className="w-3 h-3 text-gray-400 mr-2" />
                   <input 
                     type="text" placeholder="Name" required disabled={isOtpSent}
                     className={inputClass}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                </div>

                <div className="h-10 pl-4 pr-1 rounded-full bg-white/5 border border-white/10 flex items-center w-40 focus-within:bg-white/10 transition-colors relative shrink-0">
                   <Phone className="w-3 h-3 text-gray-400 mr-2" />
                   <input 
                     type="tel" placeholder="Phone" required disabled={isOtpSent}
                     className={inputClass}
                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                   />
                   {!isOtpSent && formData.phone.length >= 10 && (
                     <motion.button
                       initial={{ scale: 0 }} animate={{ scale: 1 }}
                       type="button" onClick={handleSendOtp}
                       className="ml-2 bg-[#F36F21] text-white text-[9px] font-bold px-3 py-1.5 rounded-full hover:bg-[#D84315]"
                     >
                       OTP
                     </motion.button>
                   )}
                </div>

                <div className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center w-40 focus-within:bg-white/10 transition-colors shrink-0">
                   <Mail className="w-3 h-3 text-gray-400 mr-2" />
                   <input 
                     type="email" placeholder="Email" required disabled={isOtpSent}
                     className={inputClass}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                </div>

                <div className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center w-24 cursor-pointer hover:bg-white/10 shrink-0">
                   <select 
                     className={`${inputClass} bg-transparent cursor-pointer appearance-none text-white`}
                     onChange={(e) => setFormData({...formData, interest: e.target.value})}
                   >
                     <option className="text-black">3 BHK-Starting at @90L</option>
                      <option className="text-black">4 BHK-Starting at @1.15Cr</option>
                      <option className="text-black">Duplex-Starting at @1.65cr</option>
                   </select>
                   <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
                </div>

                <div className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center w-28 cursor-pointer hover:bg-white/10 shrink-0">
                   <select 
                     className={`${inputClass} bg-transparent cursor-pointer appearance-none text-white`}
                     onChange={(e) => setFormData({...formData, callTime: e.target.value})}
                   >
                     <option className="text-black">Morning</option>
                     <option className="text-black">Afternoon</option>
                     <option className="text-black">Evening</option>
                   </select>
                   <Clock className="w-3 h-3 text-gray-400 ml-1" />
                </div>

                <AnimatePresence>
                  {isOtpSent && (
                    <motion.div 
                      initial={{ width: 0, opacity: 0 }} 
                      animate={{ width: "90px", opacity: 1 }} 
                      className="overflow-hidden shrink-0"
                    >
                      <div className="h-10 px-4 rounded-full bg-[#F36F21]/20 border border-[#F36F21] flex items-center">
                         <Lock className="w-3 h-3 text-[#F36F21] mr-2" />
                         <input 
                           type="text" placeholder="OTP" required
                           className={`${inputClass} text-[#F36F21] font-bold placeholder:text-[#F36F21]/50`}
                           onChange={(e) => setOtp(e.target.value)}
                         />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" disabled={!isOtpSent || loading}
                 className="h-10 px-6 rounded-full bg-[#F36F21] hover:bg-[#D84315] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all disabled:bg-gray-300 disabled:text-black disabled:opacity-100 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(243,111,33,0.4)] shrink-0"
                >
                  {loading ? "..." : <>Confirm <Send className="w-3 h-3" /></>}
                </button>

                <button type="button" onClick={() => setIsVisible(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors ml-1 shrink-0">
                   <X className="w-4 h-4 text-white/50" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MOBILE: BOTTOM SHEET --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full bg-white rounded-t-[2.5rem] overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="bg-[#041a14] p-6 pb-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F36F21] blur-[60px] opacity-20" />
                <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 p-2 bg-white/10 rounded-full"><X className="w-5 h-5" /></button>
                <p className="text-[#F36F21] text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2"><Sparkles className="w-3 h-3" /> Priority Access</p>
                <h3 className="font-serif text-2xl">Request Callback</h3>
              </div>

              <div className="p-6 -mt-4 bg-white rounded-t-[2rem] relative z-10 space-y-4 pb-12">
                 <form onSubmit={handleVerify} className="space-y-4">
                   <div className="grid grid-cols-1 gap-4">
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Full Name" required className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 py-3.5 text-sm outline-none focus:border-[#F36F21]" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                     </div>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" placeholder="Email Address" required className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 py-3.5 text-sm outline-none focus:border-[#F36F21]" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                     </div>
                   </div>

                   {/* <div className="grid grid-cols-2 gap-3">
                     <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Profession" required className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 py-3.5 text-sm outline-none focus:border-[#F36F21]" onChange={(e) => setFormData({...formData, profession: e.target.value})} />
                     </div>
                     <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="number" placeholder="Pincode" required className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 py-3.5 text-sm outline-none focus:border-[#F36F21]" onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                     </div>
                   </div> */}

                   <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" placeholder="Phone Number" required disabled={isOtpSent} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-24 py-3.5 text-sm outline-none focus:border-[#F36F21]" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      {!isOtpSent && formData.phone.length >= 10 && (
                        <button type="button" onClick={handleSendOtp} className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#041a14] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">OTP</button>
                      )}
                   </div>

                   <AnimatePresence>
                      {isOtpSent && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden">
                           <div className="relative">
                             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F36F21]" />
                             <input type="text" placeholder="Enter OTP" required className="w-full bg-[#FFF4E6] border border-[#F36F21] rounded-xl pl-11 py-3.5 text-sm font-bold text-[#F36F21] outline-none" onChange={(e) => setOtp(e.target.value)} />
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none appearance-none" value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})}>
                          <option>3 BHK-Starting at @90L</option>
                      <option>4 BHK-Starting at @1.15Cr</option>
                      <option>Duplex-Starting at @1.65cr</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <div className="relative">
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none appearance-none" onChange={(e) => setFormData({...formData, callTime: e.target.value})}>
                          <option>Before 9 AM</option>
                          <option>9 AM to 12 PM</option>
                          <option>12 PM to 3 PM</option>
                          <option>3 PM to 5 PM</option>
                          <option>5 PM to 7 PM</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                   </div>

                   <button type="submit" disabled={!isOtpSent || loading} className="w-full py-4 rounded-xl bg-[#F36F21] text-white font-bold uppercase tracking-wide shadow-lg disabled:opacity-50">{loading ? "Verifying..." : "Confirm Request"}</button>
                 </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyContact;