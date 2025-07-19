// sanity/schemas/produk.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'produk',
  title: 'Produk & Layanan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Produk/Layanan',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Gambar Produk',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      initialValue: 'Hasil Bumi',
      options: {
        list: ['Hasil Bumi', 'Kerajinan Lokal', 'Layanan', 'Lainnya'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
