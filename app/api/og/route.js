// app/api/og/route.js
// ─────────────────────────────────────────────────────────────────────────────
// Usa iTunes Search API para obtener la portada — sin token, sin límites.
// Imágenes de alta calidad: reemplaza 100x100bb por 600x600bb en la URL.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

async function fetchItunesArtwork(title, artist) {
  const q = [artist, title].filter(Boolean).join(' ');
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5&media=music`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    const results = data?.results ?? [];
    for (const r of results) {
      // artworkUrl100 existe siempre — cambiamos 100x100bb → 600x600bb
      const img = r?.artworkUrl100 || r?.artworkUrl60 || r?.artworkUrl30;
      if (img) return img.replace('100x100bb', '600x600bb').replace('60x60bb', '600x600bb').replace('30x30bb', '600x600bb');
    }
  } catch (_) {}
  return null;
}

async function toDataUrl(imageUrl) {
  try {
    const res = await fetch(imageUrl, {
      signal:  AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'SoundDrift/1.0' },
    });
    if (!res.ok) return null;
    const buf   = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    const CHUNK = 8192;
    let b64 = '';
    for (let i = 0; i < bytes.length; i += CHUNK) {
      b64 += btoa(String.fromCharCode(...bytes.subarray(i, i + CHUNK)));
    }
    const mime = res.headers.get('content-type') || 'image/jpeg';
    return `data:${mime};base64,${b64}`;
  } catch (_) {
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')  || '';
  const artist  = searchParams.get('artist') || '';
  let   artwork = searchParams.get('artwork') || '';

  // Si Flutter no mandó artwork, buscarlo en iTunes
  if (!artwork && (title || artist)) {
    artwork = (await fetchItunesArtwork(title, artist)) || '';
  }

  const artworkSrc = artwork ? await toDataUrl(artwork) : null;

  return new ImageResponse(
    (
      <div style={{ width:'600px', height:'600px', display:'flex', alignItems:'center', justifyContent:'center', background:'#0d0d0d' }}>
        {artworkSrc ? (
          <img src={artworkSrc} width={600} height={600} style={{ objectFit:'cover', width:'100%', height:'100%' }} alt="" />
        ) : (
          <div style={{ width:'600px', height:'600px', background:'#1a1a1a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px' }}>
            <div style={{ fontSize:'120px' }}>🎵</div>
            <div style={{ fontSize:'18px', color:'#555', letterSpacing:'2px', fontFamily:'sans-serif' }}>SoundDrift</div>
          </div>
        )}
      </div>
    ),
    {
      width: 600,
      height: 600,
      headers: {
        'Content-Type':  'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
      },
    },
  );
}
