// app/share/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIX 1: og:image type cambiado de 'image/svg+xml' → 'image/png'
//         WhatsApp ignora SVG. Ahora /api/og devuelve PNG real via @vercel/og.
//
// FIX 2: Se agregan App Links (al:android / al:ios) para que al tocar
//         la tarjeta en WhatsApp/iMessage abra SoundDrift directamente
//         en vez del navegador — igual que Spotify.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL    = 'https://sounddrift-link.vercel.app';
const ANDROID_PKG = 'com.sounddrift.music';
// Si tienes app en App Store, pon el ID aquí. Si no, déjalo vacío ('').
const IOS_APP_ID  = '';

export async function generateMetadata({ searchParams }) {
  const params  = await searchParams;
  const title   = params?.title   || 'SoundDrift';
  const artist  = params?.artist  || 'Escucha música sin límites';
  const artwork = params?.artwork || '';

  const description = `${title} — ${artist} · Escucha en SoundDrift`;

  // URL de la imagen OG — /api/og ahora devuelve PNG real
  const ogImage = `${BASE_URL}/api/og`
    + `?title=${encodeURIComponent(title)}`
    + `&artist=${encodeURIComponent(artist)}`
    + (artwork ? `&artwork=${encodeURIComponent(artwork)}` : '');

  // Deep link para abrir la canción directamente en la app
  const deepLink = `sounddrift://share`
    + `?title=${encodeURIComponent(title)}`
    + `&artist=${encodeURIComponent(artist)}`
    + (artwork ? `&artwork=${encodeURIComponent(artwork)}` : '');

  // URL canónica de esta página
  const pageUrl = `${BASE_URL}/share`
    + `?title=${encodeURIComponent(title)}`
    + `&artist=${encodeURIComponent(artist)}`;

  return {
    title:       `${title} — ${artist}`,
    description,

    openGraph: {
      title:       `${title} — ${artist}`,
      description,
      siteName:    'SoundDrift',
      type:        'music.song',
      url:         pageUrl,
      images: [{
        url:    ogImage,
        width:  600,
        height: 600,
        alt:    `${title} — ${artist}`,
        // FIX: PNG, no SVG. Sin esto WhatsApp ignora la imagen.
        type:   'image/png',
      }],
    },

    twitter: {
      card:        'summary_large_image',
      title:       `${title} — ${artist}`,
      description,
      images:      [ogImage],
    },

    // ── App Links ──────────────────────────────────────────────────────────
    // Estos meta tags le dicen a WhatsApp, iMessage y navegadores que
    // al tocar el link deben abrir la app nativa en vez del navegador.
    // Mismo mecanismo que usa Spotify con open.spotify.com.
    other: {
      // Android
      'al:android:url':      deepLink,
      'al:android:app_name': 'SoundDrift',
      'al:android:package':  ANDROID_PKG,

      // iOS (solo activo si hay App Store ID)
      ...(IOS_APP_ID ? {
        'al:ios:url':          deepLink,
        'al:ios:app_name':     'SoundDrift',
        'al:ios:app_store_id': IOS_APP_ID,
      } : {}),

      // web:should_fallback: si la app no está instalada, quédate en la web
      'al:web:should_fallback': 'true',
      'al:web:url':             pageUrl,
      'fb:app_id':               '2032473874293972',
    },
  };
}

import SharePage from './SharePage';

export default function Page({ searchParams }) {
  return <SharePage searchParams={searchParams} />;
}
