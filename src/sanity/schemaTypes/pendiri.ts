import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pendiri',
  title: 'Struktural Pendiri',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Lengkap',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nama',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'jabatan',
      title: 'Jabatan dalam Struktur',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'profilLengkap',
      title: 'Profil Lengkap',
      type: 'text',
      rows: 10,
      description: 'Detail profil anggota struktural ini.',
    }),
  ],
  preview: {
    select: {
      title: 'nama',
      subtitle: 'jabatan',
      media: 'foto',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Nama tidak tersedia',
        subtitle: subtitle || 'Jabatan tidak tersedia',
        media,
      };
    },
  },
});
