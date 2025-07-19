// src/sanity/schemaTypes/berita.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'berita',
  title: 'Berita & Kegiatan',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Artikel',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Isi Artikel',
      type: 'blockContent',
    }),
  ],
})