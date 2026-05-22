
// app/api/artwork/route.js
// ─────────────────────────────────────────────────────────────────────────────
// Recibe una imagen en base64 desde Flutter, la guarda en memoria
// y la sirve como URL pública temporal (TTL: 1 hora).
// Flutter la llama ANTES de construir el share URL para obtener una
// URL https:// que WhatsApp pueda cargar en el preview OG.
//
// POST /api/artwork  { "data": "<base64>", "mime": "image/jpeg" }
// → { "url": "https://sounddrift-link.vercel.app/api/artwork?id=xxxx" }
//
// GET /api/artwork?id=xxxx
// → image/jpeg (la imagen)
// ─────────────────────────────────────────────────────────────────────────────

// Almacén en memoria (edge/serverless: cada instancia tiene su propio mapa,
// pero con caché CDN de 1h es suficiente para el caso de uso de share).
const store = new Map(); // id → { buffer, mime, ts }
const TTL   = 60 * 60 * 1000; // 1 hora

function newId() {
  return Math.random().toString(36).slice(2, 10) +
         Math.random().toString(36).slice(2, 10);
}

export async function POST(request) {
  try {
    const { data, mime = 'image/jpeg' } = await request.json();
    if (!data) return Response.json({ error: 'no data' }, { status: 400 });

    // Limpiar entradas viejas
    const now = Date.now();
    for (const [k, v] of store) {
      if (now - v.ts > TTL) store.delete(k);
    }

    const buffer = Buffer.from(data, 'base64');
    const id     = newId();
    store.set(id, { buffer, mime, ts: now });

    const url = `${new URL(request.url).origin}/api/artwork?id=${id}`;
    return Response.json({ url });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return new Response('missing id', { status: 400 });

  const entry = store.get(id);
  if (!entry) return new Response('not found or expired', { status: 404 });

  return new Response(entry.buffer, {
    headers: {
      'Content-Type':  entry.mime,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
