import { type SchemaTypeDefinition } from 'sanity'

// 1. Impor skema yang telah Anda buat
import berita from './berita'


export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. Tambahkan skema yang diimpor ke dalam array types
  types: [
    berita, 
    // Tambahkan skema lain di sini jika ada
  ],
}