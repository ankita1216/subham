"use client";
import { useEffect } from "react";
import React, { useState } from "react";

// ✅ FIXED: Use 'react-router-dom' for Vite
import { useNavigate } from "react-router-dom"; 

import { 
  Send, MapPin, Phone, ShieldCheck, 
  Target, CheckCircle2, Sparkles, Lock,
  Home, Clock, ChevronDown, User, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../lib/firebase";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
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
    interest: "3 BHK", 
    callTime: "9 AM to 12 PM",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: ""
  });

  // Capture UTM parameters from URL on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      utm_source: params.get("utm_source") || "direct",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || ""
    }));
  }, []);

  // ==========================================
  // FIREBASE LOGIC
  // ==========================================
  
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          }
        }
      );
    }
  };

  const handleSendOtp = async () => {
    if (!formData.phone) return alert("Enter phone number");
    setLoading(true);

    try {
      setupRecaptcha();
      let cleaned = formData.phone.replace(/\D/g, "");
      if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);

      if (cleaned.length !== 10) {
        alert("Enter valid 10 digit phone number");
        setLoading(false);
        return;
      }

      const phoneNumber = `+91${cleaned}`;
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
      alert("OTP sent to " + phoneNumber);

    } catch (error) {
      console.error(error);
      alert(error.message || "Error sending OTP");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpSent) return alert("Please verify phone first");
    if (!otp || otp.length < 6) return alert("Please enter the 6-digit OTP");

    setLoading(true);

    try {
      await confirmationResult.confirm(otp);
      
      const payload = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
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

      setSubmitted(true);
      setTimeout(() => {
        navigate("/Info/Thankyou");
      }, 1500);

    } catch (error) {
      console.error("Submission Error:", error);
      alert("Invalid OTP or session expired. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#E97323] focus:ring-4 focus:ring-[#E97323]/10 transition-all duration-300 placeholder:text-gray-400 text-[#041a14] font-medium";

  return (
    <section id="contact" className="relative w-full bg-[#fafaf8] py-24 lg:py-40 overflow-hidden font-sans text-[#041a14]">
      <div id="recaptcha-container"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-[#041a14]/5">
          
          {/* LEFT SIDE */}
          <div className="lg:w-2/5 p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden" style={{ backgroundColor: colors.blackish }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E97323] opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-6" style={{ color: colors.brightOrange }}>
                <Sparkles className="w-3 h-3" /> Exclusive Inquiry
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                Your Future <br />
                <span className="italic font-light" style={{ color: colors.brightOrange }}>Among 65</span>
              </h2>
              <p className="text-white/70 text-base lg:text-lg font-medium leading-relaxed max-w-xs">
                Subham Kishori Heights offers a lifestyle-focused residential experience in the heart of Dibrugarh.
              </p>
            </div>

            <div className="space-y-6 pt-10 relative z-10">
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <MapPin className="w-4 h-4" style={{ color: colors.brightOrange }} /> Seujpur, Dibrugarh
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Form) */}
          <div className="lg:w-3/5 p-8 lg:p-16 flex flex-col justify-center bg-white relative">
            {!submitted ? (
              <form onSubmit={handleFinalSubmit} className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="text" required placeholder="Name" className={`${inputStyle} pl-11`}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="email" required placeholder="Email" className={`${inputStyle} pl-11`}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Profession</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="text" required placeholder="Profession" className={`${inputStyle} pl-11`}
                        onChange={(e) => setFormData({...formData, profession: e.target.value})}
                      />
                    </div> */}
                  {/* </div> */}
                  {/* <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Pincode</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="number" required placeholder="Pincode" className={`${inputStyle} pl-11`}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      />
                    </div>
                  </div>
                </div> */}

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="tel" required placeholder="10-digit mobile" disabled={isOtpSent}
                      className={`${inputStyle} pl-11 pr-28`} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    {formData.phone.length >= 10 && !isOtpSent && (
                      <button 
                        type="button" onClick={handleSendOtp} disabled={loading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#041a14] text-[#F2A71D] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide"
                      >
                        {loading ? "..." : "Get OTP"}
                      </button>
                    )}
                    {isOtpSent && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600"><CheckCircle2 className="w-5 h-5" /></div>}
                  </div>
                </div>

                <AnimatePresence>
                  {isOtpSent && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Verification Code</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" required placeholder="Enter OTP" className={`${inputStyle} pl-11`}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Interested In</label>
                    <select className={`${inputStyle} appearance-none cursor-pointer`} value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})}>
                      <option>3 BHK-Starting at @90L</option>
                      <option>4 BHK-Starting at @1.15Cr</option>
                      <option>Duplex-Starting at @1.65cr</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Best Time to Call</label>
                    <select className={`${inputStyle} appearance-none cursor-pointer`} value={formData.callTime} onChange={(e) => setFormData({...formData, callTime: e.target.value})}>
                        <option>Before 9 AM</option>
                        <option>9 AM to 12 PM</option>
                        <option>12 PM to 3 PM</option>
                        <option>3 PM to 5 PM</option>
                        <option>5 PM to 7 PM</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-[70%] -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!isOtpSent || loading}
                  className={`w-full py-5 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
                    !isOtpSent || loading
                    ? "bg-gray-300 text-black cursor-not-allowed opacity-100"
                    : "bg-[#E97323] text-white hover:bg-[#d64b27] hover:-translate-y-1"
                  }`}
                >
                  {loading ? "Processing..." : <>Confirm Inquiry <Send className="w-5 h-5" /></>}
                </button>

                <div className="text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> Secure RERA Verified Inquiry
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center h-full flex flex-col items-center justify-center p-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-3xl font-serif font-medium mb-3">Thank You!</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}