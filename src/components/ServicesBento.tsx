'use client';

import { SERVICES } from '@/data/portfolioData';
import { Code2, Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Code2,
  Sparkles,
  Layers,
  Cpu,
};

export default function ServicesBento() {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
            <Sparkles size={14} className="text-white" />
            <span>03 // CAPABILITIES & PROCESS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white">
            SERVICES & <span className="text-outline">SOLUTIONS</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.iconName as keyof typeof iconMap] || Code2;
            return (
              <div
                key={service.id}
                data-cursor="SERVICE"
                className="group glass-card glass-card-glow p-8 rounded-3xl relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-3xl font-extrabold text-white">
                      {service.number}
                    </span>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <IconComponent size={24} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features Check List */}
                <div className="pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <CheckCircle2 size={14} className="text-white shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
