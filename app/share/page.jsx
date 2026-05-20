// app/share/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// og:image apunta a /api/og (mismo dominio Vercel) para que WhatsApp
// siempre cargue la imagen del preview con la portada de la canción.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://sounddrift-link.vercel.app';

export async function generateMetadata({ searchParams }) {
  const params  = await searchParams;
  const title   = params?.title   || 'SoundDrift';
  const artist  = params?.artist  || 'Escucha música sin límites';
  const artwork = params?.artwork || '';

  const description = `${title} — ${artist} · Escucha en SoundDrift`;

  // og:image desde /api/og (mismo dominio) → WhatsApp lo acepta siempre
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}${artwork ? `&artwork=${encodeURIComponent(artwork)}` : ''}`;

  return {
    title:       `${title} — ${artist}`,
    description,
    openGraph: {
      title:       `${title} — ${artist}`,
      description,
      siteName:    'SoundDrift',
      type:        'music.song',
      url:         `${BASE_URL}/share?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`,
      images: [{
        url:    ogImage,
        width:  600,
        height: 600,
        alt:    `${title} — ${artist}`,
        type:   'image/svg+xml',
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${title} — ${artist}`,
      description,
      images:      [ogImage],
    },
  };
}

import SharePage from './SharePage';

export default function Page({ searchParams }) {
  return <SharePage searchParams={searchParams} />;
}
