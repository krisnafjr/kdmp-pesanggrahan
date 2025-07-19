// src/components/Hero.tsx
"use client"; // Diperlukan untuk animasi

import Link from "next/link";
import Image from "next/image"; // Impor Image untuk gambar latar
import { motion, Variants } from "framer-motion"; // Impor Framer Motion

// SVG Ikon untuk tombol Hubungi Kami
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

// Definisi animasi untuk pembungkus
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Jeda antar animasi anak
        },
    },
};

// Definisi animasi untuk setiap item
const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export default function Hero() {
    return (
        <section 
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white overflow-hidden"
        >
            {/* Gambar Latar dengan Animasi Zoom */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 25, ease: "easeInOut" }}
            >
                <Image
                    src="/pesanggrahan.jpg"
                    alt="Latar belakang Desa Pesanggrahan"
                    fill
                    priority
                    className="object-cover"
                />
            </motion.div>

            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Konten Teks dengan Animasi */}
            <motion.div 
                className="relative z-10 text-center px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Gaya font dan teks Anda tidak diubah sama sekali */}
                <motion.h1 
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight"
                >
                    Selamat Datang di
                    <span className="block mt-2 text-red-500">Desa
                        <span className="text-red-500"> Pesanggrahan</span>
                    </span>
                </motion.h1>
                
                <motion.p 
                    variants={itemVariants}
                    className="mt-8 text-base md:text-lg font-light max-w-2xl mx-auto"
                >
                    Desa yang indah dengan kearifan lokal dan potensi alam yang melimpah, menuju masa depan yang berkelanjutan.
                </motion.p>

                <motion.div 
                    variants={itemVariants}
                    className="mt-12 flex flex-wrap justify-center gap-4"
                >
                    <Link 
                        href="/tentang-kami" 
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                        Tentang Desa →
                    </Link>
                    <Link 
                        href="/hubungi-kami" 
                        className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                        <PhoneIcon />
                        Hubungi Kami
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
