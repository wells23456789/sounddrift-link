/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Sirve assetlinks.json con el Content-Type exacto que exige Android
        source: '/.well-known/assetlinks.json',
        headers: [
          { key: 'Content-Type',  value: 'application/json' },
          { key: 'Cache-Control', value: 'no-cache' },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        // Next.js ignora carpetas que empiezan con punto en /public.
        // Esta rewrite mapea /.well-known/ → /well-known/ (sin el punto)
        // para que Vercel lo sirva correctamente.
        source:      '/.well-known/:file',
        destination: '/well-known/:file',
      },
    ];
  },
};

module.exports = nextConfig;
