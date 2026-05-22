// app/api/og/route.js
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const artwork = searchParams.get('artwork') || '';

  // Descargar artwork y convertir a base64
  // FIX: usar TextDecoder/Uint8Array correctamente en Edge runtime.
  // btoa(string) falla con bytes > 127 (imágenes JPEG/PNG tienen muchos).
  // La forma correcta es convertir Uint8Array → base64 sin pasar por string JS.
  let artworkSrc = '';
  if (artwork) {
    try {
      const res = await fetch(artwork, {
        signal: AbortSignal.timeout(6000),
        headers: { 'User-Agent': 'SoundDrift/1.0' },
      });
      if (res.ok) {
        const buf   = await res.arrayBuffer();
        const bytes = new Uint8Array(buf);
        // Convertir Uint8Array a base64 en chunks para no romper el stack
        // con imágenes grandes (el método naive falla con > ~64KB)
        const CHUNK = 8192;
        let b64 = '';
        for (let i = 0; i < bytes.length; i += CHUNK) {
          b64 += btoa(String.fromCharCode(...bytes.subarray(i, i + CHUNK)));
        }
        const mime = res.headers.get('content-type') || 'image/jpeg';
        artworkSrc = `data:${mime};base64,${b64}`;
      }
    } catch (_) {}
  }

  return new ImageResponse(
    (
      // Layout: solo la portada, cuadrada, sin texto ni ondas.
      // El título y artista ya los muestra WhatsApp debajo con og:title/og:description.
      // Duplicarlos en la imagen los haría aparecer dos veces.
      <div
        style={{
          width: '600px',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0d0d',
        }}
      >
        {artworkSrc ? (
          <img
            src={artworkSrc}
            width={600}
            height={600}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            alt=""
          />
        ) : (
          // Placeholder cuando no hay artwork o falla la descarga
          <div
            style={{
              width: '600px',
              height: '600px',
              background: '#1a1a1a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <div style={{ fontSize: '120px' }}>🎵</div>
            <div
              style={{
                fontSize: '18px',
                color: '#555',
                letterSpacing: '2px',
                fontFamily: 'sans-serif',
              }}
            >
              SoundDrift
            </div>
          </div>
        )}
      </div>
    ),
    {
      width: 600,
      height: 600,
      headers: {
        'Content-Type':  'image/png',
        // Cache largo: la portada de una canción no cambia
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
      },
    },
  );
}
