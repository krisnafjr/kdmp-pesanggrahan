// sanity/schemaTypes/pengaturanSitus.ts
import {Rule} from 'sanity'

export default {
    name: 'pengaturanSitus',
    title: 'Pengaturan Situs',
    type: 'document',
    fields: [
        // ... field yang sudah ada (judulSitus, logo, dll.) ...
        {
            name: 'nomorWhatsapp',
            title: 'Nomor WhatsApp Pengurus',
            type: 'string',
            description: 'Masukkan nomor dengan format 62 (contoh: 6281234567890)',
        },
        {
            name: 'pesanWhatsapp',
            title: 'Pesan Otomatis WhatsApp',
            type: 'text',
            description: 'Teks yang akan muncul otomatis saat pengguna mengklik tombol.',
            initialValue: 'Halo, saya ingin bertanya tentang Desa Pesanggrahan.',
        },
    ],
}