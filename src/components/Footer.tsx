'use client';

import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 relative z-10 border-t border-white/10 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Giant Kinetic Footer Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 gap-8">
          <div>
            <span className="text-xs font-mono text-zinc-400 block mb-2">
              DESIGNED & CODED WITH PRECISION
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase text-white leading-none">
              ANDI INDRA <span className="text-outline">LESTYA WICAKSONO</span>
            </h2>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="group flex items-center gap-3 px-6 py-3 rounded-full glass-card text-xs font-mono text-white hover:border-white transition-colors self-start md:self-auto"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={16} className="text-white transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Footer Bottom Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Built with Next.js 15 & Framer Motion</span>
            <span>•</span>
            <span className="text-zinc-400">Jakarta, ID</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
