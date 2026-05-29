import { useEffect, useRef, useState } from 'react';
import { Music, Music4, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTrigger: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Premium streaming link for Sparks by Coldplay - guaranteed web playback
    const audio = new Audio('https://pub-c5e31b5cdafb419a91622d13fba410e5.r2.dev/sparks.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      // Attempt autoplay after user interaction (envelope click)
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log('Autoplay deferred by browser policy. User needs to tap player.', error));
    }
  }, [autoPlayTrigger]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log('Playback error:', error));
    }
  };

  return (
    <div id="wedding-music-player" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Audio Visualizer Waves when playing */}
      {isPlaying && (
        <div className="flex items-end gap-[3px] bg-black/40 backdrop-blur-md px-3 py-2 rounded-full h-9 border border-sage-200/20 shadow-lg">
          <span className="w-[3px] h-3 bg-sage-200 animate-[bounce_0.8s_infinite_0.1s] rounded-full"></span>
          <span className="w-[3px] h-4 bg-amber-200/80 animate-[bounce_0.8s_infinite_0.2s] rounded-full"></span>
          <span className="w-[3px] h-2 bg-sage-200 animate-[bounce_0.8s_infinite_0.3s] rounded-full"></span>
          <span className="w-[3px] h-5 bg-amber-200/80 animate-[bounce_0.8s_infinite_0.4s] rounded-full"></span>
          <span className="w-[3px] h-3 bg-sage-200 animate-[bounce_0.8s_infinite_0.2s] rounded-full"></span>
        </div>
      )}

      {/* Main Music Toggle Button */}
      <button
        id="btn-music-toggle"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 shadow-xl focus:outline-none ring-2 ring-emerald-100/20 ${
          isPlaying 
            ? 'bg-sage-600 hover:bg-sage-700 text-white animate-[spin_10s_linear_infinite]' 
            : 'bg-stone-900 border border-sage-200/30 hover:bg-stone-800 text-sage-200'
        }`}
      >
        {isPlaying ? (
          <Volume2 id="icon-sound-on" size={20} className="animate-pulse" />
        ) : (
          <VolumeX id="icon-sound-off" size={20} />
        )}
        
        {/* Decorative rotating note rings */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
        )}
      </button>
    </div>
  );
}
