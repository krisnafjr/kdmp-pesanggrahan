import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

// Fungsi untuk mengambil data halaman "Tentang Kami"
async function getTentangKamiData() {
    const query = `*[_type == "halamanTentang"][0]{
        judul,
        intro,
        gambarUtama,
        visi,
        misi,
        sejarah,
        pengurus[]->{ // Mengambil data dari referensi 'penulis'
            _id,
            nama,
            gambar
        }
    }`;
    const data = await client.fetch<SanityDocument>(query, {}, {
        next: { tags: ['halamanTentang'] }
    });
    return data;
}

// Generate metadata dinamis
export async function generateMetadata(): Promise<Metadata> {
    const data = await getTentangKamiData();
    return {
        title: `${data?.judul || 'Tentang Kami'} | Koperasi Merah Putih`,
        description: data?.intro || 'Mengenal lebih dekat Desa Pesanggrahan.',
    };
}

export default async function TentangKamiPage() {
    const data = await getTentangKamiData();

    if (!data) return <div>Halaman tidak ditemukan.</div>;

    return (
        <main className="bg-white">
            {/* Section Header */}
            <section className="container mx-auto px-6 py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">{data.judul}</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">{data.intro}</p>
            </section>

            {/* Section Gambar Utama */}
            {data.gambarUtama && (
                <section className="container mx-auto px-6">
                    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
                        <Image src={urlFor(data.gambarUtama).url()} alt={data.judul} fill style={{objectFit: 'cover'}} />
                    </div>
                </section>
            )}

            {/* Section Visi & Misi */}
            <section className="bg-gray-50 mt-16 py-16">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi</h2>
                        <p className="text-gray-700 text-lg">{data.visi}</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Misi</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                            {data.misi?.map((misi: string, index: number) => (
                                <li key={index}>{misi}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            
            {/* Section Sejarah */}
            <section className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Sejarah Singkat</h2>
                <div className="prose lg:prose-lg max-w-4xl mx-auto">
                    <PortableText value={data.sejarah} />
                </div>
            </section>

         {/* Ganti bagian Section Pengurus Desa dengan kode ini */}

        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Struktur Pengurus</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {data.pengurus?.filter(Boolean).map((orang: any, index: number) => (
                        // Tambahkan pengecekan apakah 'orang.gambar' ada sebelum me-render
                        orang.gambar && (
                            <div key={orang.nama || index} className="text-center">
                                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden shadow-md">
                                    <Image 
                                        src={urlFor(orang.gambar).url()} 
                                        alt={orang.nama} 
                                        fill 
                                        style={{objectFit: 'cover'}} 
                                    />
                                </div>
                                <h3 className="mt-4 font-semibold text-gray-800">{orang.nama}</h3>
                                {/* Tambahkan jabatan jika ada */}
                                {orang.jabatan && <p className="text-sm text-gray-500">{orang.jabatan}</p>}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
        </main>
    );
}