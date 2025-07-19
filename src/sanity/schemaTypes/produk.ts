// schemas/produk.js
import {Rule} from 'sanity' // <-- 1. Impor tipe Rule

export default {
  name: 'produk',
  title: 'Produk',
  type: 'document',
  fields: [
    {
      name: 'namaProduk',
      title: 'Nama Produk',
      type: 'string',
      // 2. Terapkan tipe pada parameter Rule
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
        hotspot: true,
      },
    },
    {
      name: 'deskripsi',
      title: 'Deskripsi',
      type: 'text',
    },
    {
      name: 'harga',
      title: 'Harga',
      type: 'number',
    },
    {
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Simpanan', value: 'simpanan'},
          {title: 'Pinjaman', value: 'pinjaman'},
          {title: 'Sembako', value: 'sembako'},
        ],
        layout: 'radio',
      }
    }
  ],
  preview: {
    select: {
      title: 'namaProduk',
      media: 'gambarProduk',
    },
  },
}