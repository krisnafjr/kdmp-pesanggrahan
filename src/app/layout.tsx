// src/app/layout.tsx
import type { Metadata } from "next";
import { Lato, Merriweather } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Koperasi Merah Putih Pesanggrahan",
  description: "Membangun ekonomi kerakyatan yang mandiri dan sejahtera.",
  icons: {
    icon: "/favicon.png", // atau bisa "/favicon.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${lato.variable} ${merriweather.variable} font-sans`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
