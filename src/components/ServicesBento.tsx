'use client';

import { useState, useEffect } from 'react';
import { Service } from '@/data/portfolioData';
import { fetchServices } from '@/lib/api';
import { Code2, Sparkles, Layers, Cpu, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

function getServiceIcon(title: string, index: number) {
  const lower = title.toLowerCase();
  if (lower.includes('web') || lower.includes('dev') || lower.includes('code')) return Code2;
  if (lower.includes('creative') || lower.includes('motion') || lower.includes('anim')) return Sparkles;
  if (lower.includes('ui') || lower.includes('ux') || lower.includes('design') || lower.includes('layer')) return Layers;
  if (lower.includes('ai') || lower.includes('tool') || lower.includes('architecture') || lower.includes('cpu')) return Cpu;

  const fallbackIcons = [Code2, Sparkles, Layers, Cpu];
  return fallbackIcons[index % fallbackIcons.length];
}

export default function ServicesBento() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsError(false);

    fetchServices()
      .then((data) => {
        if (isMounted) {
          setServices(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        if (isMounted) {
          setIsError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
        {isLoading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-zinc-400 font-mono text-sm">
            <Loader2 className="animate-spin text-white" size={20} />
            <span>Loading services & solutions...</span>
          </div>
        ) : isError ? (
          <div className="p-6 rounded-2xl glass-card border border-rose-500/20 text-zinc-400 text-sm flex items-center gap-3">
            <AlertCircle size={20} className="text-rose-400 shrink-0" />
            <span>Unable to load services at this time. Please check backend API connection.</span>
          </div>
        ) : services.length === 0 ? (
          <div className="p-6 rounded-2xl glass-card border border-white/10 text-zinc-400 text-sm font-mono">
            No services currently available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = getServiceIcon(service.title, index);
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
        )}
      </div>
    </section>
  );
}
