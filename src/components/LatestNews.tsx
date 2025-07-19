// src/components/LatestNews.tsx

import Link from 'next/link';
import Image from 'next/image';
import { client} from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Interface untuk tipe data
interface Berita {
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt: string;
}

// Fungsi untuk mengambil 3 berita terbaru dari Sanity
async function getLatestNews() {
  // Query ini mengambil 3 berita terbaru dan membuat excerpt otomatis
  const query = `*[_type == "berita"] | order(publishedAt desc) [0...4] {
    title,
    slug,
    mainImage,
    publishedAt,
    "excerpt": array::join(string::split(pt::text(body), "")[0..120], "") + "..."
  }`;

  // Mengambil data dengan tag 'berita' untuk revalidasi on-demand
  const data = await client.fetch(query, {}, {
    next: { tags: ['berita'] }
  });
  return data;
}

export default async function LatestNews() {
  const latestNews: Berita[] = await getLatestNews();

  // Jika tidak ada berita, komponen ini tidak akan ditampilkan
  if (!latestNews || latestNews.length === 0) {
    return null;
  }

  // Memisahkan berita utama dan berita lainnya
  const featuredNews = latestNews[0];
  const otherNews = latestNews.slice(1);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
          
          <div className="mb-12">
                    <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                        Berita dan Kegiatan
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
                        Berita & Kegiatan Terbaru
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Ikuti perkembangan dan aktivitas terkini dari Koperasi Merah Putih.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 rounded-full"></div>
                </div>
          {/* Grid Layout Editorial */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* KOLOM KIRI: BERITA UTAMA */}
              <Link href={`/berita/${featuredNews.slug.current}`} className="block group">
                  <div className="bg-neutral-surface rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                      <div className="relative w-full aspect-video">
                          <Image
                              src={urlFor(featuredNews.mainImage).url()}
                              alt={featuredNews.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                      </div>
                      <div className="p-6">
                          <p className="text-sm text-text-subdued mb-2">
                              {new Date(featuredNews.publishedAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <h3 className="text-2xl font-bold text-text-heading mb-3 group-hover:text-primary transition-colors font-serif">
                              {featuredNews.title}
                          </h3>
                          <p className="text-text-body line-clamp-3">
                              {featuredNews.excerpt}
                          </p>
                      </div>
                  </div>
              </Link>

              {/* KOLOM KANAN: DAFTAR BERITA LAINNYA */}
              <div className="flex flex-col gap-8">
                  {otherNews.map((newsItem) => (
                      <Link href={`/berita/${newsItem.slug.current}`} key={newsItem.slug.current} className="block group">
                          <div className="flex gap-5 items-center">
                              <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                                  <Image
                                      src={urlFor(newsItem.mainImage).url()}
                                      alt={newsItem.title}
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                              </div>
                              <div>
                                  <p className="text-sm text-text-subdued mb-1">
                                      {new Date(newsItem.publishedAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
                                  </p>
                                  <h4 className="text-lg font-bold text-text-heading line-clamp-2 group-hover:text-primary transition-colors font-serif">
                                      {newsItem.title}
                                  </h4>
                              </div>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>

      </div>
    </section>
  );
}