'use client';

import { EXPERIENCES } from '@/data/portfolioData';
import { MapPin, Sparkles, CheckCircle } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
            <Sparkles size={14} className="text-white" />
            <span>04 // CAREER & MILESTONES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white">
            WORK <span className="text-outline">HISTORY</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-12 ml-2 sm:ml-4">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a0c] border-2 border-white group-hover:scale-125 group-hover:bg-white transition-all duration-300" />

              <div className="glass-card p-6 sm:p-8 rounded-3xl">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-1">
                      <span className="text-white font-bold">{exp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-white" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-white/10 text-white border border-white/20">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Accomplishments */}
                <div className="space-y-2 mb-6">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-mono text-zinc-400">
                      <CheckCircle size={14} className="text-white shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Skills Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
