// app/share/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Página de redirección de SoundDrift con Open Graph dinámico (SSR).
// URL de entrada:  https://TU_APP.vercel.app/share?title=...&artist=...&artwork=...
// Al cargar → muestra tarjeta bonita → redirige a sounddrift://share?...
// WhatsApp/Telegram leen los <meta og:...> generados en el servidor → preview real
// ─────────────────────────────────────────────────────────────────────────────

// ── generateMetadata (Server Side) ───────────────────────────────────────────
// Next.js llama esto antes de renderizar; genera las etiquetas <head> en el
// servidor, que es exactamente lo que lee el bot de WhatsApp/Telegram.
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const title   = params?.title   || 'SoundDrift';
  const artist  = params?.artist  || 'Escucha música sin límites';
  const artwork = params?.artwork || '';

  // Imagen de Open Graph:
  // - Si el link trae artwork= usamos esa URL directamente.
  // - Si no, usamos la imagen genérica que vive en /public/og-default.png
  const ogImage = artwork || '/og-default.png';

  const description = `${title} — ${artist} · Escucha en SoundDrift`;

  return {
    title: `${title} — ${artist}`,
    description,
    openGraph: {
      title:       `${title} — ${artist}`,
      description,
      siteName:    'SoundDrift',
      type:        'music.song',
      images: [
        {
          url:    ogImage,
          width:  600,
          height: 600,
          alt:    `${title} — ${artist}`,
        },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${title} — ${artist}`,
      description,
      images:      [ogImage],
    },
  };
}

// ── Página (Client Component para el redirect JS) ─────────────────────────────
import SharePage from './SharePage';

export default function Page({ searchParams }) {
  return <SharePage searchParams={searchParams} />;
}
