"use client";

import { motion } from "framer-motion";

export default function MapSection() {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Temukan Lokasi Kami
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600">
                        Kunjungi kami di Desa Pesanggrahan untuk melihat langsung potensi dan produk unggulan kami.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-full aspect-[16/9] md:aspect-[16/7] rounded-xl overflow-hidden shadow-xl border-2 border-gray-100"
                >
                    {/* PASTE KODE IFRAME DARI GOOGLE MAPS DI SINI.
                      Pastikan untuk menambahkan className dan menghapus atribut style, width, dan height bawaan.
                    */}
                    
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1977.5614279993456!2d112.53579556368223!3d-7.561581614314512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e787462b48aaa35%3A0xa46aa9341363a023!2sBalai%20Desa%20Pesanggrahan%20(Graha%20Madyopuro)!5e0!3m2!1sid!2sid!4v1753062718393!5m2!1sid!2sid"
                        className="absolute top-0 left-0 w-full h-full border-0"
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}