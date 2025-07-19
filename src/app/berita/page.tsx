// src/app/berita/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import PageWithSidebar from '@/components/PageWithSidebar';

// Komponen Ikon Kalender
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

// Komponen Ikon Tag Berita
const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 8V3a2 2 0 012-2z" />
    </svg>
);

// Interface untuk tipe data berita
interface Berita {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt: string;
}

// Fungsi untuk mengambil semua data berita dari Sanity
async function getBerita() {
  const query = `*[_type == "berita"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
  }`;
  
  const data = await client.fetch(query, {}, {
    next: { tags: ['berita'] }
  });
  return data;
}

export default async function BeritaPage() {
  const allBerita: Berita[] = await getBerita();

  const featuredPost = allBerita.length > 0 ? allBerita[0] : null;
  const otherPosts = allBerita.length > 1 ? allBerita.slice(1) : [];

  return (
    <PageWithSidebar
      title="Berita Desa"
      description="Informasi dan berita terbaru dari Desa Pesanggrahan."
    >
      {/* Berita Utama */}
      {featuredPost && (
        <section className="mb-12">
          <Link href={`/berita/${featuredPost.slug.current}`} className="block group relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200/80">
            <div className="relative w-full aspect-[2/1]">
              {featuredPost.mainImage && (
                <Image 
                  src={urlFor(featuredPost.mainImage).width(1200).quality(85).url()} 
                  alt={featuredPost.title} 
                  fill 
                  sizes="(max-width: 767px) 90vw, 65vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow">
                <CalendarIcon />
                {new Date(featuredPost.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold">
                {featuredPost.title}
              </h2>
              <p className="hidden md:block text-gray-200 mt-2 line-clamp-2">{featuredPost.excerpt}</p>
              <span className="inline-block mt-4 font-semibold text-white group-hover:text-red-300 transition-colors">
                Baca Selengkapnya &rarr;
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Grid Berita Lainnya */}
      {otherPosts.length > 0 && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-200/80">
                <Link href={`/berita/${post.slug.current}`} className="flex flex-col h-full">
                  <div className="relative w-full aspect-[4/3]">
                    {post.mainImage && (
                      <Image 
                        src={urlFor(post.mainImage).width(400).quality(75).url()} 
                        alt={post.title} 
                        fill 
                        sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 30vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center space-x-2 mb-3">
                        <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                            <TagIcon />
                            Berita Desa
                        </div>
                        <div className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                            <CalendarIcon />
                            {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold font-serif text-text-heading group-hover:text-primary transition-colors line-clamp-3 flex-grow">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </PageWithSidebar>
  );
}
