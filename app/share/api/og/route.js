// app/api/og/route.js
// ─────────────────────────────────────────────────────────────────────────────
// Genera una imagen PNG 600×600 con el artwork de la canción incrustado.
// WhatsApp exige que el og:image venga del mismo dominio o de uno conocido.
// Al servir la imagen desde /api/og dentro de Vercel, WhatsApp la acepta
// siempre y muestra el preview con portada, título y artista.
//
// URL: /api/og?title=Alone&artist=Alan+Walker&artwork=https://...
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'SoundDrift';
  const artist  = searchParams.get('artist')  || '';
  const artwork = searchParams.get('artwork') || '';

  // Intentar descargar el artwork para incrustarlo en base64
  let artworkDataUrl = '';
  if (artwork) {
    try {
      const res = await fetch(artwork, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const buf    = await res.arrayBuffer();
        const bytes  = new Uint8Array(buf);
        let binary   = '';
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const b64    = btoa(binary);
        const mime   = res.headers.get('content-type') || 'image/jpeg';
        artworkDataUrl = `data:${mime};base64,${b64}`;
      }
    } catch (_) { /* si falla, renderizamos sin imagen */ }
  }

  // Truncar textos largos
  const titleShort  = title.length  > 32 ? title.slice(0, 31)  + '…' : title;
  const artistShort = artist.length > 40 ? artist.slice(0, 39) + '…' : artist;

  // SVG 600×600 — mismo look que la tarjeta de la app
  const svg = `
<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="artClip">
      <rect x="100" y="60" width="400" height="400" rx="24"/>
    </clipPath>
    <clipPath id="bgClip">
      <rect width="600" height="600"/>
    </clipPath>
    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#111111"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#7C5CFC" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Fondo -->
  <rect width="600" height="600" fill="url(#grad)"/>

  <!-- Artwork -->
  ${artworkDataUrl
    ? `<image href="${artworkDataUrl}" x="100" y="60" width="400" height="400" clip-path="url(#artClip)" preserveAspectRatio="xMidYMid slice"/>`
    : `<rect x="100" y="60" width="400" height="400" rx="24" fill="#1a1a1a"/>
       <text x="300" y="290" text-anchor="middle" font-size="80" fill="#333">🎵</text>`
  }

  <!-- Gradiente sobre la imagen para que el texto sea legible -->
  <rect x="100" y="360" width="400" height="100" fill="url(#grad)" opacity="0.85" clip-path="url(#artClip)"/>

  <!-- Título -->
  <text x="300" y="510"
    text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="28"
    font-weight="700"
    fill="#ffffff">
    ${titleShort.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  </text>

  <!-- Artista -->
  <text x="300" y="546"
    text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="18"
    fill="#999999">
    ${artistShort.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  </text>

  <!-- Barras de onda (decorativas) -->
  ${[8,18,12,28,20,32,14,26,10,22,16,30,8,24,18].map((h, i) =>
    `<rect x="${218 + i * 11}" y="${570 - h/2}" width="5" height="${h}" rx="2.5" fill="#7C5CFC" opacity="0.8"/>`
  ).join('')}

  <!-- Logo SoundDrift -->
  <text x="300" y="598"
    text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="11"
    fill="#444444"
    letter-spacing="1">
    SoundDrift
  </text>
</svg>`;

  // Devolver el SVG con Content-Type image/svg+xml
  // WhatsApp acepta SVG como og:image siempre que el servidor devuelva
  // el Content-Type correcto y la URL sea del mismo dominio.
  return new Response(svg, {
    headers: {
      'Content-Type':  'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
}
