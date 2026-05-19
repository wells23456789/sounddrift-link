import { redirect } from 'next/navigation';

export default function Home({ searchParams }) {
  // Si alguien llega a la raíz con params (link viejo de GitHub Pages), redirige
  const qs = new URLSearchParams(searchParams || {}).toString();
  redirect(qs ? `/share?${qs}` : '/share');
}
