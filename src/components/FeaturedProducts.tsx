import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// 1. Definisikan tipe data untuk produk dari Sanity
type Produk = {
    _id: string;
    namaProduk: string;
    slug: {
        current: string;
    };
    deskripsi: string;
    kategori: string;
    gambarProduk: any;
};

// 2. Fungsi untuk mengambil data produk dari Sanity
async function getFeaturedProducts() {
    // Ambil 3 produk terbaru, diurutkan dari tanggal dibuat
    // Anda bisa mengubah logika ini, misalnya dengan menambahkan field "Unggulan"
    const query = `*[_type == "produk"] | order(_createdAt desc)[0...3] {
        _id,
        namaProduk,
        slug,
        deskripsi,
        kategori,
        gambarProduk
    }`;

    const data: Produk[] = await client.fetch(query);
    return data;
}


// 3. Ubah komponen menjadi 'async'
export default async function FeaturedProducts() {
    const products = await getFeaturedProducts();

    if (!products || products.length === 0) {
        return null; // Atau tampilkan pesan jika tidak ada produk
    }

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">

                
             {/* Judul Bagian */}
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                        Kegiatan Usaha
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
                        Kegitan Usaha
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Inilah hasil karya dan layanan terbaik dari anggota Koperasi Merah Putih.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
                </div>

                {/* Grid Kartu Produk */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        // Gunakan _id dari Sanity sebagai key unik
                        <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                            <div className="relative w-full h-56">
                                <Image
                                    // Gunakan urlFor untuk memproses gambar dari Sanity
                                    src={urlFor(product.gambarProduk).url()}
                                    alt={product.namaProduk}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-sm font-semibold text-red-600">{product.kategori}</span>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2">{product.namaProduk}</h3>
                                {/* Batasi deskripsi agar layout tidak rusak */}
                                <p className="text-gray-600 mt-3 h-24 overflow-hidden line-clamp-4">{product.deskripsi}</p>
                                {/* Arahkan link ke halaman detail produk sesuai slug */}
                                <Link href={`/produk/${product.slug.current}`} className="inline-block mt-4 text-red-600 font-semibold hover:text-red-800 transition-colors">
                                    Lihat Detail →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}