"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityDocument } from "next-sanity";
import { motion, Variants } from "framer-motion"; // <-- 1. Impor tipe Variants

// Definisikan varian animasi dengan tipe yang eksplisit
const fadeInAnimation: Variants = { // <-- 2. Terapkan tipe Variants di sini
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.5,
            ease: "easeInOut", // Sekarang TypeScript tahu ini adalah tipe Easing yang valid
        },
    }),
};

export default function ProductDetailLayout({ produk }: { produk: SanityDocument }) {
    return (
        <article className="container mx-auto px-6 py-16 overflow-hidden">
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                
                {/* Kolom Kiri: Gambar (lebih besar) */}
                <motion.div 
                    className="md:col-span-3 relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl"
                    variants={fadeInAnimation}
                    initial="initial"
                    animate="animate"
                    custom={0}
                >
                    <Image
                        src={urlFor(produk.gambarProduk).url()}
                        alt={produk.namaProduk}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </motion.div>

                {/* Kolom Kanan: Detail Informasi */}
                <div className="md:col-span-2 flex flex-col">
                    <motion.span 
                        className="text-md font-semibold text-red-600 uppercase tracking-wider"
                        variants={fadeInAnimation}
                        initial="initial"
                        animate="animate"
                        custom={1}
                    >
                        {produk.kategori}
                    </motion.span>
                    
                    <motion.h1 
                        className="text-4xl lg:text-5xl font-extrabold text-gray-900 my-3"
                        variants={fadeInAnimation}
                        initial="initial"
                        animate="animate"
                        custom={2}
                    >
                        {produk.namaProduk}
                    </motion.h1>

                    <motion.div 
                        className="mt-4 border-t pt-4"
                        variants={fadeInAnimation}
                        initial="initial"
                        animate="animate"
                        custom={3}
                    >
                        <p className="text-gray-600 text-lg leading-relaxed">{produk.deskripsi}</p>
                    </motion.div>
                </div>
            </div>
        </article>
    );
}