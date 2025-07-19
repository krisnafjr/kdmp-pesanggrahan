export const produkQuery = `*[_type == "produk"]{
  _id,
  name,
  slug,
  image,
  category,
  description
} | order(_createdAt desc)`
