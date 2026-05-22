// app/api/og/route.js
// ─────────────────────────────────────────────────────────────────────────────
// Genera la imagen Open Graph como PNG real usando @vercel/og.
//
// FIX PRINCIPAL: WhatsApp (y la mayoría de scrapers) IGNORAN imágenes SVG.
// Solo aceptan image/jpeg o image/png. Este endpoint ahora devuelve PNG.
//
// @vercel/og usa Satori internamente y ya viene incluido en Vercel Edge —
// NO necesitas instalar ningún paquete extra.
//
// URL: GET /api/og?title=Alone&artist=Alan+Walker&artwork=https://...
// Devuelve: image/png 600×600
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'SoundDrift';
  const artist  = searchParams.get('artist')  || '';
  const artwork = searchParams.get('artwork') || '';

  // Truncar textos largos
  const titleShort  = title.length  > 28 ? title.slice(0, 27)  + '…' : title;
  const artistShort = artist.length > 36 ? artist.slice(0, 35) + '…' : artist;

  // Descargar el artwork para incrustarlo
  // IMPORTANTE: hay que convertirlo a base64 porque Satori (motor de @vercel/og)
  // no hace fetch de URLs externas desde el Edge runtime.
  let artworkSrc = '';
  if (artwork) {
    try {
      const res = await fetch(artwork, {
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'SoundDrift/1.0' },
      });
      if (res.ok) {
        const buf   = await res.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let bin = '';
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        const mime = res.headers.get('content-type') || 'image/jpeg';
        artworkSrc = `data:${mime};base64,${btoa(bin)}`;
      }
    } catch (_) {
      // Si falla la descarga del artwork, se muestra el placeholder
    }
  }

  // Alturas de las barras de onda decorativas
  const bars = [10, 22, 14, 32, 20, 38, 16, 28, 12, 24, 18, 34, 10, 26, 20, 36, 14, 30, 8, 22];

  return new ImageResponse(
    (
      <div
        style={{
          width: '600px',
          height: '600px',
          background: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
        }}
      >
        {/* Artwork */}
        <div
          style={{
            width: '400px',
            height: '400px',
            marginTop: '40px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {artworkSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={artworkSrc}
              width={400}
              height={400}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              alt=""
            />
          ) : (
            <span style={{ fontSize: '96px' }}>🎵</span>
          )}
        </div>

        {/* Título */}
        <div
          style={{
            marginTop: '20px',
            fontSize: '30px',
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: '520px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {titleShort}
        </div>

        {/* Artista */}
        {artistShort && (
          <div
            style={{
              marginTop: '6px',
              fontSize: '19px',
              color: '#999999',
              textAlign: 'center',
            }}
          >
            {artistShort}
          </div>
        )}

        {/* Barras de onda decorativas */}
        <div
          style={{
            marginTop: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                width: '5px',
                height: `${h}px`,
                borderRadius: '2.5px',
                background: '#8A2BE2',
                opacity: 0.9,
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <div
          style={{
            marginTop: '8px',
            fontSize: '11px',
            color: '#555555',
            letterSpacing: '1.5px',
          }}
        >
          SoundDrift
        </div>
      </div>
    ),
    {
      width: 600,
      height: 600,
      headers: {
        // PNG real → WhatsApp, iMessage, Telegram y todos los scrapers lo aceptan
        'Content-Type':  'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
      },
    },
  );
}
