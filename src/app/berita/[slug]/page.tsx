import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Tipe untuk data yang diambil
type DetailBerita = {
    _id: string;
    judul: string;
    excerpt: string;
    tanggalPublikasi: string;
    gambarUtama: any;
    konten: any[];
};

// Fungsi untuk mengambil data HANYA untuk metadata
async function getBeritaForMetadata(slug: string) {
    const query = `*[_type == "berita" && slug.current == $slug][0] {
        judul,
        excerpt
    }`;
    const data = await client.fetch(query, { slug });
    return data;
}

// ====================================================================
// ✨ BAGIAN YANG DIPERBAIKI: Tambahkan fungsi generateMetadata ini
// ====================================================================
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const berita = await getBeritaForMetadata(params.slug);

    if (!berita) {
        return {
            title: "Berita Tidak Ditemukan",
        };
    }

    return {
        title: `${berita.judul} | Koperasi Merah Putih`,
        description: berita.excerpt,
    };
}

// Fungsi untuk mengambil data LENGKAP untuk halaman
async function getDetailBerita(slug: string) {
    const query = `*[_type == "berita" && slug.current == $slug][0] {
        _id,
        judul,
        excerpt,
        tanggalPublikasi,
        gambarUtama,
        konten
    }`;
    const data: DetailBerita = await client.fetch(query, { slug });
    return data;
}

export default async function HalamanDetailBerita({ params }: { params: { slug: string } }) {
    const berita = await getDetailBerita(params.slug);

    // ===============================================================
    // ✨ BAGIAN YANG DIPERBAIKI: Gunakan notFound() untuk error
    // ===============================================================
    if (!berita) {
        notFound();
    }

    return (
        <article className="container mx-auto px-6 py-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{berita.judul}</h1>
            <p className="text-gray-500 mb-6">
                Dipublikasikan pada {new Date(berita.tanggalPublikasi).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })}
            </p>
            
            <div className="relative w-full h-96 mb-8">
                <Image 
                    src={urlFor(berita.gambarUtama).url()} 
                    alt={berita.judul} 
                    fill 
                    style={{objectFit: 'cover'}}
                    className="rounded-lg"
                />
            </div>
            
            {/* Render Rich Text di sini */}
            <div className="prose lg:prose-xl max-w-none">
                <PortableText value={berita.konten} />
            </div>
        </article>
    );
}