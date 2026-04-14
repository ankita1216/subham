"use client";
import React, { useState, useEffect } from "react";
import { 
  X, Send, Phone, ShieldCheck, 
  Sparkles, CheckCircle2, 
  ChevronDown, User, Mail 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PopupSticky({ isOpen, setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const colors = {
    blackish: "#041a14",
    brightOrange: "#F2A71D",
    mediumOrange: "#E97323",
    darkOrange: "#D64B27",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "3 BHK-Starting at @90L",
    callTime: "Before 9 AM",
    utm_source: "direct",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: ""
  });

  // --- Capture UTM Parameters ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      utm_source: params.get("utm_source") || "direct_popup",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || ""
    }));
  }, []);

  const sendToWebhook = async (data) => {
    try {
      const payload = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => payload.append(key, value));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) return alert("Enter 10-digit phone");
    
    setLoading(true);
    try {
      await sendToWebhook(formData);
      setIsOpen(false);
      navigate("/Info/Thankyou");
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 md:py-3.5 outline-none focus:border-[#E97323] focus:ring-4 focus:ring-[#E97323]/5 transition-all text-sm font-medium";

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <div key="sticky-popup-v2" className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto bg-[#041a14]/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0"
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-3xl my-auto max-h-[90vh] overflow-y-auto no-scrollbar"
            >
               {/* Header */}
               <div className="p-6 md:p-8 pb-10 text-white relative overflow-hidden" style={{ backgroundColor: colors.blackish }}>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2A71D] opacity-10 blur-[80px] -mr-20 -mt-20" />
                  <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-20">
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] mb-4 text-[#F2A71D]">
                      <Sparkles className="w-4 h-4" /> Quick Connect
                    </div>
                    <h3 className="font-serif text-2xl md:text-4xl leading-tight">
                      Experience <br /> <span className="italic font-light text-[#F2A71D]">Subham Kishori Heights.</span>
                    </h3>
                  </div>
               </div>

               {/* Form */}
               <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-4 -mt-6 bg-white rounded-t-[3rem] relative z-10 pb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input placeholder="Full Name" required className={`${inputClass} pl-11`} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input type="email" placeholder="Email" required className={`${inputClass} pl-11`} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="tel"
                      placeholder="10-digit Phone" 
                      maxLength={10} 
                      required
                      className={`${inputClass} pl-11`} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select className={`${inputClass} appearance-none cursor-pointer`} value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})}>
                        <option>3 BHK-Starting at @90L</option>
                        <option>4 BHK-Starting at @1.15Cr</option>
                        <option>Duplex-Starting at @1.65cr</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className={`${inputClass} appearance-none cursor-pointer`} value={formData.callTime} onChange={(e) => setFormData({...formData, callTime: e.target.value})}>
                        <option>Before 9 AM</option>
                        <option>9 AM to 12 PM</option>
                        <option>12 PM to 3 PM</option>
                        <option>3 PM to 5 PM</option>
                        <option>5 PM to 7 PM</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className={`w-full py-4 md:py-5 rounded-2xl font-bold text-lg tracking-wide shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? "bg-gray-300 text-black cursor-not-allowed" : "bg-[#E97323] text-white hover:bg-[#D64B27]"}`}
                  >
                    {loading ? "Processing..." : <>Confirm Inquiry <Send className="w-5 h-5" /></>}
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-500" /> Secure RERA Verified Inquiry
                    </p>
                  </div>
               </form>
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