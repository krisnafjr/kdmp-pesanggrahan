"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { motion, Variants } from "framer-motion";

type Berita = {
    _id: string;
    judul: string;
    slug: { current: string };
    tanggalPublikasi: string;
    gambarUtama: any;
    excerpt: string; // Tambahkan excerpt untuk tampilan yang lebih kaya
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function BeritaList({ semuaBerita }: { semuaBerita: Berita[] }) {
    const beritaUtama = semuaBerita[0];
    const beritaLainnya = semuaBerita.slice(1);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
            {/* Berita Utama - Dibuat lebih dominan */}
            {beritaUtama && (
                <motion.div variants={itemVariants} className="mb-16">
                    <Link href={`/berita/${beritaUtama.slug.current}`} className="group block">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg">
                                <Image 
                                    src={urlFor(beritaUtama.gambarUtama).url()} 
                                    alt={beritaUtama.judul} 
                                    fill 
                                    style={{objectFit: 'cover'}}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col py-4">
                                <span className="text-sm font-bold text-red-600 mb-3 uppercase tracking-wider">Berita Terbaru</span>
                                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 line-clamp-3 leading-tight group-hover:text-red-700 transition-colors">
                                    {beritaUtama.judul}
                                </h2>
                                <p className="text-slate-600 text-base line-clamp-3 mb-4">
                                    {beritaUtama.excerpt}
                                </p>
                                <p className="text-slate-500 text-sm font-medium">
                                    {new Date(beritaUtama.tanggalPublikasi).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}

            {/* Grid Berita Lainnya - Desain kartu yang lebih bersih */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {beritaLainnya.map((item) => (
                    <motion.div 
                        key={item._id}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Link href={`/berita/${item.slug.current}`} className="group block">
                            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4">
                                <Image 
                                    src={urlFor(item.gambarUtama).url()} 
                                    alt={item.judul} 
                                    fill 
                                    style={{objectFit: 'cover'}}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 h-14 group-hover:text-red-600 transition-colors">
                                    {item.judul}
                                </h2>
                                <p className="text-slate-500 text-sm font-medium">
                                    {new Date(item.tanggalPublikasi).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}