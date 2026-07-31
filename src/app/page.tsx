import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { PixelLiquidBg } from '@/components/unlumen-ui/pixel-liquid-bg';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0c] text-[#f5f5f7] flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-90">
        <PixelLiquidBg
          className="w-full h-full"
          darkPalette={['#0a0a0c', '#1e1b4b', '#ffffff00', '#ffffff00', '#ffffff00']}
          lightPalette={['#0a0a0c', '#1e1b4b', '#ffffff00', '#ffffff00', '#ffffff00']}
          pixelSize={12}
          mouseForce={12}
          autoDemo={true}
        />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
