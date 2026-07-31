'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import ServicesBento from '@/components/ServicesBento';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen bg-[#0a0a0c] text-[#f5f5f7] flex flex-col"
    >
      <Navbar />
      <Projects />
      <TechStack />
      <ServicesBento />
      <Experience />
      <Contact />
      <Footer />
    </motion.main>
  );
}
