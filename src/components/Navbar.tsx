// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// Komponen Ikon Hamburger
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

// Komponen Ikon Tutup (X)
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Varian animasi (tidak berubah)
const navVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
        },
    },
};

const navItemVariants: Variants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    
    // State baru untuk melacak link yang di-hover atau aktif
    const [activeLink, setActiveLink] = useState(pathname);

    // Sinkronkan activeLink dengan pathname saat halaman berubah
    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    const navLinks = [
        { href: "/", label: "Beranda" },
        { href: "/berita", label: "Berita" },
        { href: "/produk", label: "Produk" },
        // { href: "/galeri", label: "Galeri" },
        // { href: "/kontak", label: "Kontak" },
    ];

    return (
        <>
            <motion.nav 
                className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
                variants={navVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    
                    <motion.div variants={navItemVariants}>
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/kutorejo.png"
                                    alt="Logo Desa Pesanggrahan"
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                                    sizes="48px"
                                />
                            </div>
                            <span className="text-xl font-semibold text-gray-800 font-serif group-hover:text-primary transition-colors">
                                Desa Pesanggrahan
                            </span>
                        </Link>
                    </motion.div>

                    {/* --- MENU NAVIGASI DESKTOP DENGAN HOVER BARU --- */}
                    <motion.ul 
                        variants={navVariants} 
                        className="hidden md:flex items-center space-x-2"
                        onMouseLeave={() => setActiveLink(pathname)} // Reset saat kursor meninggalkan area menu
                    >
                        {navLinks.map((link) => (
                            <motion.li 
                                key={link.href} 
                                variants={navItemVariants} 
                                onMouseEnter={() => setActiveLink(link.href)} // Set link yang di-hover sebagai aktif
                            >
                                <Link href={link.href}
                                    className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-300
                                        ${activeLink === link.href ? 'text-red-500' : 'text-gray-700'}`}
                                >
                                    {/* Latar belakang yang akan beranimasi */}
                                    {activeLink === link.href && (
                                        <motion.div
                                            className="absolute inset-0 bg-primary rounded-lg"
                                            layoutId="background"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                    
                    <motion.div variants={navItemVariants} className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 z-50">
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Overlay Menu Mobile (tidak berubah) */}
            <div className={`fixed inset-0 z-30 bg-white transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="container mx-auto px-6 pt-24 flex flex-col items-center justify-center text-center h-full">
                    <ul className="flex flex-col space-y-8">
                        {navLinks.map((link) => (
                             <li key={link.href}>
                                <Link href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-3xl font-bold transition-colors duration-300 ${
                                        pathname === link.href ? 'text-primary' : 'text-gray-800 hover:text-primary'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>W
            </div>
        </>
    );
}
