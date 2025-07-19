import Image from "next/image";
import Link from "next/link";
import { produkData } from "@/data/produk";

export default function ProdukHighlight() {
  const highlightProduk = produkData.slice(0, 3); // tampilkan 3 produk pertama

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
          Produk & Layanan
        </h2>
        <p className="text-gray-600 mt-2">
          Beberapa layanan unggulan koperasi kami untuk mendukung masyarakat.
        </p>
        <div className="mt-4 w-20 h-1.5 bg-red-600 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {highlightProduk.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition">
            <div className="relative w-full aspect-w-4 aspect-h-3">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500">{item.category}</p>
              <h3 className="text-xl font-semibold text-gray-800 font-serif group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-2">{item.description}</p>
              <Link
                href={item.slug}
                className="inline-block mt-4 text-red-600 font-semibold hover:underline"
              >
                Lihat Detail →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
