import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import BeritaList from "@/components/BeritaList";

type Berita = {
    _id: string;
    judul: string;
    slug: { current: string };
    tanggalPublikasi: string;
    gambarUtama: any;
    excerpt: string;
};

// Perbarui query untuk mengambil 'excerpt'
async function getAllBerita() {
    const query = `*[_type == "berita"] | order(tanggalPublikasi desc) {
        _id, judul, slug, tanggalPublikasi, gambarUtama, excerpt
    }`;
    const data: Berita[] = await client.fetch(
        query, {}, { next: { tags: ['berita'] } }
    );
    return data;
}

export const metadata: Metadata = {
    title: "Arsip Berita | Koperasi Merah Putih",
    description: "Kumpulan berita dan kegiatan terbaru dari Koperasi Merah Putih.",
};

export default async function HalamanDaftarBerita() {
    const semuaBerita = await getAllBerita();

    return (
        // Gunakan padding yang lebih proporsional
        <main className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Arsip Berita</h1>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600">
                        Ikuti semua perkembangan terbaru dari kegiatan dan program kami.
                    </p>
                </div>
                
                {semuaBerita.length > 0 ? (
                    <BeritaList semuaBerita={semuaBerita} />
                ) : (
                    <p className="text-center text-gray-500">Belum ada berita untuk ditampilkan.</p>
                )}
            </div>
        </main>
    );
}