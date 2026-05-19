'use client';
// app/share/SharePage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Componente cliente: muestra la tarjeta visual y hace el redirect a la app.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, use } from 'react';

export default function SharePage({ searchParams }) {
  // searchParams puede ser una Promise en Next.js 15+
  const params = searchParams instanceof Promise ? use(searchParams) : searchParams;

  const title   = params?.title   || '';
  const artist  = params?.artist  || '';
  const artwork = params?.artwork || '';

  const [redirected, setRedirected] = useState(false);
  const [showStore,  setShowStore]  = useState(false);

  function buildDeepLink() {
    const p = new URLSearchParams();
    if (title)   p.set('title',   title);
    if (artist)  p.set('artist',  artist);
    if (artwork) p.set('artwork', artwork);
    return 'sounddrift://share?' + p.toString();
  }

  function openApp() {
    window.location.href = buildDeepLink();
    setTimeout(() => setShowStore(true), 2000);
  }

  // Auto-redirect al llegar (solo si viene de un link real)
  useEffect(() => {
    if (title && !redirected) {
      setRedirected(true);
      const t = setTimeout(openApp, 800);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #0d0d0d;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
        }
        .card {
          background: #181818;
          border-radius: 20px;
          padding: 28px 24px;
          width: 100%;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          box-shadow: 0 8px 40px rgba(124,92,252,0.18);
          border: 1px solid #2a2a2a;
        }
        .artwork {
          width: 160px;
          height: 160px;
          border-radius: 12px;
          object-fit: cover;
          background: #2a2a2a;
        }
        .artwork-placeholder {
          width: 160px;
          height: 160px;
          border-radius: 12px;
          background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 56px;
        }
        h1 {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
        }
        .artist-name {
          font-size: 14px;
          color: #999;
          margin-top: -8px;
        }
        .wave {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          height: 36px;
        }
        .wave span {
          display: block;
          width: 3px;
          border-radius: 2px;
          background: #7C5CFC;
          animation: wave 0.8s ease-in-out infinite alternate;
        }
        .wave span:nth-child(1) { height: 10px; animation-delay: 0.0s; }
        .wave span:nth-child(2) { height: 22px; animation-delay: 0.1s; }
        .wave span:nth-child(3) { height: 16px; animation-delay: 0.2s; }
        .wave span:nth-child(4) { height: 30px; animation-delay: 0.3s; }
        .wave span:nth-child(5) { height: 20px; animation-delay: 0.4s; }
        .wave span:nth-child(6) { height: 28px; animation-delay: 0.3s; }
        .wave span:nth-child(7) { height: 14px; animation-delay: 0.2s; }
        .wave span:nth-child(8) { height: 24px; animation-delay: 0.1s; }
        .wave span:nth-child(9) { height: 10px; animation-delay: 0.0s; }
        @keyframes wave {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(1.0); }
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #555;
          margin-top: -4px;
        }
        .btn {
          display: block;
          background: #7C5CFC;
          color: #fff;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          width: 100%;
          max-width: 300px;
          transition: opacity 0.2s;
        }
        .btn:active { opacity: 0.85; }
        .btn-store {
          background: transparent;
          border: 1px solid #333;
          color: #777;
          font-size: 13px;
          margin-top: 4px;
          transition: all 0.3s;
        }
        .btn-store.visible {
          border-color: #555;
          color: #aaa;
        }
      `}</style>

      <div className="card">
        {artwork
          ? <img src={artwork} alt={title} className="artwork" />
          : <div className="artwork-placeholder">🎵</div>
        }

        <h1>{title || 'SoundDrift'}</h1>
        {artist && <p className="artist-name">{artist}</p>}

        <div className="wave">
          {[...Array(9)].map((_, i) => <span key={i} />)}
        </div>

        <div className="brand">
          <span>▪▪▪</span>
          <span>SoundDrift</span>
        </div>

        <button className="btn" onClick={openApp}>
          Abrir en SoundDrift
        </button>

        <a
          className={`btn btn-store ${showStore ? 'visible' : ''}`}
          href="https://play.google.com/store/apps/details?id=com.sounddrift.music"
        >
          Descargar SoundDrift
        </a>
      </div>
    </>
  );
}
