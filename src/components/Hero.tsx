'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, MoreHorizontal, ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { fetchHomepageSelectedWorks, HomepageCard } from '@/lib/api';

const CARDS_DATA = [
  {
    id: 'card-1',
    title: 'KopaKopi App',
    subtitle: 'Mobile App, Company Profile Website',
    image: '/assets/kopakopi.png',
  },
  {
    id: 'card-2',
    title: 'Handall',
    subtitle: 'Company Profile Website',
    image: '/assets/hero_card_2.webp',
  },
  {
    id: 'card-3',
    title: 'Sarangan Medicare',
    subtitle: 'Web Apps',
    image: '/assets/hero_card_3.webp',
  },
  {
    id: 'card-4',
    title: 'Faculty of Social and Political Sciences',
    subtitle: 'Institutional Website',
    image: '/assets/hero_card_4.webp',
  },
  {
    id: 'card-5',
    title: 'Basicare',
    subtitle: 'Corporate Website',
    image: '/assets/hero_card_5.webp',
  },
];

const MENU_ITEMS = [
  { name: 'Projects', targetId: 'projects' },
  { name: 'Tech Stack', targetId: 'tech-stack' },
  { name: 'Services', targetId: 'services' },
  { name: 'Contact', targetId: 'contact' },
];

