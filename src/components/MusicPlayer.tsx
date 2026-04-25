import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { Track } from '../types';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'SYNTHETIC_DREAM_01',
    artist: 'NEON_CORE',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '06:12'
  },
  {
    id: '2',
    title: 'GLITCH_SYMPHONY_X',
    artist: 'VOID_UNIT',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '07:05'
  },
  {
    id: '3',
    title: 'CYBER_PULSE_BETA',
    artist: 'MACHINE_MIND',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '05:48'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const val = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(val) ? 0 : val);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', skipForward);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', skipForward);
    };
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-void-black/90 border-2 border-neon-magenta/30 shadow-[0_0_15px_rgba(255,0,255,0.1)] relative overflow-hidden group">
      {/* Glitch Overlay Effect inside the component */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-magenta opacity-20 animate-pulse pointer-events-none" />
      
      <audio ref={audioRef} src={currentTrack.url} />

      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-neon-magenta/20 flex items-center justify-center border-2 border-neon-magenta/50 relative">
            <Music className="text-neon-magenta" size={32} />
            <div className="absolute inset-0 bg-neon-magenta/10 animate-pulse" />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <h3 className="font-pixel text-xl text-neon-magenta truncate glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="font-pixel text-xs text-neon-cyan/70 tracking-widest uppercase">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-1 bg-neon-magenta/20 w-full relative">
          <div 
            className="h-full bg-neon-magenta shadow-[0_0_10px_rgba(255,0,255,0.8)] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 h-3 w-1 bg-white shadow-[0_0_10px_#fff]"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 font-pixel text-[10px] text-neon-magenta/50">
          <span>{audioRef.current ? Math.floor(audioRef.current.currentTime / 60) : 0}:{String(Math.floor(audioRef.current?.currentTime || 0) % 60).padStart(2, '0')}</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <button 
          onClick={skipBackward}
          className="text-neon-cyan/60 hover:text-neon-cyan transition-colors transform hover:scale-110 active:scale-95"
        >
          <SkipBack size={24} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full border-2 border-neon-magenta flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-void-black transition-all transform hover:scale-105 shadow-[0_0_10px_rgba(255,0,255,0.3)]"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>

        <button 
          onClick={skipForward}
          className="text-neon-cyan/60 hover:text-neon-cyan transition-colors transform hover:scale-110 active:scale-95"
        >
          <SkipForward size={24} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Volume2 size={14} className="text-neon-cyan/40" />
        <div className="flex-1 h-[2px] bg-neon-cyan/10 relative">
            <div className="absolute top-0 left-0 w-3/4 h-full bg-neon-cyan/40" />
        </div>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div className="font-pixel text-[8px] text-neon-cyan/30 flex flex-col uppercase">
            <span>BITRATE: 320KBPS</span>
            <span>ENCODER: NEURAL_MIND_V7</span>
        </div>
        <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-neon-magenta/40 animate-bounce" 
                  style={{ height: `${Math.random() * 16 + 4}px`, animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </div>
      </div>
    </div>
  );
}
