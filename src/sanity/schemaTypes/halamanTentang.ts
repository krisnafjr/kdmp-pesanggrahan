import {Rule} from 'sanity'

export default {
    name: 'halamanTentang',
    title: 'Halaman Tentang Kami',
    type: 'document',
    fields: [
        {
            name: 'judul',
            title: 'Judul Halaman',
            type: 'string',
            initialValue: 'Tentang Desa Kami',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'intro',
            title: 'Paragraf Pembuka',
            type: 'text',
            rows: 4,
        },
        {
            name: 'gambarUtama',
            title: 'Gambar Utama Halaman',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'visi',
            title: 'Visi',
            type: 'text',
        },
        {
            name: 'misi',
            title: 'Misi',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Tambahkan satu atau lebih poin misi.',
        },
        {
            name: 'sejarah',
            title: 'Sejarah Singkat Desa',
            type: 'array',
            of: [{ type: 'block' }],
        },
        // PERUBAHAN DI SINI:
        {
            name: 'pengurus',
            title: 'Daftar Pengurus Desa',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'orang',
                    title: 'Data Pengurus',
                    fields: [
                        { name: 'nama', title: 'Nama', type: 'string' },
                        { name: 'jabatan', title: 'Jabatan', type: 'string' },
                        { name: 'gambar', title: 'Foto', type: 'image', options: { hotspot: true } },
                    ],
                },
            ],
        },
    ],
}