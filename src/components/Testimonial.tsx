// src/components/Testimonials.tsx

import Image from "next/image";

// Data testimoni statis
const testimonials = [
    {
        name: "Bapak Sutrisno",
        role: "Anggota Petani",
        quote: "Sejak bergabung dengan koperasi, saya tidak pernah kesulitan mendapatkan pupuk dan bibit unggul. Hasil panen saya meningkat dan harganya pun stabil. Terima kasih Koperasi Merah Putih!",
        image: "/avatar-1.jpg", // Ganti dengan nama file gambar Anda
    },
    {
        name: "Ibu Hartini",
        role: "Pengrajin & Anggota UMKM",
        quote: "Koperasi benar-benar membantu saya dalam pemasaran. Produk anyaman saya sekarang bisa dikenal lebih luas. Pelatihan yang diberikan juga sangat bermanfaat.",
        image: "/avatar-2.jpg", // Ganti dengan nama file gambar Anda
    },
    {
        name: "Andi Wijaya",
        role: "Anggota Simpan Pinjam",
        quote: "Proses pinjaman modal usaha di sini sangat mudah dan bunganya ringan. Berkat koperasi, warung kelontong saya bisa berkembang pesat seperti sekarang.",
        image: "/avatar-3.jpg", // Ganti dengan nama file gambar Anda
    },
];

// Ikon kutipan
const QuoteIcon = () => (
    <svg className="w-10 h-10 text-red-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
);


export default function Testimonials() {
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">

                {/* Judul Bagian */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Apa Kata Anggota Kami?
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Kisah nyata dan pengalaman langsung dari keluarga besar Koperasi Merah Putih.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
                </div>

                {/* Grid Kartu Testimoni */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-lg flex flex-col h-full">
                            <div className="flex-grow">
                                <QuoteIcon />
                                <p className="text-gray-600 italic mt-4">"{testimonial.quote}"</p>
                            </div>
                            <div className="flex items-center mt-6 pt-6 border-t border-gray-200">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}