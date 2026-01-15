"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Ikon untuk Hamburger Menu
const MenuIcon = () => ( <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg> );
const CloseIcon = () => ( <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/produk", label: "Produk" },
        { href: "/berita", label: "Berita" },
        { href: "/tentang-kami", label: "Tentang Kami" },
    ];

    useEffect(() => {
        const handleScroll = () => { setScrolled(window.scrollY > 20); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const menuItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/80 shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2.5">
                        <Image 
                            src="/kutorejo.png"
                            width={40} 
                            height={40} 
                            alt="Logo Koperasi"
                            className="transition-transform duration-300 hover:scale-110"
                        />
                        <span className={`text-xl font-semibold transition-colors duration-300 ${scrolled || pathname !== '/' ? 'text-slate-800' : 'text-white'}`}>
                            KDMP Pesanggrahan
                        </span>
                    </Link>

                    {/* Navigasi Desktop */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link key={link.href} href={link.href} className={`text-base font-medium transition-colors duration-300 relative group ${scrolled || pathname !== '/' ? 'text-slate-600 hover:text-red-600' : 'text-gray-200 hover:text-white'} ${isActive && '!text-red-600 font-semibold'}`}>
                                    <span>{link.label}</span>
                                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive && 'scale-x-100'}`}></span>
                                </Link>
                            );
                        })}
                        
                        {/* === Tombol Login Admin (Desktop) === */}
                        <Link href="/studio" className={`ml-4 px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${scrolled || pathname !== '/' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                            Login Admin
                        </Link>
                    </div>

                    {/* Tombol Hamburger (Mobile) */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors duration-300 ${scrolled || pathname !== '/' ? 'text-slate-800' : 'text-white'}`}>
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Menu Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white p-8 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col gap-y-8 text-xl font-semibold text-slate-800 mt-16"
                            >
                                {navLinks.map((link) => (
                                    <motion.div key={link.href} variants={menuItemVariants}>
                                        <Link href={link.href} onClick={() => setIsOpen(false)} className={`hover:text-red-600 ${pathname === link.href && 'text-red-600'}`}>
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                {/* === Link Login Admin (Mobile) === */}
                                <motion.div variants={menuItemVariants} className="border-t pt-8 mt-4">
                                     <Link href="/studio" onClick={() => setIsOpen(false)} className="text-base text-slate-600 hover:text-red-600">
                                        Login Admin
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
