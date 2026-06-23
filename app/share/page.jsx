// app/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Landing page principal (https://sounddrift-link.vercel.app/)
// Se muestra cuando alguien NO entra por un link de canción (/share),
// sino que abre el dominio raíz directamente.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'SoundDrift — Escucha y descarga tu música favorita',
  description:
    'SoundDrift es una app móvil para descargar y escuchar tu música favorita directamente en tu dispositivo. Sin suscripciones, sin anuncios molestos.',
  openGraph: {
    title: 'SoundDrift — Escucha y descarga tu música favorita',
    description:
      'Descarga música, crea playlists, agrega tus videos favoritos y mucho más.',
    siteName: 'SoundDrift',
    type: 'website',
    images: [
      {
        url: 'https://sounddrift-link.vercel.app/screenshots/5.png',
        width: 1080,
        height: 1920,
        alt: 'SoundDrift app',
      },
    ],
  },
};

import HomePage from './HomePage';

export default function Page() {
  return <HomePage />;
}
