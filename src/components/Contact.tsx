'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, Sparkles, ArrowUpRight, Globe, Share2 } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Trigger monochrome confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#52525b'],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Links */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
              <Sparkles size={14} className="text-white" />
              <span>05 // LET'S TALK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase text-white mb-6">
              START A <span className="text-outline">PROJECT</span>
            </h2>

            <p className="text-zinc-400 text-base leading-relaxed mb-8">
              Have an idea, project inquiry, or looking for a creative technologist? Send a message and let's craft something remarkable.
            </p>

            {/* Quick Copy Email Card */}
            <div className="glass-card p-6 rounded-2xl mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/10 text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400">Direct Email</div>
                  <div className="text-sm font-mono font-bold text-white">{PERSONAL_INFO.email}</div>
                </div>
              </div>

              <button
                onClick={copyEmail}
                data-cursor="COPY"
                className="p-2.5 rounded-xl border border-white/10 text-zinc-300 hover:text-white hover:border-white transition-colors"
                title="Copy Email to Clipboard"
              >
                {copied ? <Check size={18} className="text-white" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                Connect Online
              </div>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3.5 rounded-xl flex items-center justify-between text-zinc-300 hover:text-white hover:border-white/30 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={16} /> GitHub
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3.5 rounded-xl flex items-center justify-between text-zinc-300 hover:text-white hover:border-white/30 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Share2 size={16} /> LinkedIn
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3.5 rounded-xl flex items-center justify-between text-zinc-300 hover:text-white hover:border-white/30 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={16} /> Twitter / X
                  </span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={PERSONAL_INFO.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3.5 rounded-xl flex items-center justify-between text-zinc-300 hover:text-white hover:border-white/30 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Share2 size={16} /> Dribbble
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card glass-card-glow p-8 sm:p-10 rounded-3xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Delivered!</h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', projectType: 'Web Development', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-white font-mono text-xs hover:bg-white/20 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono text-sm transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Project Type
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-white/10 text-white focus:outline-none focus:border-white font-mono text-sm transition-colors"
                    >
                      <option value="Web Development">Web Development & Next.js</option>
                      <option value="Creative Motion & WebGL">Creative Motion & Animations</option>
                      <option value="UI/UX & Design System">UI/UX & Design System</option>
                      <option value="Full Project Collaboration">Full Project Collaboration</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project goals, timelines, and ideas..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono text-sm transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    data-cursor="SEND"
                    className="w-full py-4 rounded-xl bg-white text-black font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
