// src/components/Footer.tsx

import Link from "next/link";

// Ikon media sosial sebagai komponen JSX
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        {children}
    </a>
);

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Kolom 1: Tentang Koperasi */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold">Koperasi <span className="text-red-500">Merah Putih</span></h3>
                        <p className="text-gray-400 mt-4 max-w-md">
                            Membangun ekonomi kerakyatan dari Desa Pesanggrahan, Mojokerto, untuk kesejahteraan bersama yang berlandaskan gotong royong.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363-.416 2.427-.465C9.795 3.013 10.148 3 12.315 3h.001zM12 7c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Kolom 2: Tautan Cepat */}
                    <div>
                        <h3 className="text-lg font-semibold">Tautan Cepat</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/tentang-kami" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/produk" className="text-gray-400 hover:text-white transition-colors">Produk & Layanan</Link></li>
                            <li><Link href="/berita" className="text-gray-400 hover:text-white transition-colors">Berita</Link></li>
                            <li><Link href="/kontak" className="text-gray-400 hover:text-white transition-colors">Kontak</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Kontak */}
                    <div>
                        <h3 className="text-lg font-semibold">Hubungi Kami</h3>
                        <ul className="mt-4 space-y-2 text-gray-400">
                            <li className="flex items-start">
                                <span className="mr-2 mt-1">📍</span>
                                <span>Desa Pesanggrahan, Kec. Kutorejo, Kab. Mojokerto, Jawa Timur</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">📞</span>
                                <span>(0321) 123-456</span>
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✉️</span>
                                <span>kontak@koperasimerahputih.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Garis Pemisah & Copyright */}
                <div className="mt-12 border-t border-gray-700 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Koperasi Merah Putih. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}