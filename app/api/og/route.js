// app/api/og/route.js
// ─────────────────────────────────────────────────────────────────────────────
// Genera la imagen Open Graph desde el propio dominio Vercel.
//
// ¿Por qué es necesario?
//   WhatsApp NO carga imágenes de dominios externos (iTunes, Last.fm, etc.)
//   en el preview. Solo acepta imágenes del mismo dominio del link.
//   Al servirla desde sounddrift-link.vercel.app/api/og, WhatsApp la carga
//   siempre y muestra el preview con portada, título y artista.
//
// URL: GET /api/og?title=Alone&artist=Alan+Walker&artwork=https://...
// Devuelve: image/png 600×600
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'SoundDrift';
  const artist  = searchParams.get('artist')  || '';
  const artwork = searchParams.get('artwork') || '';

  // Descargar el artwork y convertirlo a base64 para incrustarlo en el SVG
  let artworkDataUrl = '';
  if (artwork) {
    try {
      const res = await fetch(artwork, {
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'SoundDrift/1.0' },
      });
      if (res.ok) {
        const buf    = await res.arrayBuffer();
        const bytes  = new Uint8Array(buf);
        let binary   = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const b64  = btoa(binary);
        const mime = res.headers.get('content-type') || 'image/jpeg';
        artworkDataUrl = `data:${mime};base64,${b64}`;
      }
    } catch (_) {}
  }

  // Escapar texto para SVG
  const esc = (s) => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const titleShort  = title.length  > 28 ? title.slice(0, 27)  + '…' : title;
  const artistShort = artist.length > 36 ? artist.slice(0, 35) + '…' : artist;

  // SVG 600×600 — mismo estilo que la tarjeta de la app
  const svg = `<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="art"><rect x="100" y="40" width="400" height="400" rx="20"/></clipPath>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="55%" stop-color="#0d0d0d" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0d0d0d" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <!-- Fondo -->
  <rect width="600" height="600" fill="#0d0d0d"/>

  <!-- Artwork -->
  ${artworkDataUrl
    ? `<image href="${artworkDataUrl}" x="100" y="40" width="400" height="400" clip-path="url(#art)" preserveAspectRatio="xMidYMid slice"/>`
    : `<rect x="100" y="40" width="400" height="400" rx="20" fill="#1a1a1a"/>
       <text x="300" y="270" text-anchor="middle" font-size="96" fill="#333">🎵</text>`
  }

  <!-- Degradado para legibilidad del texto -->
  <rect x="100" y="40" width="400" height="400" fill="url(#fade)" clip-path="url(#art)"/>

  <!-- Título -->
  <text x="300" y="498"
    text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif"
    font-size="30" font-weight="700" fill="#ffffff">
    ${esc(titleShort)}
  </text>

  <!-- Artista -->
  <text x="300" y="534"
    text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif"
    font-size="19" fill="#999999">
    ${esc(artistShort)}
  </text>

  <!-- Barras de onda -->
  ${[10,22,14,32,20,38,16,28,12,24,18,34,10,26,20,36,14,30,8,22].map((h, i) =>
    `<rect x="${190 + i * 11}" y="${567 - h/2}" width="5" height="${h}" rx="2.5" fill="#8A2BE2" opacity="0.9"/>`
  ).join('\n  ')}

  <!-- Logo SoundDrift -->
  <text x="300" y="595"
    text-anchor="middle"
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif"
    font-size="11" fill="#555555" letter-spacing="1.5">
    SoundDrift
  </text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type':  'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
    },
  });
}
