// src/components/Stats.tsx

// Komponen Ikon (didefinisikan di sini agar mudah dikelola)
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BusinessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25M13.5 21v-7.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21m-4.5 0h2.25m0-7.5H3.75M21 13.5h-2.25a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h2.25a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75zM13.5 13.5H9.75m4.5 0c.414 0 .75.336.75.75v7.5c0 .414-.336.75-.75.75H9.75a.75.75 0 01-.75-.75v-7.5c0-.414.336-.75.75-.75h3.75z" />
    </svg>
);

const ProductIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);

const ProgramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const statsData = [
    { icon: <UsersIcon />, value: "1,250", label: "Total Anggota" },
    { icon: <BusinessIcon />, value: "15", label: "Unit Usaha" },
    { icon: <ProductIcon />, value: "50+", label: "Produk Unggulan" },
    { icon: <ProgramIcon />, value: "8", label: "Program Pemberdayaan" },
];

export default function Stats() {
    return (
        <section className="bg-gray-50 pt-20 pb-16">
            <div className="container mx-auto px-6 relative z-10 -mt-40">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Jarak antar kartu (gap) dikurangi */}
                    
                    {statsData.map((stat, index) => (
                        // Perubahan utama ada di sini
                        <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                            {/* Ukuran container ikon dikecilkan */}
                            <div className="text-red-500 w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-red-100 mb-3">
                                {stat.icon}
                            </div>
                            {/* Ukuran font angka dikecilkan */}
                            <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                            <p className="text-gray-500 mt-1 text-sm">{stat.label}</p> {/* Font label juga dikecilkan */}
                        </div>
                    ))}
                    
                </div>
            </div>
        </section>
    );
}