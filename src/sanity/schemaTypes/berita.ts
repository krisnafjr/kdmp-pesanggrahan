// sanity/schemaTypes/berita.ts
import {Rule} from 'sanity'

export default {
  name: 'berita',
  title: 'Berita',
  type: 'document',
  fields: [
    {
      name: 'judul',
      title: 'Judul Berita',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Judul tidak boleh kosong.'),
    },
    {
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      options: {
        source: 'judul',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'tanggalPublikasi',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'gambarUtama',
      title: 'Gambar Utama',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Kutipan (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat berita untuk ditampilkan di halaman utama.',
      validation: (Rule: Rule) => Rule.max(200).error('Kutipan tidak boleh lebih dari 200 karakter.')
    },
    {
      name: 'konten',
      title: 'Konten Berita',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
   preview: {
    select: {
      title: 'judul',
      media: 'gambarUtama',
    },
  },
}