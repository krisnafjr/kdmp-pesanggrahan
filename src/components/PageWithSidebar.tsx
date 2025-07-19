// src/components/PageWithSidebar.tsx
import Navbar from "@/components/Navbar";

interface Props {
  title: string | React.ReactNode;
  description: string;
  children: React.ReactNode;
}

export default function PageWithSidebar({ title, description, children }: Props) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar atas untuk mobile, akan otomatis ter-hide di desktop */}
      <Navbar />

      {/* Sidebar kiri yang fixed untuk desktop */}
      <aside className="fixed top-0 left-0 z-30 w-64 h-screen bg-red-700 text-white shadow-lg hidden lg:flex flex-col justify-center p-8">
        <div>
          {/* Judul akan dinamis sesuai props */}
          {typeof title === 'string' ? (
            <h1 className="text-4xl font-serif font-bold" dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            title
          )}
          <div className="w-20 h-1 bg-white/50 rounded-full my-4"></div>
          {/* Deskripsi akan dinamis sesuai props */}
          <p className="text-red-100">{description}</p>
        </div>
      </aside>

      {/* Konten utama dengan padding kiri di desktop */}
      <main className="lg:pl-64">
        <div className="container mx-auto px-6 py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
