import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Mengaktifkan mode Static HTML Export
  trailingSlash: true, // Membuat struktur folder /profile/index.html agar tidak muncul folder listing
  images: {
    unoptimized: true, // Diperlukan agar komponen <Image /> bekerja pada static export
  },
};

export default nextConfig;
