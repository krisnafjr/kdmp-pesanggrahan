import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SanityDocument } from "next-sanity";
import ProductDetailLayout from "@/components/ProductDetailLayout"; // Impor komponen layout baru

// Fungsi untuk metadata tetap sama (tapi tanpa harga)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const query = `*[_type == "produk" && slug.current == $slug][0] { namaProduk, deskripsi }`;
    const produk = await client.fetch(query, { slug: params.slug });
    if (!produk) return { title: "Produk Tidak Ditemukan" };
    return {
        title: `${produk.namaProduk} | Koperasi Merah Putih`,
        description: produk.deskripsi,
    };
}

// Fungsi untuk mengambil data produk (tanpa harga)
async function getDetailProduk(slug: string): Promise<SanityDocument> {
    const query = `*[_type == "produk" && slug.current == $slug][0]`;
    const data = await client.fetch(query, { slug }, {
        next: { tags: ['produk'] }
    });
    return data;
}

// Komponen Halaman (hanya mengambil data dan memanggil layout)
export default async function HalamanDetailProduk({ params }: { params: { slug: string } }) {
    const produk = await getDetailProduk(params.slug);

    if (!produk) {
        notFound();
    }

    // Serahkan data ke komponen Client untuk di-render dengan animasi
    return <ProductDetailLayout produk={produk} />;
}