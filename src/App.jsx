"use client";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Components
import Intro from "./components/Intro";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutProject from "./components/AboutProject";
import Amenities from "./components/Amenities";
import Why from "./components/Why";
import Location from "./components/Location";
import Plan from "./components/Plan";
import Walkthrough from "./components/Walkthrough";
import Gallery from "./components/Gallery";
import Highlights from "./components/Highlights";
import Contact from "./components/Contact";
import PopupSticky from "./components/PopupSticky";
import StickyContact from "./components/StickyContact";
import MobileStickyCTA from "./components/MobileStickyCTA";
import ThankYouSection from "./components/ThankYou";
import ThankyouPage from './Info/Thankyou';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Modal States
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [hideSticky, setHideSticky] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const walkthroughRef = useRef(null);

  // ✅ SCROLL LISTENER: Handles Hero visibility and Walkthrough hiding
  useEffect(() => {
    const handleScroll = () => {
      // 1. Check Hero visibility for MobileStickyCTA
      const hero = document.getElementById("hero");
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        // If the bottom of the hero is above the viewport (heroRect.bottom <= 0), 
        // it means we've scrolled past it.
        setPastHero(heroRect.bottom <= 0);
      }

      // 2. Check Walkthrough visibility for StickyContact
      if (!walkthroughRef.current) return;
      const rect = walkthroughRef.current.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= 0) {
        setHideSticky(true);
      } else {
        setHideSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactTrigger = () => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(true);
    } else {
      setIsPopupOpen(true);
    }
  };

  return (
    <>
      {showIntro ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="animate-in fade-in duration-1000 ease-in-out">
          <Routes>
            <Route
              path="/"
              element={
                <div className="w-full overflow-x-hidden relative">
                  <Header onOpenPopup={handleContactTrigger} />

                  {/* Pass trigger to Hero & About */}
                  <Hero onOpenPopup={handleContactTrigger} />
                  <AboutProject onOpenPopup={handleContactTrigger} />



                  <Why />
                  <Highlights />
                  {/* ✅ Attach Ref here to track position */}
                  <div ref={walkthroughRef}>
                    <Walkthrough />
                  </div>
                  <Gallery />
                  <Plan />
                  <Amenities onOpenPopup={handleContactTrigger} />

                  <Location />


                  <Contact />
                  <ThankYouSection />

                  <PopupSticky
                    isOpen={isPopupOpen}
                    setIsOpen={setIsPopupOpen}
                  />

                  {/* ✅ Pass the hideSticky prop */}
                  <StickyContact
                    isOpen={isMobileOpen}
                    setIsOpen={setIsMobileOpen}
                    hideSticky={hideSticky}
                  />

                  {/* ✅ PREMIUM MOBILE STICKY CTA */}
                  <MobileStickyCTA
                    onClick={handleContactTrigger}
                    isVisible={!isMobileOpen && !hideSticky && pastHero}
                  />
                </div>
              }
            />
            <Route path="/Info/Thankyou" element={<ThankyouPage />} />
          </Routes>
        </div>
      )}
    </>
  );
}