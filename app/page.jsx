import { redirect } from 'next/navigation';
import HomePage from './HomePage';

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

export default async function Home({ searchParams }) {
  const params = await searchParams;

  // Si alguien llega a la raíz con params de una canción (link viejo de
  // GitHub Pages, o alguien comparte sin pasar por /share), redirige.
  if (params?.title) {
    const qs = new URLSearchParams(params).toString();
    redirect(qs ? `/share?${qs}` : '/share');
  }

  // Sin params -> landing normal de SoundDrift
  return <HomePage />;
}
