export const metadata = {
  title: 'SoundDrift',
  description: 'Escucha música sin límites',
  other: {
    'facebook-domain-verification': '1cd1ymwozwmnbv9iwhus7bbhpqg84i',
    'fb:app_id': '2032473874293972',
  },
  openGraph: {
    url: 'https://sounddrift-link.vercel.app',
    title: 'SoundDrift — Escucha y descarga tu música favorita',
    description: 'SoundDrift es una app móvil para descargar y escuchar tu música favorita directamente en tu dispositivo. Sin suscripciones.',
    siteName: 'SoundDrift',
    images: ['https://sounddrift-link.vercel.app/screenshots/5.png'],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
