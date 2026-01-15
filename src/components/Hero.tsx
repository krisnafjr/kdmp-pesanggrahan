"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Ikon untuk tombol, kita buat lebih generik jika ingin dipakai di tempat lain
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

// Varian animasi untuk container utama
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.25 }, // Jeda antar animasi anak sedikit lebih cepat
    },
};

// INI YANG BENAR
const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "circOut", // <-- Gunakan nama easing standar yang elegan
        },
    },
};

export default function Hero() {
    // URL WhatsApp (bisa juga diambil dari Sanity nanti)
    const whatsappUrl = "https://wa.me/6281216080845?text=Halo,%20saya%20tertarik%20dengan%20Koperasi%20Merah%20Putih.";

    return (
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
            
            {/* Gambar Latar dengan Animasi Zoom yang Lebih Halus */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeInOut" }}
            >
                <Image
                    src="/pesanggrahan.jpg" // Ganti dengan gambar yang lebih relevan dengan koperasi jika ada
                    alt="Latar Belakang Koperasi Merah Putih"
                    fill
                    priority
                    className="object-cover"
                />
            </motion.div>

            {/* Overlay Gradien yang Lebih Elegan */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0"></div>

            {/* Konten Teks dengan Animasi */}
            <motion.div 
                className="relative z-10 text-center px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    variants={itemVariants}
                    className="text-4xl md:text-6xl lg:text-6xl font-extrabold tracking-tight text-shadow-md" // Tambah text-shadow
                >
                    Koperasi Merah Putih
                    <span className="block mt-2 text-red-500">KDMP Pesanggrahan</span>
                </motion.h1>
                
                <motion.p 
                    variants={itemVariants}
                    className="mt-6 text-base md:text-lg font-light max-w-2xl mx-auto text-gray-200 text-shadow"
                >
                    Koperasi Merah Putih adalah motor penggerak ekonomi Desa Pesanggrahan, memberdayakan anggota melalui produk dan layanan yang inovatif.
                </motion.p>

                <motion.div 
                    variants={itemVariants}
                    className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <Link 
                        href="/produk" 
                        className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
                    >
                        Lihat Produk Kami
                        <ArrowRightIcon />
                    </Link>
                    <Link 
                        href={whatsappUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white/10 border-2 border-white/50 text-white font-semibold rounded-lg shadow-lg backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    >
                        Hubungi Pengurus
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
