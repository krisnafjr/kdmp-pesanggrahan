// src/components/FeaturedProducts.tsx

import Image from "next/image";
import Link from "next/link";

// Data produk (bisa Anda ganti dengan produk nyata dari Koperasi)
const products = [
    {
        category: "Pangan",
        name: "Bakpia Pak Rohman",
        description: "Beras berkualitas tinggi yang ditanam secara alami tanpa pestisida, menjaga kearifan lokal.",
        image: "/Bakpia_Arrohman.jpg", // Ganti dengan nama file gambar Anda
    },
    {
        category: "Pangan",
        name: "Kerupuk Tengiri : Primadona Baru di Pesanggrahan",
        description: "Kerajinan tangan unik dengan motif khas yang terinspirasi dari warisan Kerajaan Majapahit.",
        image: "/produk_kerupuk.jpg", // Ganti dengan nama file gambar Anda
    },
    {
        category: "Produk",
        name: "Pengusaha Batu Bata",
        description: "Layanan keuangan yang mudah dan terpercaya untuk mendukung pertumbuhan usaha anggota.",
        image: "/produk_batubata.jpg", // Ganti dengan nama file gambar Anda
    },
];

export default function FeaturedProducts() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">

                {/* Judul Bagian */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Produk & Layanan Unggulan
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Inilah hasil karya dan layanan terbaik dari anggota Koperasi Merah Putih.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
                </div>

                {/* Grid Kartu Produk */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                            <div className="relative w-full h-56">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-sm font-semibold text-red-600">{product.category}</span>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2">{product.name}</h3>
                                <p className="text-gray-600 mt-3 h-24">{product.description}</p>
                                <Link href="/produk" className="inline-block mt-4 text-red-600 font-semibold hover:text-red-800 transition-colors">
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