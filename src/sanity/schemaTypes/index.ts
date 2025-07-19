import { type SchemaTypeDefinition } from 'sanity'

// 1. Impor skema yang telah Anda buat
import berita from './berita'
import produk from './produk' // Pastikan file produk.ts ada

export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. Tambahkan skema yang diimpor ke dalam array types
  types: [
    berita, 
    produk,
    // Tambahkan skema lain di sini jika ada
  ],
}