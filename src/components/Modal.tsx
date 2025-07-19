// src/components/Modal.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Tampilkan modal saat komponen di-mount
    dialogRef.current?.showModal();
  }, []);

  // Fungsi untuk menutup modal
  const closeModal = () => {
    router.back(); // Kembali ke halaman sebelumnya (daftar berita)
  };

  return (
    <dialog ref={dialogRef} onClose={closeModal} className="w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-2xl shadow-2xl p-0 backdrop:bg-black/60">
        <div className="relative h-full">
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300">
                &times;
            </button>
            <div className="overflow-y-auto h-full p-8 md:p-12">
                {children}
            </div>
        </div>
    </dialog>
  );
}