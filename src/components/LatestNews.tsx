// src/components/LatestNews.tsx (Layout Baru yang Lebih Modern)

import Image from "next/image";
import Link from "next/link";

// Data berita statis (tidak perlu diubah)
const newsData = [
    {
        title: "Rapat Anggota Tahunan 2025 Sukses Digelar",
        excerpt: "Seluruh anggota Koperasi Merah Putih berkumpul untuk membahas laporan tahunan dan rencana strategis ke depan.",
        image: "/berita_posyandu.jpg",
        date: "05 Juli 2025",
        slug: "/berita/rapat-anggota-2025",
    },
    {
        title: "Pelatihan Pemasaran Digital untuk Anggota UMKM",
        excerpt: "Bekerja sama dengan universitas lokal, koperasi memberikan pelatihan untuk meningkatkan penjualan produk anggota.",
        image: "/berita_hepatitis.jpg",
        date: "28 Juni 2025",
        slug: "/berita/pelatihan-pemasaran-digital",
    },
    {
        title: "Panen Raya Padi Organik Desa Pesanggrahan",
        excerpt: "Anggota petani merayakan hasil panen padi organik yang melimpah, menunjukkan keberhasilan program pertanian berkelanjutan.",
        image: "/berita_agustus.jpg",
        date: "15 Juni 2025",
        slug: "/berita/panen-raya-padi-organik",
    },
        {
        title: "Panen Raya Padi Organik Desa Pesanggrahan",
        excerpt: "Anggota petani merayakan hasil panen padi organik yang melimpah, menunjukkan keberhasilan program pertanian berkelanjutan.",
        image: "/berita_agustus.jpg",
        date: "15 Juni 2025",
        slug: "/berita/panen-raya-padi-organik",
    },
];

// Ambil berita pertama sebagai berita utama
const featuredNews = newsData[0];
// Ambil dua berita berikutnya sebagai berita sekunder
const otherNews = newsData.slice(1, 4);


export default function LatestNews() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                
                {/* Judul Bagian (tidak berubah) */}
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Berita & Kegiatan Terbaru
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Ikuti perkembangan dan aktivitas terkini dari Koperasi Merah Putih.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 rounded-full"></div>
                </div>

                {/* Grid Layout Editorial Baru */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    
                    {/* KOLOM KIRI: BERITA UTAMA */}
                    <Link href={featuredNews.slug}>
                        <div className="bg-white rounded-xl overflow-hidden group">
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={featuredNews.image}
                                    alt={featuredNews.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-2">{featuredNews.date}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-red-600 transition-colors">{featuredNews.title}</h3>
                                <p className="text-gray-600 line-clamp-3">{featuredNews.excerpt}</p>
                            </div>
                        </div>
                    </Link>

                    {/* KOLOM KANAN: DAFTAR BERITA LAINNYA */}
                    <div className="flex flex-col gap-8">
                        {otherNews.map((newsItem) => (
                            <Link href={newsItem.slug} key={newsItem.title}>
                                <div className="flex gap-5 items-center group">
                                    <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                                        <Image
                                            src={newsItem.image}
                                            alt={newsItem.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">{newsItem.date}</p>
                                        <h4 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                                            {newsItem.title}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}