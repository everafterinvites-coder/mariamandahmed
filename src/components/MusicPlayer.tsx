import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTrigger: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Points directly to the root path of your live Vercel domain where sparks.mp3 sits
    const audio = new Audio('/sparks.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log('Autoplay deferred:', error));
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
        .catch((error) => console.error('Playback error:', error));
    }
  };

  return (
    <div id="wedding-music-player" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Audio Visualizer Waves when playing */}
      {isPlaying && (
        <div className="flex items-end gap-[3px] bg-black/60 backdrop-blur-md px-3 py-2 rounded-full h-9 border border-stone-800 shadow-lg">
          <span className="w-[3px] h-3 bg-amber-200/90 animate-[bounce_0.8s_infinite_0.1s] rounded-full"></span>
          <span className="w-[3px] h-4 bg-amber-200/80 animate-[bounce_0.8s_infinite_0.2s] rounded-full"></span>
          <span className="w-[3px] h-2 bg-amber-200/90 animate-[bounce_0.8s_infinite_0.3s] rounded-full"></span>
          <span className="w-[3px] h-5 bg-amber-200/80 animate-[bounce_0.8s_infinite_0.4s] rounded-full"></span>
          <span className="w-[3px] h-3 bg-amber-200/90 animate-[bounce_0.8s_infinite_0.2s] rounded-full"></span>
        </div>
      )}

      {/* Main Music Toggle Button */}
      <button
        id="btn-music-toggle"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 shadow-2xl focus:outline-none border ${
          isPlaying 
            ? 'bg-amber-200 text-stone-950 border-amber-300 scale-105' 
            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
        }`}
      >
        {isPlaying ? (
          <Volume2 id="icon-sound-on" size={20} />
        ) : (
          <VolumeX id="icon-sound-off" size={20} />
        )}
      </button>
    </div>
  );
}
