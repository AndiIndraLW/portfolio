'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, ChevronLeft, ChevronRight, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { Project } from '@/data/portfolioData';
import { fetchSelectedWorks } from '@/lib/api';

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visibleMobileCount, setVisibleMobileCount] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  const xMotion = useMotionValue(0);
  const smoothX = useSpring(xMotion, { damping: 30, stiffness: 250 });

  const [maxScroll, setMaxScroll] = useState(0);
  const currentPosRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsError(false);

    fetchSelectedWorks()
      .then((data) => {
        if (isMounted) {
          setProjects(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching selected works:', err);
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const updateMaxScroll = () => {
    if (trackRef.current && !isMobile) {
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const padding = 64;
      const max = Math.max(0, trackWidth - windowWidth + padding);
      setMaxScroll(max);
    }
  };

  useEffect(() => {
    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, [projects, isMobile]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 140 && rect.bottom >= window.innerHeight - 140;
      if (!isInView) return;

      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 2) return;

      const current = currentPosRef.current;

      // Scroll Down / Next
      if (delta > 0) {
        if (current < maxScroll - 2) {
          e.preventDefault();
          const next = Math.min(maxScroll, current + delta * 1.2);
          currentPosRef.current = next;
          xMotion.set(-next);
        }
      }
      // Scroll Up / Prev
      else if (delta < 0) {
        if (current > 2) {
          e.preventDefault();
          const next = Math.max(0, current + delta * 1.2);
          currentPosRef.current = next;
          xMotion.set(-next);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.innerWidth < 768) return;
      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 140 && rect.bottom >= window.innerHeight - 140;
      if (!isInView) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const current = currentPosRef.current;

      if (deltaY > 0 && current < maxScroll - 2) {
        e.preventDefault();
        const next = Math.min(maxScroll, current + deltaY * 1.3);
        currentPosRef.current = next;
        touchStartY = currentY;
        xMotion.set(-next);
      } else if (deltaY < 0 && current > 2) {
        e.preventDefault();
        const next = Math.max(0, current + deltaY * 1.3);
        currentPosRef.current = next;
        touchStartY = currentY;
        xMotion.set(-next);
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
    };
  }, [maxScroll, xMotion, isMobile]);

  const handleNext = () => {
    const next = Math.min(maxScroll, currentPosRef.current + 480);
    currentPosRef.current = next;
    xMotion.set(-next);
  };

  const handlePrev = () => {
    const next = Math.max(0, currentPosRef.current - 480);
    currentPosRef.current = next;
    xMotion.set(-next);
  };

  const handleLoadMore = () => {
    setVisibleMobileCount((prev) => prev + 4);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 min-h-screen flex flex-col justify-center relative z-10 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 flex flex-row items-end justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <Sparkles size={14} className="text-white" />
            <span>01 // FEATURED SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white">
            SELECTED <span className="text-outline">WORKS</span>
          </h2>
        </div>

        {/* Navigation Controls (Desktop only) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            title="Previous Card"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            title="Next Card"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-zinc-400 font-mono text-sm">
          <Loader2 className="animate-spin text-white" size={20} />
          <span>Loading selected works...</span>
        </div>
      ) : isError ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl glass-card border border-rose-500/20 text-zinc-400 text-sm flex items-center gap-3">
            <AlertCircle size={20} className="text-rose-400 shrink-0" />
            <span>Unable to load selected works at this time. Please check backend API connection.</span>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl glass-card border border-white/10 text-zinc-400 text-sm font-mono">
            No selected works currently available.
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Vertical List with Load More */}
          <div className="flex md:hidden flex-col gap-6 px-4 w-full">
            {projects.slice(0, visibleMobileCount).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.2) }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}

            {visibleMobileCount < projects.length && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleLoadMore}
                  className="group w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all flex items-center justify-center gap-2 active:scale-98 shadow-lg backdrop-blur-sm"
                >
                  <span>Load More Works</span>
                  <ChevronDown size={16} className="text-zinc-400 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Desktop Horizontal Track */}
          <div className="hidden md:block w-full overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              ref={trackRef}
              style={{ x: smoothX }}
              drag="x"
              dragConstraints={{ left: -maxScroll, right: 0 }}
              onDragEnd={(_, info) => {
                const currentX = xMotion.get();
                currentPosRef.current = Math.min(maxScroll, Math.max(0, -currentX));
              }}
              className="flex gap-6 sm:gap-8 px-4 sm:px-8 md:px-12 w-max"
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}

// 3D Tilt Hover Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / (rect.height / 2)) * -8;
    const rotateY = (x / (rect.width / 2)) * 8;
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group glass-card glass-card-glow rounded-2xl overflow-hidden flex flex-col justify-between w-full md:w-[500px] md:flex-shrink-0"
    >
      {/* Thumbnail Container */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-900 flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-85" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center gap-2">
              {project.title}
            </h3>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 text-zinc-400 hover:border-white hover:text-white transition-colors"
                title="Live Preview"
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
          <p className="text-xs font-mono text-zinc-400 mb-3">{project.tagline}</p>
          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-4 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tags & Action Links Footer */}
        <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-mono font-bold hover:scale-105 transition-transform"
                >
                  <span>Live</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

