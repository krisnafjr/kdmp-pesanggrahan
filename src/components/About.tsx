// src/components/About.tsx

import Image from "next/image";

export default function About() {
    return (
        <section className="bg-gray-50 pb-20">
            <div className="container mx-auto px-6">

                {/* Judul Bagian */}
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                        Tentang Kami
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
                        Mengenal Koperasi Merah Putih
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Perjalanan panjang sejarah dan budaya yang membentuk identitas kami.
                    </p>
                    <div className="mt-4 w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
                </div>

                {/* Layout Dua Kolom */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Kolom Gambar */}
                    <div className="w-full h-80 relative rounded-2xl shadow-2xl overflow-hidden">
                        <Image
                            src="/about.jpg"
                            alt="Kegiatan Anggota Koperasi Merah Putih"
                            layout="fill"
                            objectFit="cover"
                            className="transform hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Kolom Teks */}
                    <div>
                        <h3 className="text-3xl font-semibold text-gray-800">
                            Sejarah & Visi Kami
                        </h3>
                        <div className="mt-2 mb-4 w-16 h-1 bg-red-600 rounded-full"></div>
                        <p className="text-gray-600 leading-relaxed">
                            Koperasi Merah Putih didirikan atas semangat gotong royong dan keinginan untuk membangun kemandirian ekonomi masyarakat. Berawal dari sekelompok kecil petani dan pengrajin, kami berkembang menjadi komunitas yang kuat dengan nilai-nilai kebersamaan yang masih terjaga hingga saat ini.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            Kini, Koperasi Merah Putih terus berinovasi dengan berbagai program pembangunan berkelanjutan yang berfokus pada kesejahteraan anggota dan pelestarian nilai-nilai luhur bangsa.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}