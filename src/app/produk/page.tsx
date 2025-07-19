/* app/produk/page.tsx */
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

async function getProdukData() {
  const query = `*[_type == "produk"] | order(_createdAt desc){
    _id, name, slug, image, category, description
  }`;
  return client.fetch(query);
}

export default async function ProdukPage() {
  const produkData = await getProdukData();

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Sidebar kiri */}
      <aside className="hidden sm:flex w-64 bg-red-700 text-white p-8 flex-col">
        <div>
          <h2 className="text-3xl font-extrabold font-serif leading-tight mb-2">
            Produk <br /> & Layanan
          </h2>
          <p className="text-sm leading-relaxed mt-4">
            Informasi dan berita terbaru dari Desa Pesanggrahan.
          </p>
        </div>
        <div className="mt-auto text-xs pt-6 border-t border-white/20">
          © {new Date().getFullYear()} Desa Pesanggrahan
        </div>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 bg-gray-50">
        <Navbar />

        <section className="px-6 md:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produkData.map((produk: any) => (
              <Link
                key={produk._id}
                href={`/produk/${produk.slug.current}`}
                className="
                  group
                  bg-white border border-gray-200
                  rounded-xl overflow-hidden flex flex-col
                "
              >
                {/* Gambar produk – zoom‑in on hover */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(produk.image).width(800).url()}
                    alt={produk.name}
                    fill
                    className="
                      object-cover
                      transition-transform duration-300
                      group-hover:scale-105    /* ← zoom‑in effect */
                    "
                  />
                </div>

                {/* Konten teks */}
                <div className="p-4 flex flex-col">
                  <p className="text-xs text-red-600 font-semibold mb-1 uppercase tracking-wide">
                    {produk.category}
                  </p>

                  <h3 className="text-lg font-serif font-semibold text-gray-800 mb-2">
                    {produk.name}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {produk.description}
                  </p>

                  <span className="mt-4 text-sm text-red-600 font-semibold">
                    Selengkapnya →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
