// app/api/og/route.js
import { ImageResponse } from 'next/og';

// ── Limpiar artista: "Bad Bunny ft. Jhay" → "Bad Bunny" ──────────────────────
function cleanArtist(artist) {
  return artist.split(/\s+(ft\.?|feat\.?|&|x\s|vs\.?|\+|con\s|with\s)/i)[0].trim();
}

// ── Buscar portada en iTunes — devuelve URL directa (NO base64) ───────────────
// Satori renderiza URLs externas directas sin problema.
// Convertir a base64 causa que Satori rechace la imagen silenciosamente.
async function fetchItunesArtwork(title, artist) {
  const cleanedArtist = cleanArtist(artist);

  async function search(q) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5&media=music`;
    try {
      const res  = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) return null;
      const data = await res.json();
      for (const r of (data?.results ?? [])) {
        const img = r?.artworkUrl100 || r?.artworkUrl60 || r?.artworkUrl30;
        if (img) return img
          .replace('100x100bb', '600x600bb')
          .replace('60x60bb',   '600x600bb')
          .replace('30x30bb',   '600x600bb');
      }
    } catch (_) {}
    return null;
  }

  // Intento 1: artista limpio + título
  return (await search(`${cleanedArtist} ${title}`))
      // Intento 2: solo título
   ?? (await search(title))
      // Intento 3: solo artista limpio
   ?? (await search(cleanedArtist))
   ?? null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')  || '';
  const artist  = searchParams.get('artist') || '';
  let   artwork = searchParams.get('artwork') || '';

  if (!artwork && (title || artist))
    artwork = (await fetchItunesArtwork(title, artist)) || '';

  // artwork es ahora una URL https:// directa de la CDN de Apple.
  // Satori la carga directamente sin conversión a base64.
  return new ImageResponse(
    (
      <div style={{ width:'600px', height:'600px', display:'flex', alignItems:'center', justifyContent:'center', background:'#0d0d0d' }}>
        {artwork
          ? <img src={artwork} width={600} height={600} style={{ objectFit:'cover', width:'100%', height:'100%' }} alt="" />
          : <div style={{ width:'600px', height:'600px', background:'#1a1a1a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px' }}>
              <div style={{ fontSize:'120px' }}>🎵</div>
              <div style={{ fontSize:'18px', color:'#555', letterSpacing:'2px', fontFamily:'sans-serif' }}>SoundDrift</div>
            </div>
        }
      </div>
    ),
    {
      width:  600,
      height: 600,
      headers: {
        'Content-Type':  'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    },
  );
}
