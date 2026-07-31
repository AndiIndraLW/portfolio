'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code, ExternalLink, X, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '@/data/portfolioData';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack Apps', 'Creative AI', 'UI/UX Systems', 'Mobile'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
              <Sparkles size={14} className="text-white" />
              <span>01 // FEATURED SHOWCASE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white">
              SELECTED <span className="text-outline">WORKS</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="FILTER"
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'glass-card text-zinc-400 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={(p) => setActiveProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// 3D Tilt Hover Project Card Component
function ProjectCard({
  project,
  onOpenModal,
}: {
  project: Project;
  onOpenModal: (p: Project) => void;
}) {
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
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(project)}
      data-cursor="VIEW"
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group glass-card glass-card-glow rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      {/* Thumbnail Container */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-900">
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
          <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md text-zinc-400 border border-white/10">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center gap-2">
              {project.title}
            </h3>
            <div className="p-2 rounded-full border border-white/10 text-zinc-400 group-hover:border-white group-hover:text-white transition-colors">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <p className="text-xs font-mono text-zinc-400 mb-3">{project.tagline}</p>
          <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tags Footer */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400 border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Full Detail Modal
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 border border-white/20 relative shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-black">
            {project.category}
          </span>
          {project.client && (
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-zinc-300">
              Client: {project.client}
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-zinc-300">
            Year: {project.year}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{project.title}</h2>
        <p className="text-sm font-mono text-zinc-400 mb-6">{project.tagline}</p>

        {/* Preview Banner Image */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 h-64 sm:h-96">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Long Description */}
        <div className="prose prose-invert max-w-none mb-8 text-zinc-300 leading-relaxed text-sm sm:text-base">
          <p>{project.longDescription}</p>
        </div>

        {/* Project Metrics / Stats Grid */}
        {project.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {project.stats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs uppercase hover:scale-105 transition-transform"
            >
              <span>Live Website</span>
              <ExternalLink size={16} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-white font-mono text-xs uppercase hover:border-white/40 transition-all"
            >
              <span>GitHub Code</span>
              <Code size={16} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
