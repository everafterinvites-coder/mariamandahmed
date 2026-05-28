import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Navigation, Sparkles, Heart, BellRing, ChevronDown } from 'lucide-react';
import { CountdownTime } from '../types';

interface InvitationContentProps {
  backgroundUrl: string;
}

export default function InvitationContent({ backgroundUrl }: InvitationContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Target date: September 1, 2026, at 6:00 PM Egypt Time (Cairo is roughly UTC+3)
  const targetDate = new Date('2026-09-01T18:00:00').getTime();

  const [counter, setCounter] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate remaining time
  useEffect(() => {
    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCounter({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCounter({ days, hours, minutes, seconds });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div 
      id="invitation-scroll-container" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#faf9f6] text-[#2c352c] font-sans antialiased overflow-x-hidden select-none"
    >
      
      {/* SECTION 1: ELEGANT HERO OVERLAY */}
      <section 
        id="section-hero"
        className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-stone-950/45 md:bg-stone-950/35"></div>

        {/* Floating background petals / sparkles */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
          <div className="absolute top-[20%] left-[10%] animate-pulse"><Sparkles className="text-amber-100" size={12} /></div>
          <div className="absolute bottom-[30%] right-[15%] animate-bounce"><Heart fill="#fecdd3" color="transparent" size={14} /></div>
        </div>

        {/* Hero Card Container */}
        <motion.div 
          id="hero-glass-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative z-20 w-[90%] max-w-[440px] px-8 py-12 rounded-2xl bg-white/10 dark:bg-black/15 backdrop-blur-xl border border-white/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] text-center text-white"
        >
          {/* Symmetrical Corner Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-amber-200/50"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-amber-200/50"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-amber-200/50"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-amber-200/50"></div>

          {/* Symmetrical Top Rose icon / Flourish */}
          <div className="flex justify-center mb-6">
            <Heart fill="#fef3c7" color="#fef3c7" size={16} className="animate-pulse" />
          </div>

          <p className="font-serif tracking-[0.3em] scroll-text text-amber-200 font-medium text-xs md:text-[13px] uppercase">
            Together with their families
          </p>

          <h1 id="invitation-couple-names" className="font-script text-6xl md:text-7xl mt-6 text-white tracking-wide">
            Mohamed & Mariam
          </h1>

          <div className="w-16 h-[1px] bg-amber-200/50 mx-auto my-8"></div>

          <div className="space-y-3 font-serif">
            <p className="tracking-[0.2em] font-medium text-sm md:text-md uppercase text-neutral-100">
              Tuesday • September 1st 2026
            </p>
            <p className="tracking-[0.25em] text-neutral-200 text-xs uppercase">
              6:00 PM
            </p>
          </div>

          {/* Ring or Flower symbol representing vows */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="w-8 h-[0.5px] bg-white/20"></span>
            <span className="text-[10px] tracking-[0.4em] uppercase font-serif text-amber-200/80">Save The Ceremony</span>
            <span className="w-8 h-[0.5px] bg-white/20"></span>
          </div>
        </motion.div>

        {/* Scroll down prompt */}
        <div className="absolute bottom-8 z-20 flex flex-col items-center animate-bounce opacity-80">
          <span className="font-serif tracking-widest text-[9px] text-white/80 uppercase mb-2">Scroll Down</span>
          <ChevronDown className="text-white" size={20} />
        </div>
      </section>

      {/* SECTION 2: THE COUNTDOWN */}
      <section 
        id="section-countdown"
        className="relative bg-[#ebedd5] py-20 px-6 text-stone-800"
      >
        <div className="max-w-[500px] mx-auto text-center">
          {/* Small Top Floating hearts loop */}
          <div className="flex justify-center gap-1 mb-4 opacity-70">
            <Heart fill="#a8a384" color="transparent" size={14} className="animate-pulse" />
            <Heart fill="#c8c3a4" color="transparent" size={10} className="animate-pulse" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.15em] font-medium text-[#4a533c]">
            Countdown to Our Forever
          </h2>
          <p className="font-serif text-[13px] tracking-widest uppercase text-[#73825a] mt-3 font-light">
            Counting Down Every Heartbeat
          </p>

          {/* Countdown Grid */}
          <div id="countdown-card-grid" className="mt-12 grid grid-cols-4 gap-3">
            {/* Days Card */}
            <div className="bg-[#5a6b54] text-white rounded-2xl py-5 px-1 shadow-[0_8px_20px_-5px_rgba(90,107,84,0.35)] flex flex-col items-center border border-emerald-100/10 transition-transform duration-300 hover:scale-102">
              <span className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
                {counter.days}
              </span>
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-80 mt-2">
                Days
              </span>
            </div>

            {/* Hours Card */}
            <div className="bg-[#5a6b54] text-white rounded-2xl py-5 px-1 shadow-[0_8px_20px_-5px_rgba(90,107,84,0.35)] flex flex-col items-center border border-emerald-100/10 transition-transform duration-300 hover:scale-102">
              <span className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
                {counter.hours}
              </span>
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-80 mt-2">
                Hours
              </span>
            </div>

            {/* Minutes Card */}
            <div className="bg-[#5a6b54] text-white rounded-2xl py-5 px-1 shadow-[0_8px_20px_-5px_rgba(90,107,84,0.35)] flex flex-col items-center border border-emerald-100/10 transition-transform duration-300 hover:scale-102">
              <span className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">
                {counter.minutes}
              </span>
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-80 mt-2">
                Minutes
              </span>
            </div>

            {/* Seconds Card */}
            <div className="bg-[#5a6b54] text-white rounded-2xl py-5 px-1 shadow-[0_8px_20px_-5px_rgba(90,107,84,0.35)] flex flex-col items-center border border-emerald-100/10 transition-transform duration-300 hover:scale-102">
              <span className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-amber-200 animate-pulse">
                {counter.seconds}
              </span>
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-80 mt-2">
                Seconds
              </span>
            </div>
          </div>
          
          <div className="w-12 h-[1px] bg-[#9ba889]/50 mx-auto mt-10"></div>
        </div>
      </section>

      {/* SECTION 3: WEDDING VENUE */}
      <section 
        id="section-venue"
        className="py-20 px-6 bg-white flex flex-col items-center"
      >
        <div className="w-full max-w-[500px]">
          {/* Venue Header */}
          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-sage-50 rounded-full text-sage-600 mb-4 border border-sage-100 shadow-sm animate-pulse">
              <MapPin size={22} className="stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.2em] text-[#343e2d] font-medium">
              Wedding Venue
            </h2>
            <div className="w-16 h-[1px] bg-amber-600/35 mx-auto mt-4 mb-6"></div>
            
            <p className="font-serif text-[17px] md:text-[19px] tracking-wide text-stone-800 leading-snug">
              FOUR SEASONS HOTEL CAIRO AT NILE PLAZA
            </p>
            <p className="font-serif text-sm tracking-[0.2em] uppercase text-stone-500 mt-2">
              Cairo, Egypt
            </p>
          </div>

          {/* Interactive Styled Google Maps Embed for Nile Plaza, Cairo */}
          <div 
            id="venue-map-container"
            className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.12)] border-4 border-sage-50 relative group"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.9488730919!2d31.23078712128821!3d30.0383196417775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840d04847e09d%3A0xe9f0fb52f86ee35a!2sFour%20Seasons%20Hotel%20Cairo%20at%20Nile%20Plaza!5e0!3m2!1sen!2seg!4v1716912345678!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Four Seasons Hotel Cairo at Nile Plaza Map"
            ></iframe>

            {/* Quick map coordinates hover label */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-md flex items-center justify-between border border-stone-100 transition-transform duration-300 group-hover:translate-y-[-2px]">
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-stone-800 tracking-wider">Four Seasons Garden City</span>
                <span className="text-[9px] text-stone-500">1089 Corniche El Nil, Cairo</span>
              </div>
              
              {/* Maps launcher link */}
              <a 
                id="btn-maps-redirect"
                href="https://maps.google.com/?q=Four+Seasons+Hotel+Cairo+at+Nile+Plaza" 
                target="_blank" 
                rel="no-referrer"
                className="flex items-center gap-1.5 bg-[#4f5c49] text-white px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-wider uppercase hover:bg-stone-800 transition-colors duration-300 shadow-sm"
              >
                <span>Navigate</span>
                <Navigation size={10} className="stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE INVITATION TEXT POEM */}
      <section 
        id="section-poem"
        className="relative bg-[#ebedd5] py-24 px-6 text-center text-[#303828] flex flex-col items-center"
      >
        {/* Watercolor layout border */}
        <div className="absolute inset-4 rounded-3xl border-2 border-[#d9ddbd] opacity-40 pointer-events-none"></div>

        <div className="w-full max-w-[460px] space-y-12 relative z-10">
          
          {/* Logo element from invitation creator */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <Heart fill="transparent" color="#7a8d6b" size={24} className="stroke-[1.2] animate-pulse" />
            <h3 className="font-serif text-3xl uppercase tracking-[0.25em] text-[#425037] font-medium">
              Invitation
            </h3>
            <div className="w-14 h-[0.5px] bg-[#97a885]"></div>
          </div>

          {/* Sincere poem with spacious typography */}
          <div className="font-serif space-y-6 text-[15px] md:text-[16px] text-stone-700 leading-relaxed max-w-[400px] mx-auto">
            <p className="tracking-[0.14em] italic text-[#4a583e] font-light">
              "With hearts full of love and joy,
            </p>
            <p className="tracking-[0.14em] italic text-[#4a583e] font-light">
              we invite you to celebrate our special day.
            </p>
            <p className="tracking-[0.14em] italic text-[#4a583e] font-light mt-8">
              Your presence will make this beautiful occasion even more meaningful and unforgettable.
            </p>
            <p className="tracking-[0.14em] italic text-[#4a583e] font-light mt-8">
              Join us for an elegant evening filled with love, laughter, happiness, and forever memories."
            </p>
          </div>

          {/* Floral design element or rings divider */}
          <div className="py-6 flex justify-center items-center gap-4">
            <span className="w-12 h-[0.5px] bg-[#9ba889]"></span>
            <span className="text-[12px] font-serif uppercase tracking-[0.4em] text-[#556346]">Mohamed & Mariam</span>
            <span className="w-12 h-[0.5px] bg-[#9ba889]"></span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="invitation-footer" className="bg-[#1f261d] py-12 px-6 text-center text-white/40 text-xs border-t border-stone-800/40">
        <p className="font-serif tracking-widest text-[10px] uppercase text-amber-200/40">
          Mohamed & Mariam • Wedding Ceremony
        </p>
        <p className="mt-2 text-[10px] font-light font-mono text-stone-500">
          September 1, 2026 — Cairo, Egypt
        </p>
      </footer>

    </div>
  );
}
