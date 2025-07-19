import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

// Definisikan tipe datanya
type Berita = {
    _id: string;
    judul: string;
    slug: { current: string };
    tanggalPublikasi: string;
    gambarUtama: any;
};

// Fungsi untuk mengambil SEMUA berita
async function getAllBerita() {
    const query = `*[_type == "berita"] | order(tanggalPublikasi desc) {
        _id,
        judul,
        slug,
        tanggalPublikasi,
        gambarUtama
    }`;
    const data: Berita[] = await client.fetch(query);
    return data;
}

export default async function HalamanDaftarBerita() {
    const semuaBerita = await getAllBerita();

    return (
        <main className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8">Arsip Berita</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {semuaBerita.map((item) => (
                    <Link href={`/berita/${item.slug.current}`} key={item._id}>
                        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                            <div className="relative w-full h-48">
                                <Image 
                                    src={urlFor(item.gambarUtama).url()} 
                                    alt={item.judul} 
                                    fill 
                                    style={{objectFit: 'cover'}} 
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{item.judul}</h2>
                                <p className="text-gray-600 text-sm">
                                    {new Date(item.tanggalPublikasi).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}