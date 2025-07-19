// src/app/layout.tsx

import type { Metadata } from "next";
// 1. Impor font Merriweather dan Lato
import { Lato, Merriweather } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

// 2. Konfigurasi font Lato untuk isi teks
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-lato', // Siapkan sebagai CSS Variable
});

// 3. Konfigurasi font Merriweather untuk judul
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: '--font-merriweather', // Siapkan sebagai CSS Variable
});

export const metadata: Metadata = {
  title: "Koperasi Merah Putih",
  description: "Membangun ekonomi kerakyatan yang mandiri dan sejahtera.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 4. Gabungkan variabel font di body */}
      <body className={`${lato.variable} ${merriweather.variable} font-sans`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}