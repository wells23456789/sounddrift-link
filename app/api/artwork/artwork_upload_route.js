// app/api/artwork/route.js
// FIX: el Map() en memoria no funciona en Vercel serverless porque cada
// request puede ir a una instancia diferente. Usamos el sistema de archivos
// temporales (/tmp) que sí persiste dentro de la misma instancia y además
// Next.js cachea las respuestas GET con s-maxage, lo que garantiza que
// WhatsApp siempre obtenga la imagen aunque llegue a otra instancia.

import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const TMP = '/tmp/sd_artwork';

function newId() {
  return Math.random().toString(36).slice(2, 10) +
         Date.now().toString(36);
}

export async function POST(request) {
  try {
    const { data, mime = 'image/jpeg' } = await request.json();
    if (!data) return Response.json({ error: 'no data' }, { status: 400 });

    if (!existsSync(TMP)) await mkdir(TMP, { recursive: true });

    const id  = newId();
    const ext = mime.includes('png') ? 'png' : 'jpg';
    const buf = Buffer.from(data, 'base64');
    await writeFile(path.join(TMP, `${id}.${ext}`), buf);

    const url = `${new URL(request.url).origin}/api/artwork?id=${id}&ext=${ext}`;
    return Response.json({ url });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id  = searchParams.get('id');
  const ext = searchParams.get('ext') || 'jpg';
  if (!id) return new Response('missing id', { status: 400 });

  try {
    const buf  = await readFile(path.join(TMP, `${id}.${ext}`));
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    return new Response(buf, {
      headers: {
        'Content-Type':  mime,
        // Cache largo: WhatsApp scrapea y cachea el OG, necesita que la
        // imagen esté disponible cuando el preview se genera (segundos
        // después del share) y cuando el receptor la ve (minutos/horas después).
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch {
    return new Response('not found', { status: 404 });
  }
}
