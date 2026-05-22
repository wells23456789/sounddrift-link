// app/api/og/route.js
import { ImageResponse } from 'next/og';

function cleanArtist(artist) {
  return artist.split(/\s+(ft\.?|feat\.?|&|x\s|vs\.?|\+|con\s|with\s)/i)[0].trim();
}

async function itunesSearch(q) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5&media=music`;
  try {
    const res  = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = await res.json();
    for (const r of (data?.results ?? [])) {
      const img = r?.artworkUrl100 || r?.artworkUrl60 || r?.artworkUrl30;
      if (img) return img.replace(/\d+x\d+bb/, '600x600bb');
    }
  } catch (_) {}
  return null;
}

async function fetchItunesArtwork(title, artist) {
  const ca = cleanArtist(artist);
  // Solo 2 intentos — artista+título y solo título.
  // NO hacer fallback al artista solo: devolvería la portada incorrecta de otro álbum.
  return (await itunesSearch(`${ca} ${title}`))
      ?? (await itunesSearch(title))
      ?? null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')  || '';
  const artist  = searchParams.get('artist') || '';
  let   artwork = searchParams.get('artwork') || '';

  // artwork puede ser:
  // 1. URL de la CDN de Apple (https://is1-ssl.mzstatic.com/...)  → Satori la carga directo
  // 2. URL de /api/artwork?id=xxx (portada local subida por Flutter) → también directo
  // 3. Vacío → buscamos en iTunes
  if (!artwork && (title || artist))
    artwork = (await fetchItunesArtwork(title, artist)) || '';

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
    { width: 600, height: 600,
      headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } },
  );
}
