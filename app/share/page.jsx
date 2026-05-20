// app/share/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Página SSR de SoundDrift con Open Graph dinámico.
//
// Por qué WhatsApp no mostraba la imagen antes:
//   WhatsApp bot NO sigue redirects ni carga imágenes de dominios externos
//   arbitrarios. El og:image debe ser una URL absoluta dentro del mismo
//   dominio de Vercel, o una URL de dominio conocido (iTunes, etc.).
//
// Solución:
//   Si hay artwork= en los params → usamos /api/og?... que genera una imagen
//   PNG en el servidor con el artwork incrustado (dentro del dominio Vercel).
//   Si no hay artwork → usamos la imagen genérica /og-default.png.
//
// Esto es exactamente lo que hace Spotify: su og:image es siempre una URL
// de su propio dominio (open.spotify.com/og-image/...) que el servidor
// genera dinámicamente con la portada.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://sounddrift-link.vercel.app';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const title   = params?.title   || 'SoundDrift';
  const artist  = params?.artist  || 'Escucha música sin límites';
  const artwork = params?.artwork || '';

  const description = `${title} — ${artist} · Escucha en SoundDrift`;

  // og:image siempre dentro de nuestro dominio → WhatsApp lo acepta siempre
  const ogImageUrl = artwork
    ? `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}&artwork=${encodeURIComponent(artwork)}`
    : `${BASE_URL}/og-default.png`;

  return {
    title: `${title} — ${artist}`,
    description,
    openGraph: {
      title:       `${title} — ${artist}`,
      description,
      siteName:    'SoundDrift',
      type:        'music.song',
      url:         `${BASE_URL}/share?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`,
      images: [
        {
          url:          ogImageUrl,
          secureUrl:    ogImageUrl,   // ← WhatsApp exige secure_url
          width:        600,
          height:       600,
          alt:          `${title} — ${artist}`,
          type:         'image/png',
        },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${title} — ${artist}`,
      description,
      images:      [ogImageUrl],
    },
    // WhatsApp también lee estas meta tags directas
    other: {
      'og:image':            ogImageUrl,
      'og:image:secure_url': ogImageUrl,
      'og:image:width':      '600',
      'og:image:height':     '600',
      'og:image:type':       'image/png',
    },
  };
}

import SharePage from './SharePage';

export default function Page({ searchParams }) {
  return <SharePage searchParams={searchParams} />;
}
