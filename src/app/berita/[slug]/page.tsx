// src/app/berita/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import PageWithSidebar from "@/components/PageWithSidebar";
import { notFound } from "next/navigation";

// Tipe gambar Sanity
interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// Interface untuk data artikel tunggal
interface Berita {
  title: string;
  mainImage: SanityImage;
  publishedAt: string;
  body: any[];
}

// Fungsi untuk mengambil data berita berdasarkan slug
async function getSingleBerita(slug: string): Promise<Berita | null> {
  const query = `*[_type == "berita" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    body
  }`;

  const data = await client.fetch(query, { slug });
  return data ?? null;
}

// Komponen untuk menampilkan gambar dalam konten PortableText
const SanityImageComponent = ({ value }: { value: SanityImage }) => {
  return (
    <div className="relative my-8 aspect-video rounded-lg shadow-lg overflow-hidden">
      <Image
        src={urlFor(value).url()}
        alt={value.alt || "Gambar artikel"}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 80vw"
      />
    </div>
  );
}

// Tipe props halaman dinamis Next.js App Router
interface BeritaDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function BeritaDetailPage({ params }: BeritaDetailPageProps) {
  const berita = await getSingleBerita(params.slug);

  if (!berita) {
    notFound(); // Akan render 404 bawaan dari Next.js
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
            Dipublikasikan pada{" "}
            {new Date(berita.publishedAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-text-heading font-serif">
            {berita.title}
          </h1>
        </header>

        {/* Gambar Utama */}
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

        {/* Konten Body */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text-heading prose-a:text-primary hover:prose-a:underline">
          <PortableText
            value={berita.body}
            components={{
              types: {
                image: SanityImageComponent,
              },
            }}
          />
        </div>
      </article>
    </PageWithSidebar>
  );
}
