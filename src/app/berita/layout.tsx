// src/app/berita/layout.tsx
    
export default function BeritaPageLayout({
    children,
    modal,
  }: {
    children: React.ReactNode
    modal: React.ReactNode
  }) {
    return (
      <>
        {children}
        {modal}
      </>
    )
  }