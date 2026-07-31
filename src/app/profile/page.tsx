'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import ServicesBento from '@/components/ServicesBento';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { AuroraBars } from '@/components/unlumen-ui/aurora-bars';

export default function ProfilePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen bg-[#0a0a0c] text-[#f5f5f7] flex flex-col"
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-90">
        <AuroraBars background="transparent" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <Projects />
        <TechStack />
        <ServicesBento />
        <Contact />
        <Footer />
      </div>
    </motion.main>
  );
}

