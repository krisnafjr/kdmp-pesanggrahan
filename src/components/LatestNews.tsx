// src/components/LatestNews.tsx
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // Impor client dan urlFor dari konfigurasi Sanity Anda

// 1. Definisikan tipe data untuk berita dari Sanity (TypeScript)
type Berita = {
    _id: string;
    judul: string;
    slug: {
        current: string;
    };
    excerpt: string; // Pastikan Anda memiliki field 'excerpt' di skema Sanity
    tanggalPublikasi: string;
    gambarUtama: any; // Tipe 'any' untuk kemudahan, bisa diperketat jika perlu
};

// 2. Fungsi untuk mengambil data dari Sanity
async function getLatestNews() {
    // Ambil 4 berita terbaru, diurutkan berdasarkan tanggal publikasi
    const query = `*[_type == "berita"] | order(tanggalPublikasi desc)[0...4] {
        _id,
        judul,
        slug,
        excerpt,
        tanggalPublikasi,
        gambarUtama
    }`;

    const data: Berita[] = await client.fetch(query);
    return data;
}

// 3. Ubah komponen menjadi 'async' untuk bisa menggunakan 'await'
export default async function LatestNews() {
    const newsData = await getLatestNews();

    // Jika tidak ada berita, tampilkan pesan atau layout kosong
    if (!newsData || newsData.length === 0) {
        return (
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Berita Terbaru</h2>
                    <p className="text-gray-500 mt-4">Saat ini belum ada berita untuk ditampilkan.</p>
                </div>
            </section>
        );
    }
    
    // Ambil berita pertama sebagai berita utama
    const featuredNews = newsData[0];
    // Ambil berita berikutnya (hingga 3) sebagai berita sekunder
    const otherNews = newsData.slice(1, 4);

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                
                {/* Judul Bagian */}
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Berita & Kegiatan Terbaru
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Ikuti perkembangan dan aktivitas terkini dari Koperasi Merah Putih.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 rounded-full"></div>
                </div>

                {/* Grid Layout Editorial */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    
                    {/* KOLOM KIRI: BERITA UTAMA */}
                    <Link href={`/berita/${featuredNews.slug.current}`}>
                        <div className="bg-white rounded-xl overflow-hidden group">
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={urlFor(featuredNews.gambarUtama).url()}
                                    alt={featuredNews.judul}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-2">
                                    {new Date(featuredNews.tanggalPublikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 hover:text-red-600 transition-colors">{featuredNews.judul}</h3>
                                <p className="text-gray-600 line-clamp-3">{featuredNews.excerpt}</p>
                            </div>
                        </div>
                    </Link>

                    {/* KOLOM KANAN: DAFTAR BERITA LAINNYA */}
                    <div className="flex flex-col gap-8">
                        {otherNews.map((newsItem) => (
                            <Link href={`/berita/${newsItem.slug.current}`} key={newsItem._id}>
                                <div className="flex gap-5 items-center group">
                                    <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                                        <Image
                                            src={urlFor(newsItem.gambarUtama).url()}
                                            alt={newsItem.judul}
                                            fill
                                            style={{objectFit: 'cover'}}
                                            className="transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">
                                            {new Date(newsItem.tanggalPublikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                        <h4 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                                            {newsItem.judul}
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