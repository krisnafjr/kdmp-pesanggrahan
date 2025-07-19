// src/components/PotensiDesa.tsx

import Image from "next/image";

// Data statis untuk potensi desa
const potentials = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21v-4.5m0 4.5h4.5m-4.5 0L9 15M21 3.75v4.5M21 3.75h-4.5m4.5 0L15 9m-6 6L3.75 3.75" />
            </svg>
        ),
        title: "Pertanian Subur & Modern",
        description: "Dengan sistem irigasi yang maju dan dukungan penuh dari koperasi, lahan pertanian di Desa Pesanggrahan menghasilkan padi, jagung, dan sayuran berkualitas ekspor.",
        image: "/potensi-pertanian.jpg",
    },
    {
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18h16.5M5.25 6v13.5m13.5-13.5v13.5m-4.5-1.5H9.75m-4.5 0H2.25m19.5 0h-2.25m-4.5 0h.008v.008h-.008v-.008zm-4.5 0h.008v.008h-.008v-.008zm-4.5 0h.008v.008h-.008v-.008z" />
            </svg>
        ),
        title: "UMKM & Kerajinan Kreatif",
        description: "Anggota UMKM kami aktif memproduksi kerajinan tangan, makanan olahan seperti bakpia dan kerupuk, hingga produk batu bata yang menjadi andalan ekonomi lokal.",
        image: "/potensi-umkm.jpg",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
            </svg>
        ),
        title: "Pariwisata Berbasis Alam & Budaya",
        description: "Keindahan alam dan kekayaan sejarah Majapahit menjadi daya tarik utama. Kami mengembangkan paket wisata edukasi dan alam yang dikelola langsung oleh warga desa.",
        image: "/potensi-wisata.jpg",
    },
];

export default function PotensiDesa() {
    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Judul Bagian */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-heading font-serif">
                        Potensi Unggulan Desa
                    </h2>
                    <p className="text-lg text-text-subdued mt-2">
                        Kekuatan utama yang menjadi fondasi pertumbuhan ekonomi dan kesejahteraan kami.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Daftar Potensi dengan Layout Modern */}
                <div className="space-y-24">
                    {potentials.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            
                            {/* KOLOM KIRI (Gambar) */}
                            {/* 'order-last' akan memindahkan gambar ke kanan pada item ganjil di layar besar */}
                            <div className={`relative aspect-square lg:aspect-video rounded-2xl shadow-lg ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            </div>

                            {/* KOLOM KANAN (Teks) */}
                            {/* Margin negatif menciptakan efek tumpang tindih (overlap) */}
                            <div className={`bg-white p-8 lg:p-10 rounded-2xl shadow-2xl border border-neutral-border relative z-10 ${index % 2 !== 0 ? 'lg:-ml-16' : 'lg:-mr-16'}`}>
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-primary rounded-full mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-3xl font-bold font-serif text-text-heading mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-text-body leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}