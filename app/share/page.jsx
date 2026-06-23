// app/share/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// App Links + fb:app_id para que Facebook Stories genere el sticker
// interactivo "Abrir en SoundDrift" cuando se comparte una historia.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL    = 'https://sounddrift-link.vercel.app';
const ANDROID_PKG = 'com.sounddrift.music';
const FB_APP_ID   = '2032473874293972';
// Si tienes app en App Store, pon el ID aquí. Si no, déjalo vacío ('').
const IOS_APP_ID  = '';

export async function generateMetadata({ searchParams }) {
  const params  = await searchParams;
  const title   = params?.title   || 'SoundDrift';
  const artist  = params?.artist  || 'Escucha música sin límites';
  const artwork = params?.artwork || '';

  const description = `${title} — ${artist} · Escucha en SoundDrift`;

  const ogImage = `${BASE_URL}/api/og`
    + `?title=${encodeURIComponent(title)}`
    + `&artist=${encodeURIComponent(artist)}`
    + (artwork ? `&artwork=${encodeURIComponent(artwork)}` : '');

  const deepLink = `sounddrift://share`
    + `?title=${encodeURIComponent(title)}`
    + `&artist=${encodeURIComponent(artist)}`
    + (artwork ? `&artwork=${encodeURIComponent(artwork)}` : '');

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
        type:   'image/png',
      }],
    },

    twitter: {
      card:        'summary_large_image',
      title:       `${title} — ${artist}`,
      description,
      images:      [ogImage],
    },

    other: {
      // ── App Links Android ────────────────────────────────────────────────
      // Al tocar la card en WhatsApp/Facebook/navegador → abre SoundDrift.
      // Facebook lee estos tags del content_url para generar el sticker
      // interactivo "Abrir en SoundDrift" en la historia.
      'al:android:url':      deepLink,
      'al:android:app_name': 'SoundDrift',
      'al:android:package':  ANDROID_PKG,

      // ── App Links iOS ────────────────────────────────────────────────────
      ...(IOS_APP_ID ? {
        'al:ios:url':          deepLink,
        'al:ios:app_name':     'SoundDrift',
        'al:ios:app_store_id': IOS_APP_ID,
      } : {}),

      // ── Web fallback ─────────────────────────────────────────────────────
      'al:web:should_fallback': 'true',
      'al:web:url':             pageUrl,

      // ── Facebook App ID ──────────────────────────────────────────────────
      // Este tag conecta la URL con tu app registrada en Facebook Developer.
      // Facebook lo usa para verificar que SoundDrift tiene App Links válidos
      // y genera el sticker interactivo en las historias automáticamente.
      'fb:app_id': FB_APP_ID,
    },
  };
}

import SharePage from './SharePage';

export default function Page({ searchParams }) {
  return <SharePage searchParams={searchParams} />;
}