export default function Hero() {
  const router = useRouter();
  const [cards, setCards] = useState<HomepageCard[]>(CARDS_DATA);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    fetchHomepageSelectedWorks()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setCards(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch homepage selected works:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactHidden, setIsContactHidden] = useState(false);
  const [buttonRect, setButtonRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const heroRef = useRef<HTMLElement>(null);

  const playClickSound = useCallback((freq = 600) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio context fallback
    }
  }, [soundEnabled]);

  // Lock body scroll and stop Lenis when hero is locked
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isLocked]);

  // Handle scroll event to re-lock when user scrolls back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 20 && !isLocked) {
        setIsLocked(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLocked]);

  const activeCardIndexRef = useRef(activeCardIndex);
  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex;
  }, [activeCardIndex]);

  // Intercept Wheel, Touch & Arrow Key events to cycle middle card stack without scrolling page
  useEffect(() => {
    if (!isLocked) return;

    let cooldown = false;
    let accumulatedDelta = 0;
    let deltaResetTimeout: NodeJS.Timeout | null = null;
    let touchStartY = 0;

    const COOLDOWN_MS = 400; // Increased cooldown to 850ms to make card switching much slower and deliberate
    const DELTA_THRESHOLD = 30; // Minimum scroll delta magnitude required

    const triggerNextCard = () => {
      setActiveCardIndex((prev) => (prev + 1) % cards.length);
      playClickSound(500);
    };

    const triggerPrevCard = () => {
      setActiveCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
      playClickSound(450);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      accumulatedDelta += e.deltaY;

      if (deltaResetTimeout) clearTimeout(deltaResetTimeout);
      deltaResetTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 200);

      if (cooldown) return;

      if (Math.abs(accumulatedDelta) >= DELTA_THRESHOLD) {
        cooldown = true;
        if (accumulatedDelta > 0) {
          triggerNextCard();
        } else {
          triggerPrevCard();
        }
        accumulatedDelta = 0;

        setTimeout(() => {
          cooldown = false;
        }, COOLDOWN_MS);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (cooldown) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 40) {
        cooldown = true;
        if (diffY > 0) {
          triggerNextCard();
        } else {
          triggerPrevCard();
        }
        setTimeout(() => {
          cooldown = false;
        }, COOLDOWN_MS);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) {
        e.preventDefault();
        if (cooldown) return;

        cooldown = true;
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          triggerNextCard();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          triggerPrevCard();
        }

        setTimeout(() => {
          cooldown = false;
        }, COOLDOWN_MS);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      if (deltaResetTimeout) clearTimeout(deltaResetTimeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLocked, playClickSound]);

  const cycleCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % cards.length);
  };

  const unlockAndNavigate = (e?: React.MouseEvent<HTMLElement>, targetId?: string) => {
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setButtonRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setButtonRect({
        top: typeof window !== 'undefined' ? window.innerHeight - 60 : 600,
        left: 32,
        width: 175,
        height: 48,
      });
    }

    setIsExpanding(true);
    setIsLocked(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (window.__lenis) {
      window.__lenis.start();
    }
    setTimeout(() => {
      router.push(targetId ? `/profile#${targetId}` : '/profile');
    }, 600);
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full bg-transparent text-white overflow-hidden flex flex-col justify-between select-none py-6 px-0 z-10"
    >
      {/* Subtle Grid Ambient Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />

      {/* TOP FLOATING BAR */}
      <header className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto pt-2">
        {/* Top Left Pill: Three dots + Logo with Pop-up Menu */}
        <div className="relative z-50">
          <motion.button
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
              playClickSound(650);
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white shadow-sm border border-black/5 text-xs font-semibold tracking-wider text-black hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95"
          >
            <div className="flex items-center gap-1 text-black/60">
              <MoreHorizontal size={16} />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-black">ANDI INDRA</span>
          </motion.button>

          {/* Pop-up Navigation Menu */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Backdrop overlay to close on click outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 left-0 z-50 w-56 rounded-2xl bg-[#0a0a0c]/95 border border-white/15 backdrop-blur-xl shadow-2xl p-2 flex flex-col gap-1 text-white"
                >
                  <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                    NAVIGATION MENU
                  </div>
                  {MENU_ITEMS.map((item) => (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        playClickSound(550);
                        if (item.targetId === 'contact') {
                          setIsContactHidden(true);
                        }
                        unlockAndNavigate(e, item.targetId);
                      }}
                      className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/10 text-xs font-mono font-bold tracking-wider text-zinc-300 hover:text-white transition-all text-left"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Top Right Pills: Audio Toggle + Book Us */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {/* Sound Synthesizer Pill Button */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClickSound(800);
            }}
            data-cursor="AUDIO"
            className={`flex items-center justify-center h-9 w-9 rounded-full bg-white shadow-sm border border-black/5 text-black hover:scale-105 transition-all duration-200 ${soundEnabled ? 'ring-2 ring-black/20' : ''
              }`}
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* BOOK US CTA Pill Button */}
          <AnimatePresence>
            {!isContactHidden && (
              <motion.button
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                onClick={(e) => {
                  setIsContactHidden(true);
                  playClickSound(650);
                  unlockAndNavigate(e, 'contact');
                }}
                data-cursor="CONTACT"
                className="flex items-center px-5 py-2 rounded-full bg-white shadow-sm border border-black/5 text-black font-extrabold text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                CONTACT ME!
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* CENTER HERO AREA: KINETIC MARQUEE TEXT & INTERACTIVE STACKED DECK */}
      <div className="relative z-10 my-auto flex items-center justify-center w-full min-h-[480px] md:min-h-[580px] py-6">
        {/* AUTOMATICALLY MOVING BACKGROUND TEXT BEHIND THE CARD DECK */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none z-0">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
            className="flex whitespace-nowrap font-extrabold text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[130px] tracking-tighter uppercase text-white/10"
          >
            <span className="pr-8">PORTFOLIO WEBSITE * PORTFOLIO WEBSITE * PORTFOLIO WEBSITE * PORTFOLIO WEBSITE * </span>
            <span className="pr-8">PORTFOLIO WEBSITE * PORTFOLIO WEBSITE * PORTFOLIO WEBSITE * PORTFOLIO WEBSITE * </span>
          </motion.div>
        </div>

        {/* INTERACTIVE 3D CARD STACK DECK WITH TOP & BOTTOM SNEAK PEEKS */}
        <div
          className="relative z-20 w-[84vw] sm:w-[78vw] max-w-[640px] lg:max-w-[720px] aspect-[1.25/1] sm:aspect-[1.4/1] md:aspect-[1.5/1] flex items-center justify-center"
        >
          {/* Render Stacked Layers */}
          <div className="relative w-full h-full flex items-center justify-center">
            {cards.map((card, index) => {
              // Calculate offset relative to activeCardIndex in range [-N/2, N/2]
              let diff = (index - activeCardIndex) % cards.length;
              if (diff > cards.length / 2) diff -= cards.length;
              if (diff < -cards.length / 2) diff += cards.length;

              const isFront = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;

              // Stack layer transformations for sneak peek (Top = Prev, Bottom = Next)
              let translateY = 0;
              let scale = 0.88;
              let opacity = 0;
              let zIndex = 10;

              if (isFront) {
                translateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (isPrev) {
                // Top sneak peek
                translateY = -34;
                scale = 0.93;
                opacity = 0.85;
                zIndex = 20;
              } else if (isNext) {
                // Bottom sneak peek
                translateY = 34;
                scale = 0.93;
                opacity = 0.85;
                zIndex = 20;
              }

              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={false}
                  animate={{
                    y: translateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound(500);
                    if (isPrev) {
                      setActiveCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
                    } else {
                      setActiveCardIndex((prev) => (prev + 1) % cards.length);
                    }
                  }}
                  className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] bg-white shadow-xl border border-black/10 overflow-hidden cursor-pointer transition-shadow duration-300 ${isFront ? 'hover:shadow-2xl' : 'hover:opacity-100'
                    }`}
                >
                  {/* Top Window/Card Bar Grip */}
                  <div className="h-6 sm:h-8 w-full bg-[#18181a] flex items-center justify-center px-4 relative">
                    <div className="w-10 h-1 rounded-full bg-white/20" />
                    <div className="absolute left-4 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    </div>

                    {/* Sneak peek indicator badges on top & bottom cards */}
                    {isPrev && (
                      <span className="absolute right-4 text-[9px] font-mono font-bold text-white/50 uppercase tracking-wider">
                        PREV CARD ▲
                      </span>
                    )}
                    {isNext && (
                      <span className="absolute right-4 text-[9px] font-mono font-bold text-white/50 uppercase tracking-wider">
                        NEXT CARD ▼
                      </span>
                    )}
                  </div>

                  {/* Card Main Artwork */}
                  <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-32px)]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      priority={isFront}
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      unoptimized={card.image.startsWith('http')}
                    />

                    {/* Overlay Badge on Front Card */}
                    {isFront && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between p-3 sm:p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-white/40 shadow-sm text-black">
                        <div>
                          <p className="text-[10px] font-mono font-bold tracking-widest text-black/50 uppercase">
                            {card.subtitle}
                          </p>
                          <h3 className="text-xs sm:text-sm font-extrabold tracking-tight">
                            {card.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                          <span>SCROLL / TAP</span>
                          <span className="text-white/60">({activeCardIndex + 1}/{cards.length})</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM FLOATING BAR: ARROW DOWN BUTTON (LEFT) & ACTION BUTTONS (RIGHT) */}
      <footer className="relative z-30 flex items-end justify-between w-full max-w-7xl mx-auto pb-2">
        {/* Bottom Left: Arrow Down Pill/Button to Move to Next Section */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: buttonRect ? 0 : 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            playClickSound(600);
            unlockAndNavigate(e);
          }}
          data-cursor="SCROLL"
          className={`group flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg border border-black/10 text-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${buttonRect ? 'opacity-0 pointer-events-none' : ''
            }`}
          title="Scroll to next section"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-black/5 group-hover:bg-white/20 transition-colors">
            <ArrowDown size={16} className="animate-bounce group-hover:animate-none" />
          </div>
          <span className="font-mono font-bold text-xs tracking-wider uppercase">NEXT SECTION</span>
        </motion.button>
      </footer>

      {/* EXPANDING BUTTON FULLSCREEN PAGE TRANSITION OVERLAY */}
      <AnimatePresence>
        {buttonRect && (
          <motion.div
            initial={{
              position: 'fixed',
              top: buttonRect.top,
              left: buttonRect.left,
              width: buttonRect.width,
              height: buttonRect.height,
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
            animate={{
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              borderRadius: '0px',
              backgroundColor: '#0a0a0c',
              border: '0px solid rgba(0,0,0,0)',
            }}
            transition={{
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed z-[99999] pointer-events-none flex items-center justify-center overflow-hidden shadow-2xl"
          >
            {/* Button original content morphing out */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 px-5 py-3 text-black font-mono font-bold text-xs uppercase shrink-0"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-black/5">
                <ArrowDown size={16} />
              </div>
              <span>NEXT SECTION</span>
            </motion.div>

            {/* Profile page loading content fading in */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute flex items-center gap-3 font-mono text-sm tracking-widest text-white uppercase font-bold"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>EXPLORING PROFILE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
