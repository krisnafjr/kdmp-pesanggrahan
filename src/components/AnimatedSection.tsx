// src/components/AnimatedSection.tsx
"use client"; // Penting untuk Framer Motion di Next.js App Router

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface Props {
    children: React.ReactNode;
    className?: string; // Opsional untuk gaya tambahan
}

export default function AnimatedSection({ children, className }: Props) {
    const ref = useRef(null);
    // useInView akan mendeteksi kapan elemen masuk ke dalam viewport.
    // { once: true } berarti animasi hanya akan diputar sekali.
    // { amount: 0.2 } berarti animasi akan diputar ketika 20% dari elemen terlihat.
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Definisi varian animasi untuk Framer Motion
    const variants: Variants = {
        hidden: { opacity: 0, y: 50 }, // Kondisi awal: tidak terlihat dan sedikit di bawah
        visible: {
            opacity: 1, // Kondisi akhir: terlihat penuh
            y: 0,       // Kembali ke posisi asli
            transition: {
                duration: 0.8, // Durasi animasi 0.8 detik
                // Kurva easing untuk transisi yang lebih halus dan 'bouncy'
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        },
    };

    return (
        <motion.section
            ref={ref} // Tautkan ref ke elemen motion
            className={className}
            variants={variants} // Terapkan varian animasi
            initial="hidden" // Kondisi awal animasi
            animate={isInView ? "visible" : "hidden"} // Animasi berdasarkan apakah elemen terlihat
        >
            {children} {/* Konten yang akan dianimasikan */}
        </motion.section>
    );
}