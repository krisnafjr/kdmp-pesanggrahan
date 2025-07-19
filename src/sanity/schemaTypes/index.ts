import { type SchemaTypeDefinition } from 'sanity'
import berita from './berita'
import blockContent from './blockContent'
import produk from './produk'

export const schema: { types: SchemaTypeDefinition[] } = {
  // PERBAIKAN: Masukkan skema Anda langsung ke dalam array 'types' ini.
  types: [berita, blockContent, produk],
}