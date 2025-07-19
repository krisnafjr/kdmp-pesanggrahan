// src/components/FeaturedProducts.tsx

import Image from "next/image";
import Link from "next/link";
import { client} from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Interface untuk data produk dari Sanity
interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
  category: string;
  description: string;
}

// Fungsi untuk mengambil 3 produk terbaru dari Sanity
async function getFeaturedProducts() {
  const query = `*[_type == "produk"] | order(_createdAt desc) [0...3] {
    _id,
    name,
    slug,
    image,
    category,
    description
  }`;
  
  const data = await client.fetch(query, {}, {
    next: { tags: ['produk'] } // Tag untuk revalidasi data
  });
  return data;
}

export default async function FeaturedProducts() {
  // Ambil data dari Sanity, bukan dari array statis lagi
  const products: Product[] = await getFeaturedProducts();

  // Jika tidak ada produk, jangan tampilkan section ini
  if (!products || products.length === 0) {
    return null;
  }

  return (
    // Struktur dan styling JSX Anda di bawah ini tidak diubah sama sekali
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
         <div className="text-center mb-12">
                    <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                        Produk dan Layanan
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
                        Kegiatan Usaha
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Inilah hasil karya dan layanan terbaik dari anggota Koperasi Merah Putih.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
                </div>
          {/* Grid Layout Editorial */}

        {/* Grid Kartu Produk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                    <div className="relative w-full h-56">
                        <Image
                            src={urlFor(product.image).url()} // Menggunakan data gambar dari Sanity
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="p-6">
                        <span className="text-sm font-semibold text-red-600">{product.category}</span>
                        <h3 className="text-2xl font-bold text-gray-800 mt-2 font-serif">{product.name}</h3>
                        <p className="text-gray-600 mt-3 h-24 line-clamp-4">{product.description}</p>
                        
                        {/* Link sekarang dinamis menuju detail produk */}
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