'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [timeString, setTimeString] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setTimeString(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playClickSound = (freq = 600) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio context fallback
    }
  };

  const navLinks = [
    { name: 'Work', href: '/profile#projects' },
    { name: 'Services', href: '/profile#services' },
    { name: 'Contact', href: '/profile#contact' },
  ];

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 py-3 bg-[#0a0a0c]/85 backdrop-blur-md border-b border-white/10 shadow-2xl"
        >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="/"
          onClick={() => playClickSound(700)}
          data-cursor="HOME"
          className="group flex items-center gap-3 font-mono font-bold tracking-tighter text-lg text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-extrabold text-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            AI
          </span>
          <span className="flex flex-col">
            <span className="text-white group-hover:text-zinc-300 transition-colors">
              ANDI INDRA <span className="text-xs text-zinc-500">//</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-normal tracking-wider -mt-1">
              STUDIO
            </span>
          </span>
        </a>

        {/* Live Status & Clock (Desktop) */}
        <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-zinc-300 font-medium">AVAILABLE FOR WORK</span>
          </div>

          <span className="text-zinc-600">|</span>

          <div className="text-zinc-400 flex items-center gap-1.5">
            <span>JAKARTA</span>
            <span className="text-white font-bold">{timeString || '12:00:00'}</span>
          </div>
        </div>

        {/* Navigation Links + Audio Toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-mono tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playClickSound(500)}
                data-cursor="NAV"
                className="relative text-zinc-400 hover:text-white transition-colors py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClickSound(800);
            }}
            data-cursor="AUDIO"
            className={`p-2 rounded-full border transition-all duration-300 ${
              soundEnabled
                ? 'border-white text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
            }`}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClickSound(800);
            }}
            className={`p-2 rounded-full border text-xs ${
              soundEnabled ? 'border-white text-white' : 'border-white/10 text-zinc-400'
            }`}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playClickSound(600);
            }}
            className="p-2 rounded-lg border border-white/10 text-white hover:bg-white/5"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[65px] bg-[#0a0a0c]/95 border-b border-white/10 backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-zinc-300">AVAILABLE FOR WORK</span>
            </div>

            <nav className="flex flex-col gap-4 font-mono text-lg">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    playClickSound(500);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between text-zinc-300 hover:text-white py-2 border-b border-white/5"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={18} className="text-white" />
                </a>
              ))}
            </nav>

            <div className="text-xs font-mono text-zinc-500 pt-2 flex items-center justify-between">
              <span>JAKARTA (UTC+7)</span>
              <span className="text-white font-bold">{timeString}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )}
</AnimatePresence>
  );
}
