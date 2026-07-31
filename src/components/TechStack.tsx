'use client';

import { TECH_SKILLS } from '@/data/portfolioData';
import { Sparkles } from 'lucide-react';

export default function TechStack() {
  const marqueeItems = [...TECH_SKILLS, ...TECH_SKILLS];

  return (
    <section id="tech-stack" className="py-20 bg-zinc-950/40 relative overflow-hidden border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
          <Sparkles size={14} className="text-white" />
          <span>02 // CORE COMPETENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-white">
          TECH STACK <span className="text-outline">& TOOLING</span>
        </h2>
      </div>

      {/* Ticker Row 1 - Left Marquee */}
      <div className="relative w-full overflow-hidden mb-6 py-3 bg-white/[0.02]">
        <div className="animate-marquee-left flex items-center gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-[#0a0a0c] backdrop-blur-md hover:border-white/40 transition-colors shrink-0"
            >
              <span className="text-xl filter grayscale">{item.icon}</span>
              <span className="font-mono font-bold text-sm text-white tracking-wider">
                {item.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-white/5">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker Row 2 - Right Marquee */}
      <div className="relative w-full overflow-hidden py-3 bg-white/[0.02]">
        <div className="animate-marquee-right flex items-center gap-6">
          {marqueeItems.slice().reverse().map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-[#0a0a0c] backdrop-blur-md hover:border-white/40 transition-colors shrink-0"
            >
              <span className="text-xl filter grayscale">{item.icon}</span>
              <span className="font-mono font-bold text-sm text-white tracking-wider">
                {item.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-white/5">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
