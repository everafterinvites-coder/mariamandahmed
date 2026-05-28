import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  backgroundUrl: string;
}

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Envelope({ onOpen, backgroundUrl }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Generate burst of floating love hearts
    const newHearts = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300, // horizontal spread
      y: -50 - Math.random() * 200,    // upward movement
      size: Math.random() * 24 + 12,   // sizes in px
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 0.4,
    }));
    setHearts(newHearts);

    // Trigger parent visual mode change after envelope animations settle (1.5 seconds)
    setTimeout(() => {
      onOpen();
    }, 1600);
  };

  return (
    <div 
      id="envelope-wrapper"
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-cover bg-center text-stone-800"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Semi-transparent dark overlay to enhance envelope contrast */}
      <div id="envelope-overlay" className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"></div>

      {/* Floating Hearts Particles Burst */}
      <div id="hearts-burst-container" className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0.8, 0],
                x: heart.x,
                y: heart.y,
                scale: [0.5, 1.2, 1, 0.6],
                rotate: Math.random() * 60 - 30 
              }}
              transition={{ 
                duration: heart.duration, 
                delay: heart.delay,
                ease: "easeOut" 
              }}
              className="absolute"
            >
              <Heart 
                fill="#ec4899" 
                color="#db2777" 
                size={heart.size} 
                className="drop-shadow-[0_2px_5px_rgba(236,72,153,0.4)]"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Prompt */}
      <motion.div
        id="envelope-header-prompt"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-8 text-center"
      >
        <span className="block font-serif tracking-[0.25em] text-sm text-neutral-100 uppercase opacity-90 drop-shadow-md">
          Mohamed & Mariam
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-white tracking-[0.15em] font-medium mt-3 drop-shadow-lg uppercase">
          Open the Invitation
        </h1>
        <div className="w-16 h-[1px] bg-amber-200/50 mx-auto mt-4"></div>
      </motion.div>

      {/* Interactive 3D physical-style envelope container */}
      <motion.div
        id="envelope-main-container"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 w-[92%] max-w-[430px] aspect-[1.3/1] bg-gradient-to-b from-[#e8decb] to-[#dfceb1] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer focus:outline-none select-none group border border-amber-100/20"
        onClick={handleOpenClick}
      >
        {/* ENVELOPE SHADOW CAVITY & INNER LINING */}
        <div id="envelope-cavity" className="absolute inset-0 bg-[#bcab8f] rounded-lg overflow-hidden">
          {/* Silk lining pattern inside */}
          <div className="absolute inset-0 opacity-10 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-[#dfceb1] via-[#aa9676] to-transparent"></div>
          
          {/* Inner Invitation Card sliding up */}
          <motion.div
            id="envelope-inner-card"
            initial={{ y: 20 }}
            animate={{ 
              y: isOpening ? -180 : 20, 
              scale: isOpening ? 1.05 : 0.98,
              opacity: isOpening ? [1, 1, 0] : 1
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-[5%] right-[5%] bottom-[10%] top-[10%] bg-[#faf9f6] rounded-md shadow-md p-6 border border-amber-200/40 flex flex-col justify-center items-center text-center"
          >
            <span className="font-script text-3xl text-emerald-800">Mohamed & Mariam</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-2">Wedding Ceremony</span>
            <div className="text-[11px] text-amber-600/80 font-serif mt-2 italic">Save the Date</div>
          </motion.div>
        </div>

        {/* TOP FLAP (Unfolds upwards on click) */}
        <motion.div
          id="envelope-top-flap"
          style={{ transformOrigin: "top" }}
          animate={{ rotateX: isOpening ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {/* Classic triangular flap visual */}
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-[50%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
            <polygon 
              points="0,0 100,0 50,50" 
              fill="#e1d3bc" 
              stroke="#decdae"
              strokeWidth="0.2"
            />
          </svg>
        </motion.div>

        {/* LEFT & RIGHT PAPER FLAPS (Static container layers) */}
        <div id="envelope-left" className="absolute inset-0 pointer-events-none z-10">
          <svg viewBox="0 0 100 77" preserveAspectRatio="none" className="w-full h-full">
            {/* Left triangle folder */}
            <polygon points="0,0 45,38.5 0,77" fill="#dfceb1" opacity="0.95" />
            {/* Right triangle folder */}
            <polygon points="100,0 55,38.5 100,77" fill="#dfceb1" opacity="0.95" />
            {/* Bottom triangle folder (slightly overlapping sides) */}
            <polygon points="0,77 100,77 50,33.5" fill="#dec199" opacity="0.95" />
          </svg>
        </div>

        {/* SHINY GOLD WAX SEAL / EMBOSSED BADGE */}
        <motion.div
          id="envelope-wax-seal"
          animate={{ 
            scale: isOpening ? 0.3 : [1, 1.05, 1],
            opacity: isOpening ? 0 : 1,
            y: isOpening ? 40 : 0
          }}
          transition={{ 
            scale: { duration: 0.4 },
            opacity: { duration: 0.3 }
          }}
          className="absolute left-[50%] top-[43.5%] -translate-x-1/2 -translate-y-1/2 z-25 flex flex-col items-center group-hover:scale-105 transition-transform duration-300"
        >
          {/* Gold scalloped circle seal */}
          <div className="w-[58px] h-[58px] rounded-full gold-shimmer shadow-[0_4px_12px_rgba(0,0,0,0.35),_inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center border-2 border-amber-100/40 relative">
            {/* Internal decorative stamp border */}
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-100/50 flex items-center justify-center">
              <Heart fill="white" color="transparent" size={18} className="animate-pulse drop-shadow-sm" />
            </div>
          </div>
          <span className="mt-2 text-[10px] tracking-[0.3em] font-serif uppercase text-[#615133] drop-shadow-sm font-medium">
            Tap to Open
          </span>
        </motion.div>

        {/* Bottom subtle shadow vignette */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/10 to-transparent rounded-b-lg"></div>
      </motion.div>

      {/* Elegant Footer watermark brand */}
      <motion.p
        id="envelope-footer-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : 0.6 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mt-10 font-serif text-white/50 text-[11px] tracking-wider italic"
      >
        With Hearts Full of Love and Joy • September 1st, 2026
      </motion.p>
    </div>
  );
}
