import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { MapPin, ArrowRight } from 'lucide-react';

// ================= 1. عمل الـ Import للصور في الأول هنا =================
// تأكدي أن أسامي الملفات وامتداداتها (jpeg, jpg) مطابقة بالظبط للحقيقة وحساسة للحروف
import imgHeroLeft from "../photo/3.jpeg";
import imgHeroRight from "../photo/6.jpeg";
import imgMemoryLarge from "../photo/photo1.jpeg";
import imgMemoryTopRight from "../photo/5.jpeg";
import imgMemoryBottomRight from "../photo/8.jpeg";
import imgSaveTheDateCircle from "../photo/7.jpeg";
import imgVenueBg from "../photo/date.jpg";


function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-07-16T21:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000))
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto text-center mt-6 w-full z-10">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center bg-[#FAF6F0]/80 backdrop-blur-sm p-2 rounded-xl border border-[#1C1A17]/5">
          <span className="text-2xl md:text-3xl font-serif font-light text-[#1C1A17]">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[8px] uppercase tracking-[0.2em] mt-0.5 text-[#A39A90] font-sans">{unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [flowState, setFlowState] = useState('envelope');
  const [envelopeAnimation, setEnvelopeAnimation] = useState('closed');
  const lenisRef = useRef(null);

  const handleEnvelopeClick = () => {
    if (envelopeAnimation !== 'closed') return;
    setEnvelopeAnimation('opening');
    setTimeout(() => {
      setFlowState('invited');
    }, 1000);
  };

  useEffect(() => {
    if (flowState === 'invited') {
      const timer = setTimeout(() => {
        setFlowState('website');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flowState]);

  useEffect(() => {
    if (flowState === 'website') {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
      });
      lenisRef.current = lenis;
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.destroy();
    }
    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, [flowState]);

  const smoothEasing = [0.25, 1, 0.5, 1];

  return (
    <div className="bg-[#F0EAE1] min-h-screen text-[#1C1A17] selection:bg-[#C5A880] selection:text-white relative overflow-x-hidden p-3 sm:p-6">

      <AnimatePresence mode="wait">
        {/* ================= PHASE 1: THE REVEAL ENVELOPE ================= */}
        {flowState === 'envelope' && (
          <motion.div
            key="envelope-phase"
            className="fixed inset-0 z-50 flex justify-center items-center bg-[#141413] p-4 select-none overflow-hidden"
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
              transition: { duration: 0.8, ease: 'easeInOut' }
            }}
          >
            <div className="absolute w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#C5A880]/15 rounded-full blur-[100px] pointer-events-none" />

            <div
              className="relative w-full max-w-[340px] h-[460px] cursor-pointer group"
              onClick={handleEnvelopeClick}
              style={{ perspective: '1200px' }}
            >
              <div className="absolute inset-0 bg-[#C8C1B4] shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] border border-[#B3A999] z-0" />

              <motion.div
                className="absolute bottom-2 left-3 right-3 h-[430px] bg-[#FAF8F5] shadow-xl flex flex-col justify-between p-2 z-10 border border-[#E8E1D5]"
                animate={envelopeAnimation === 'opening' ? { y: -380, scale: 0.98, zIndex: 35 } : { y: 0, scale: 1, zIndex: 10 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              >
                <div className="w-full h-full border-[1px] border-[#C5A880]/40 flex flex-col items-center justify-center relative p-6 bg-[url('/noise.png')] bg-repeat">
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C5A880]" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#C5A880]" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#C5A880]" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C5A880]" />

                  <h3 className="font-serif italic text-4xl text-[#C5A880] mb-3 drop-shadow-sm">E&A</h3>
                  <div className="w-12 h-[1px] bg-[#C5A880]/30 mb-4" />
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#5C544C] text-center leading-relaxed font-medium">
                    You are cordially<br />invited to our<br />wedding
                  </p>
                </div>
              </motion.div>

              <div
                className="absolute inset-0 bg-[#EAE4D9] z-20 drop-shadow-[4px_0_12px_rgba(0,0,0,0.08)]"
                style={{ clipPath: 'polygon(0 0, 52% 50%, 0 100%)' }}
              />

              <div
                className="absolute inset-0 bg-[#E3DCCF] z-20 drop-shadow-[-4px_0_12px_rgba(0,0,0,0.08)]"
                style={{ clipPath: 'polygon(100% 0, 48% 50%, 100% 100%)' }}
              />

              <div
                className="absolute inset-0 bg-[#EFEBE1] z-30 drop-shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
                style={{ clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)' }}
              >
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-white/40" />
              </div>

              <motion.div
                className="absolute inset-0 bg-[#F5F0E6] z-40 origin-top drop-shadow-[0_6px_16px_rgba(0,0,0,0.15)]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 53%)' }}
                initial={{ rotateX: 0 }}
                animate={envelopeAnimation === 'opening' ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <div
                  className="absolute inset-0 border-b-2 border-[#C5A880]/10"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 53%)' }}
                />
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                animate={envelopeAnimation === 'opening' ? { scale: 0, opacity: 0, y: -20 } : { scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'backIn' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#E6D0A7] to-[#997942] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(153,121,66,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] relative">
                  <div className="w-13 h-13 bg-gradient-to-br from-[#B5945B] to-[#D1B88B] rounded-full flex items-center justify-center border border-[#997942]/50 shadow-[inset_0_3px_5px_rgba(0,0,0,0.2)]">
                    <span className="font-serif italic text-white text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">E&A</span>
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]" />
                </div>
              </motion.div>

              <p className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.4em] uppercase text-[#C5A880] whitespace-nowrap animate-pulse">
                {envelopeAnimation === 'opening' ? "Opening..." : "Click to break seal"}
              </p>
            </div>
          </motion.div>
        )}

        {/* ================= PHASE 2: YOU ARE INVITED ================= */}
        {flowState === 'invited' && (
          <motion.div
            key="invited-phase"
            className="fixed inset-0 z-50 flex justify-center items-center bg-[#FAF8F5] p-6 select-none"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              y: -30,
              transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
            }}
          >
            <div className="absolute inset-6 border border-[#C5A880]/20 rounded-[24px] pointer-events-none" />

            <div className="text-center z-10 flex flex-col items-center max-w-xs">
              <div className="w-12 h-20 mb-8 text-[#1C1A17]/80">
                <svg viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                  <path d="M12,48 L12,8" />
                  <path d="M12,40 Q16,36 12,32" />
                  <path d="M12,34 Q8,30 12,26" />
                  <path d="M12,28 Q16,24 12,20" />
                  <circle cx="12" cy="6" r="2" />
                </svg>
              </div>

              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1C1A17] tracking-wide mb-8">
                You are invited!
              </h2>

              <div className="w-12 h-20 mt-4 text-[#1C1A17]/80 transform rotate-180">
                <svg viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                  <path d="M12,48 L12,12" />
                  <path d="M12,38 Q15,34 12,30" />
                  <path d="M12,28 Q9,24 12,20" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= PHASE 3: THE MAIN WEBSITE CONTENT ================= */}
      {flowState === 'website' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEasing }}
          className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-10 pt-20 pb-6 relative"
        >
          <nav className="fixed top-0 left-0 w-full bg-[#FAF6F0]/80 backdrop-blur-md z-40 py-4 px-6 md:px-12 flex justify-between items-center border-b border-[#1C1A17]/[0.05]">
            <span className="font-serif tracking-widest text-sm font-medium text-[#1C1A17]">E & A</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A39A90] font-sans">16 . 07 . 2026</span>
          </nav>

          {/* ================= FRAME 1: HERO / LANDING ================= */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full min-h-[90vh] bg-[#FAF6F0] rounded-[32px] p-6 sm:p-10 border border-[#1C1A17]/10 shadow-sm relative flex flex-col justify-between items-center overflow-hidden"
          >
            <div className="absolute inset-4 border border-[#C5A880]/30 rounded-[24px] pointer-events-none z-0" />

            <div className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#A39A90] z-10 mt-2">
              E & A <span className="mx-2 opacity-40">•</span> 2026
            </div>

            <div className="flex flex-col items-center text-center max-w-2xl px-4 my-auto z-10">
              <div className="font-serif italic text-xl sm:text-2xl text-[#5C544C] mb-4">
                we're getting married
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-6 font-normal text-[#1C1A17]">
                Eslam <span className="font-serif text-3xl sm:text-5xl mx-1 italic text-[#C5A880] font-light">&</span> Aya
              </h1>

              <div className="w-12 h-[1px] bg-[#1C1A17]/20 mb-4" />

              <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#7A7065] mb-6">
                16 . 07 . 2026
              </div>

              <button className="bg-black text-white rounded-full px-6 py-3 text-xs tracking-wider uppercase font-sans flex items-center gap-2 hover:bg-[#222] transition-colors shadow-sm">
                <span>Save the Date</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>

              <Countdown />
            </div>

            <div className="w-full h-[32vh] relative mt-auto flex justify-center items-end z-10 pb-2">
              <div className="relative w-full h-full max-w-md mx-auto">
                {/* --- تعديل الصورة اليسرى للـ Variable --- */}
                <div className="absolute left-2 bottom-0 w-[44%] h-[90%] rounded-[20px] overflow-hidden shadow-md transform -rotate-2 border-2 border-white">
                  <img src={imgHeroLeft} className="w-full h-full object-cover" alt="Eslam and Aya" />
                </div>
                {/* --- تعديل الصورة اليمنى للـ Variable --- */}
                <div className="absolute right-2 bottom-0 w-[50%] h-[100%] rounded-[24px] overflow-hidden shadow-md transform rotate-2 border-2 border-white">
                  <img src={imgHeroRight} className="w-full h-full object-cover object-top" alt="Eslam and Aya" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ================= FRAME 1.5: OUR MEMORIES ================= */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: smoothEasing }}
            className="w-full bg-white rounded-[32px] p-6 sm:p-10 border border-[#1C1A17]/5 shadow-sm relative flex flex-col items-center overflow-hidden"
          >
            <div className="text-center mb-8 z-10 mt-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#A39A90] mb-3">Our Moments</p>
              <h2 className="font-serif italic text-3xl sm:text-4xl text-[#1C1A17]">Captured Memories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full max-w-5xl z-10">
              {/* --- تعديل الصورة الكبيرة --- */}
              <div className="col-span-1 md:col-span-7 h-[50vh] md:h-[70vh] rounded-[24px] overflow-hidden shadow-sm border border-[#1C1A17]/5 relative group">
                <img src={imgMemoryLarge} alt="Eslam & Aya Rings" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>

              {/* Two Stacked Photos */}
              <div className="col-span-1 md:col-span-5 grid grid-rows-2 gap-4 h-[60vh] md:h-[70vh]">
                {/* --- تعديل صورة الـ Bouquet --- */}
                <div className="w-full h-full rounded-[24px] overflow-hidden shadow-sm border border-[#1C1A17]/5 relative group">
                  <img src={imgMemoryTopRight} alt="Eslam & Aya Bouquet" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>
                {/* --- تعديل صورة الـ Couch --- */}
                <div className="w-full h-full rounded-[24px] overflow-hidden shadow-sm border border-[#1C1A17]/5 relative group">
                  <img src={imgMemoryBottomRight} alt="Eslam & Aya Couch" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ================= FRAME 2: THE VENUE ================= */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: smoothEasing }}
            className="w-full min-h-[70vh] rounded-[32px] border border-[#1C1A17]/10 shadow-sm relative overflow-hidden flex flex-col justify-end p-8 sm:p-12 bg-cover bg-center text-white"
            // --- تعديل مسار الـ Background Image ليكون متغير ---
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${imgVenueBg})` }}
          >
            <div className="absolute top-8 left-8 sm:left-12 sm:top-12 z-10">
              <p className="font-serif text-2xl sm:text-4xl italic font-light tracking-wide max-w-lg leading-snug">
                Under one <br />very full moon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24 border-t border-white/10 relative z-10 max-w-3xl">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/60 mb-1.5">Venue</p>
                <h3 className="font-serif text-lg sm:text-xl font-normal">Movie Moon</h3>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/60 mb-1.5">When</p>
                <h3 className="font-serif text-lg sm:text-xl font-normal">16 Jul 2026 • 9pm</h3>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/60 mb-1.5">Dress Code</p>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#C5A880]">Soft pastels</h3>
              </div>
            </div>

            <div className="mt-8 relative z-10">
              <a
                href="https://maps.app.goo.gl/W9UJqYsPCxbfPWad7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all"
              >
                <span>Open in Maps</span>
                <MapPin className="w-3 h-3" />
              </a>
            </div>
          </motion.section>

          {/* ================= FRAME 3: THE ARTISTIC SAVE THE DATE ================= */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: smoothEasing }}
            className="w-full bg-[#FAF6F0] rounded-[32px] p-8 sm:p-12 border border-[#C5A880]/30 shadow-sm relative flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-4 border border-[#C5A880]/10 rounded-[24px]" />

            <div className="text-center z-10 max-w-sm">
              <h2 className="font-serif font-bold text-4xl sm:text-5xl tracking-wide text-[#1C1A17] mb-6">
                SAVE <span className="font-sans font-light text-xl italic block mt-1 text-[#5C544C]">the</span> DATE!
              </h2>

              {/* --- تعديل الدائرة الـ Save the date --- */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 mx-auto my-6 rounded-full overflow-hidden border-[6px] border-[#FAF6F0] shadow-[0_0_0_2px_rgba(197,168,128,0.3)]">
                <img src={imgSaveTheDateCircle} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Save the date" />
              </div>

              <div className="w-full h-[1px] bg-[#1C1A17]/10 my-4" />
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1A17] font-semibold">Eslam + Aya</p>
              <p className="font-sans text-[10px] tracking-widest text-[#A39A90] mt-1">16 . 07 . 2026</p>
            </div>
          </motion.section>

          {/* ================= SECTION 4: PREMIUM ROYAL FOOTER ================= */}
          <footer className="w-full rounded-[32px] overflow-hidden border border-[#1C1A17]/10 shadow-sm">
            <div className="bg-[#FAF6F0] py-16 px-6 text-center border-b border-[#1C1A17]/5">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1A17] mb-4">We're so excited to see you!</h2>
              <p className="font-serif italic text-sm sm:text-base text-[#5C544C] max-w-md mx-auto leading-relaxed px-4">
                Our next chapter starts with all of you beside us. See you on our special day.
              </p>
            </div>

            <div className="bg-black text-[#FAF6F0] py-12 px-6 text-center flex flex-col items-center justify-center">
              <h3 className="font-serif text-2xl sm:text-3xl tracking-wide mb-2">Eslam <span className="italic text-[#C5A880]">&</span> Aya</h3>
              <p className="font-sans text-[10px] tracking-[0.3em] text-[#A39A90] uppercase mb-4">16 . 07 . 2026</p>
              <div className="w-8 h-[1px] bg-white/20 mb-4" />
              <p className="text-[9px] tracking-[0.1em] text-white/40 font-sans uppercase">Created with love</p>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}