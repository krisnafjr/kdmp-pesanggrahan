// src/components/BeritaTerbaruSidebar.tsx

import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface LatestNews {
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
}

// Fungsi untuk mengambil 5 berita terbaru, KECUALI berita yang sedang dibaca
async function getLatestNews(currentSlug: string) {
  const query = `*[_type == "berita" && slug.current != $currentSlug] | order(publishedAt desc) [0...5] {
    title,
    slug,
    mainImage,
    publishedAt
  }`;
  
  const data = await client.fetch(query, { currentSlug });
  return data;
}

export default async function BeritaTerbaruSidebar({ currentSlug }: { currentSlug: string }) {
  const latestNews: LatestNews[] = await getLatestNews(currentSlug);

  return (
    <aside className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200/80">
      <h3 className="text-xl font-bold font-serif text-text-heading border-b pb-3 mb-4">
        Berita Terbaru
      </h3>
      <div className="space-y-4">
        {latestNews.map((news) => (
          <Link href={`/berita/${news.slug.current}`} key={news.slug.current} className="block group">
            <div className="flex gap-4 items-center">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                {news.mainImage && (
                  <Image
                    src={urlFor(news.mainImage).width(100).height(100).url()}
                    alt={news.title}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-heading line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h4>
                <p className="text-xs text-text-subdued mt-1">
                  {new Date(news.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
