// src/components/CTA.tsx

import Link from "next/link";

export default function CTA() {
  const ctaStyle = {
    // Anda bisa mengganti gambar latar ini
    backgroundImage: "url('/merah-putih.jpg')",
  };

  return (
    <section className="relative bg-cover bg-center" style={ctaStyle}>
      {/* Overlay Gelap untuk Kontras Teks */}
      <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Siap Bergabung dan Tumbuh Bersama Kami?
        </h2>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
          Jadilah bagian dari keluarga besar Koperasi Merah Putih dan rasakan manfaatnya secara langsung. Mari majukan ekonomi Desa Pesanggrahan bersama-sama.
        </p>
        <Link 
          href="/cara-bergabung" 
          className="px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Daftar Jadi Anggota
        </Link>
      </div>
    </section>
  );
}