"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";

export default function MobileStickyCTA({ onClick, isVisible }) {
    const colors = {
        blackish: "#041a14",
        vibrantOrange: "#F36F21",
        deepOrange: "#D84315",
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden p-4 pb-5"
        >
            <div className="max-w-md mx-auto relative group">
                {/* Glassmorphism Background */}
                <div
                    className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-white/40 transition-all duration-500 group-hover:shadow-[0_-15px_50px_rgba(243,111,33,0.2)]"
                />

                {/* Button Content */}
                <div className="relative p-1">
                    <button
                        onClick={onClick}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold text-sm tracking-widest uppercase shadow-lg active:scale-[0.98] transition-all relative overflow-hidden group"
                        style={{
                            background: `linear-gradient(135deg, ${colors.vibrantOrange}, ${colors.deepOrange})`
                        }}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <Calendar className="w-5 h-5" />
                        <span className="relative z-10 flex items-center gap-2">
                            Schedule a Site Visit
                            <Sparkles className="w-3 h-3 text-white/70 animate-pulse" />
                        </span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
