import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0c] text-[#f5f5f7] flex flex-col">
      <Navbar />
      <Hero />
    </main>
  );
}
