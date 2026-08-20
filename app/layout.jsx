export const metadata = {
  title: 'SoundDrift',
  description: 'Escucha música sin límites',
  other: {
    'facebook-domain-verification': '1cd1ymwozwmnbv9iwhus7bbhpqg84i',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta property="fb:app_id" content="2032473874293972" />
        <meta property="og:url" content="https://sounddrift-link.vercel.app" />
        <meta property="og:title" content="SoundDrift — Escucha y descarga tu música favorita" />
        <meta property="og:description" content="SoundDrift es una app móvil para descargar y escuchar tu música favorita directamente en tu dispositivo. Sin suscripciones." />
        <meta property="og:site_name" content="SoundDrift" />
        <meta property="og:image" content="https://sounddrift-link.vercel.app/screenshots/5.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
