// src/app/berita/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import PageWithSidebar from "@/components/PageWithSidebar";

// Interface untuk data artikel tunggal
interface Berita {
  title: string;
  mainImage: any;
  publishedAt: string;
  body: any[]; // Tipe untuk konten rich text dari Sanity
}

// Fungsi untuk mengambil satu berita berdasarkan slug-nya
async function getSingleBerita(slug: string) {
  const query = `*[_type == "berita" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    body
  }`;
  
  const data = await client.fetch(query, { slug });
  return data;
}

// Komponen untuk men-style gambar di dalam isi artikel
const SanityImageComponent = ({ value }: { value: any }) => {
    return (
        <div className="relative my-8 aspect-video rounded-lg shadow-lg overflow-hidden">
            <Image 
                src={urlFor(value).url()} 
                alt={value.alt || 'Gambar artikel'} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
            />
        </div>
    );
};

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const berita: Berita = await getSingleBerita(params.slug);

  if (!berita) {
    return (
      <PageWithSidebar
        title="Error 404"
        description="Halaman tidak ditemukan."
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Berita tidak ditemukan</h1>
          <p className="mt-2 text-gray-600">Maaf, artikel yang Anda cari mungkin telah dihapus atau URL-nya salah.</p>
        </div>
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar
      title={<Link href="/berita" className="hover:underline">&larr; Kembali ke Berita</Link>}
      description={berita.title}
    >
      <article className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
        {/* Header Artikel */}
        <header className="mb-8 border-b pb-6">
          <p className="text-sm text-text-subdued mb-2">
            Dipublikasikan pada {new Date(berita.publishedAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-text-heading font-serif">
            {berita.title}
          </h1>
        </header>

        {/* Gambar Utama Artikel */}
        {berita.mainImage && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
                <Image
                    src={urlFor(berita.mainImage).width(1200).quality(85).url()}
                    alt={berita.title}
                    fill
                    priority
                    sizes="(max-width: 1023px) 90vw, 60vw"
                    className="object-cover"
                />
            </div>
        )}

        {/* Isi Konten Artikel dari Sanity */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text-heading prose-a:text-primary hover:prose-a:underline">
          <PortableText 
            value={berita.body}
            components={{
                types: {
                    image: SanityImageComponent, // Gunakan komponen kustom untuk gambar
                },
            }}
          />
        </div>
      </article>
    </PageWithSidebar>
  );
}
