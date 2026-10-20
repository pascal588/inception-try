import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PantauDesa — Dasbor WebGIS Transparansi Dana Desa & Partisipasi Publik',
  description:
    'Platform civic-tech pengawasan dana desa partisipatif berbasis WebGIS dan AI verifier. Menjembatani dokumen anggaran dengan kondisi fisik di lapangan.',
  keywords: ['Dana Desa', 'WebGIS', 'Transparansi Anggaran', 'Civic Tech', 'Musrenbangdes', 'PantauDesa'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
