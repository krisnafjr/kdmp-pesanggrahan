import {Rule} from 'sanity'

export default {
  name: 'produk',
  title: 'Produk',
  type: 'document',
  fields: [
    {
      name: 'namaProduk',
      title: 'Nama Produk',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      options: {
        source: 'namaProduk',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'gambarProduk',
      title: 'Gambar Produk',
      type: 'image',
      options: {
        hotspot: true, // Memungkinkan cropping yang lebih baik
      },
       validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Pangan', value: 'pangan'},
          {title: 'Kerajinan', value: 'kerajinan'},
          {title: 'Jasa', value: 'jasa'},
          {title: 'Lainnya', value: 'lainnya'},
        ],
        layout: 'radio',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'harga',
      title: 'Harga',
      type: 'number',
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi Produk',
      type: 'text', // Gunakan 'text' untuk deskripsi sederhana
      rows: 4,
       validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'namaProduk',
      media: 'gambarProduk',
    },
  },
}