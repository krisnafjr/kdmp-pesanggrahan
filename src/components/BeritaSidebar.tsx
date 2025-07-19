// src/components/BeritaSidebar.tsx

export default function BeritaSidebar() {
    return (
        // Sidebar ini 'fixed', menempel di layar, dan hanya muncul di desktop (lg)
        <aside className="fixed top-0 left-0 z-30 w-64 h-screen bg-red-700 text-white shadow-lg hidden lg:flex flex-col justify-center p-8">
            <div>
                <h1 className="text-4xl font-serif font-bold mb-3">
                    Berita Desa
                </h1>
                <div className="w-20 h-1 bg-white/50 rounded-full mb-4"></div>
                <p className="text-red-100">
                    Informasi dan berita terbaru dari Desa Pesanggrahan.
                </p>
            </div>
        </aside>
    );
}