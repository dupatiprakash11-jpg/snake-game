/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Shield, Cpu, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 selection:bg-neon-magenta selection:text-void-black">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />
      <div className="scanline" />
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Main Container */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start"
      >
        {/* Left Section: Info & Player */}
        <div className="flex flex-col gap-8 h-full">
          <div className="border-2 border-neon-cyan/20 p-6 bg-void-black/60 backdrop-blur-md relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-neon-cyan/20 group-hover:text-neon-cyan/60 transition-colors">
              <Cpu size={40} />
            </div>
            
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-2 font-pixel text-neon-magenta tracking-[0.3em] text-sm animate-pulse">
                <Activity size={14} />
                <span>ACTIVE_STREAMS</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-pixel text-neon-cyan glitch-text leading-none mb-4" data-text="VOID_SYNC">
                VOID_SYNC
              </h1>
              <p className="font-pixel text-xs text-neon-cyan/50 max-w-sm tracking-wider uppercase leading-relaxed">
                NEURAL_LINK_ESTABLISHED. PREPARING_AUDIO_SYNAPTIC_OVERRIDE. 
                SNAKE_PROTOCOL_V1.0.1_READY.
              </p>
            </header>

            <MusicPlayer />
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4 flex-1">
            <div className="border-2 border-neon-magenta/20 p-4 bg-void-black/40 font-pixel text-[10px] text-neon-magenta/60 uppercase">
              <Shield size={16} className="mb-2" />
              <div className="mb-1 text-neon-magenta/40">{' > '} FIREWALL_ENFORCED</div>
              <div>{' > '} ENCRYPTION: AES_2048</div>
              <div>{' > '} IP: 127.0.0.1</div>
            </div>
            <div className="border-2 border-neon-cyan/20 p-4 bg-void-black/40 font-pixel text-[10px] text-neon-cyan/60 uppercase">
              <Terminal size={16} className="mb-2" />
              <div className="mb-1 text-neon-cyan/40">{' > '} CONSOLE_LOGS</div>
              <div>{' > '} ALL_SYSTEMS_GO</div>
              <div>{' > '} BUFFER_CLEAR</div>
            </div>
          </div>
        </div>

        {/* Right Section: Game */}
        <div className="flex justify-center">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-cyan opacity-20 blur-sm animate-pulse" />
            <SnakeGame />
          </motion.div>
        </div>
      </motion.main>

      {/* Atmospheric Decorations */}
      <div className="fixed bottom-4 left-4 font-pixel text-[9px] text-neon-cyan/30 z-20 flex flex-col uppercase tracking-[0.2em]">
        <span>© 2026 VOID_ARCHIVES_SYSTEMS</span>
        <span>AUTH_STATUS: GRANTED</span>
      </div>

      <div className="fixed top-4 right-4 flex gap-4 z-20">
        <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
        <div className="w-2 h-2 rounded-full bg-neon-magenta animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 crt-flicker opacity-[0.03] bg-[rgba(18,16,16,0)] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

