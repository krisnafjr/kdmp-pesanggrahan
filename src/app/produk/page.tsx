import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "next-sanity";

// Fungsi untuk mengambil semua produk
async function getAllProduk() {
    const query = `*[_type == "produk"] | order(_createdAt desc) {
        _id,
        namaProduk,
        slug,
        gambarProduk,
        harga
    }`;

    const data = await client.fetch<SanityDocument[]>(query, {}, {
        next: { tags: ['produk'] } // Tag untuk revalidation
    });
    return data;
}

export default async function HalamanDaftarProduk() {
    const semuaProduk = await getAllProduk();

    return (
        <main className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Galeri Produk
                </h1>
                <p className="text-lg text-gray-500 mt-2">
                    Jelajahi semua produk unggulan dari anggota kami.
                </p>
                <div className="mt-4 w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {semuaProduk.map((produk) => (
                    <Link href={`/produk/${produk.slug.current}`} key={produk._id}>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden group h-full">
                            <div className="relative w-full aspect-square bg-gray-100">
                                <Image
                                    src={urlFor(produk.gambarProduk).url()}
                                    alt={produk.namaProduk}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800 truncate">{produk.namaProduk}</h2>
    
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}