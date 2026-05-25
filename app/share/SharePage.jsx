'use client';
// app/share/SharePage.jsx

import { useEffect, useState, use, useRef } from 'react';

const DOWNLOAD_URL = 'https://www.mediafire.com/file/y6athk86ct4daqa/app-release.apk/file';
const BASE         = 'https://sounddrift-link.vercel.app';

export default function SharePage({ searchParams }) {
  const params  = searchParams instanceof Promise ? use(searchParams) : searchParams;
  const title   = params?.title   || '';
  const artist  = params?.artist  || '';
  const artwork = params?.artwork || '';

  const [redirected, setRedirected]   = useState(false);
  const [imgLoaded,  setImgLoaded]    = useState(false);
  const [dominantColor, setDominant]  = useState('#1a0533');
  const canvasRef = useRef(null);

  // URL de la imagen OG (portada cuadrada de iTunes)
  const artworkUrl = `${BASE}/api/og`
    + `?title=${encodeURIComponent(title)}`
    + `&artist=${encodeURIComponent(artist)}`
    + (artwork ? `&artwork=${encodeURIComponent(artwork)}` : '');

  function buildDeepLink() {
    const p = new URLSearchParams();
    if (title)   p.set('title',   title);
    if (artist)  p.set('artist',  artist);
    if (artwork) p.set('artwork', artwork);
    return 'sounddrift://share?' + p.toString();
  }

  function openApp() {
    window.location.href = buildDeepLink();
  }

  // Extraer color dominante de la portada para el gradiente de fondo
  function extractColor(imgEl) {
    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 8; canvas.height = 8;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgEl, 0, 0, 8, 8);
      const d = ctx.getImageData(0, 0, 8, 8).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; }
      const px = d.length / 4;
      // Oscurecer bastante para que sea un fondo, no un color brillante
      r = Math.floor(r / px * 0.45);
      g = Math.floor(g / px * 0.45);
      b = Math.floor(b / px * 0.45);
      setDominant(`rgb(${r},${g},${b})`);
    } catch (_) {}
  }

  useEffect(() => {
    if (title && !redirected) {
      setRedirected(true);
      setTimeout(openApp, 500);
    }
  }, [title]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} crossOrigin="anonymous" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;900&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

        html, body {
          height: 100%;
          font-family: 'Figtree', sans-serif;
          background: #000;
          color: #fff;
          overflow: hidden;
        }

        /* ── Fondo: portada desenfocada que llena toda la pantalla ── */
        .bg-artwork {
          position: fixed;
          inset: -40px;
          background-image: var(--bg-img);
          background-size: cover;
          background-position: center;
          filter: blur(80px) brightness(0.35) saturate(1.4);
          transform: scale(1.15);
          transition: background-image 0.8s ease;
          z-index: 0;
        }

        /* Capa de color dominante encima del blur */
        .bg-color {
          position: fixed;
          inset: 0;
          background: var(--dominant, #1a0533);
          opacity: 0.55;
          z-index: 1;
          transition: background 1s ease;
        }

        /* Gradiente negro desde abajo */
        .bg-fade {
          position: fixed;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 30%,
            rgba(0,0,0,0.7) 65%,
            rgba(0,0,0,0.97) 100%
          );
          z-index: 2;
        }

        /* ── Layout ── */
        .page {
          position: relative;
          z-index: 3;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          padding: 0 24px 40px;
          max-width: 480px;
          margin: 0 auto;
        }

        /* Logo arriba */
        .nav {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 52px 0 0;
          opacity: 0;
          animation: fadeIn 0.5s ease 0.1s forwards;
        }
        .nav-icon {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #8B5CF6, #6D28D9);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          gap: 1.5px;
          padding: 5px;
        }
        .nav-bar {
          width: 2.5px;
          background: white;
          border-radius: 2px;
        }
        .nav-name {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          opacity: 0.9;
        }

        /* Portada centrada */
        .artwork-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }
        .artwork-wrap {
          width: min(280px, 72vw);
          height: min(280px, 72vw);
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 40px 120px rgba(0,0,0,0.8),
            0 0 0 1px rgba(255,255,255,0.06);
          opacity: 0;
          animation: scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s forwards;
          position: relative;
        }
        .artwork-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.4s;
        }
        .artwork-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #1e1040, #0d0620);
          display: flex; align-items: center; justify-content: center;
          font-size: 72px;
        }

        /* Info + botones abajo */
        .bottom {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .song-info {
          opacity: 0;
          animation: fadeUp 0.5s ease 0.35s forwards;
          margin-bottom: 28px;
        }
        .song-title {
          font-size: clamp(22px, 6vw, 30px);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.8px;
          color: #fff;
          margin-bottom: 5px;
          /* Texto largo: recortar con ellipsis */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .song-artist {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Botón principal — igual que Spotify: pill blanco */
        .btn-open {
          width: 100%;
          padding: 17px;
          border-radius: 50px;
          border: none;
          background: #fff;
          color: #000;
          font-family: 'Figtree', sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: transform 0.12s, background 0.15s;
          opacity: 0;
          animation: fadeUp 0.5s ease 0.45s forwards;
        }
        .btn-open:active  { transform: scale(0.97); }
        .btn-open:hover   { background: rgba(255,255,255,0.88); }

        /* Botón secundario — pill transparente con borde */
        .btn-download {
          display: block;
          width: 100%;
          padding: 16px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.8);
          font-family: 'Figtree', sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.15s;
          backdrop-filter: blur(12px);
          opacity: 0;
          animation: fadeUp 0.5s ease 0.52s forwards;
        }
        .btn-download:hover {
          border-color: rgba(255,255,255,0.45);
          color: #fff;
          background: rgba(255,255,255,0.12);
        }

        .footer-note {
          text-align: center;
          font-size: 11px;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-top: 20px;
          opacity: 0;
          animation: fadeUp 0.5s ease 0.6s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Fondo con portada desenfocada */}
      <div
        className="bg-artwork"
        style={{ '--bg-img': imgLoaded ? `url(${artworkUrl})` : 'none' }}
      />
      <div
        className="bg-color"
        style={{ '--dominant': dominantColor }}
      />
      <div className="bg-fade" />

      <div className="page">
        {/* Nav / Logo */}
        <div className="nav">
          <div className="nav-icon">
            {[10,16,12,18,8,14,10].map((h,i) => (
              <div key={i} className="nav-bar" style={{ height: `${h}px` }}/>
            ))}
          </div>
          <span className="nav-name">SoundDrift</span>
        </div>

        {/* Portada */}
        <div className="artwork-section">
          <div className="artwork-wrap">
            <img
              src={artworkUrl}
              alt={title || 'SoundDrift'}
              className="artwork-img"
              crossOrigin="anonymous"
              onLoad={(e) => {
                setImgLoaded(true);
                extractColor(e.target);
              }}
              style={{ opacity: imgLoaded ? 1 : 0 }}
            />
            {!imgLoaded && (
              <div className="artwork-placeholder">🎵</div>
            )}
          </div>
        </div>

        {/* Info + botones */}
        <div className="bottom">
          <div className="song-info">
            <div className="song-title">{title || 'SoundDrift'}</div>
            {artist && <div className="song-artist">{artist}</div>}
          </div>

          <button className="btn-open" onClick={openApp}>
            Abrir en SoundDrift
          </button>

          <a
            className="btn-download"
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar SoundDrift
          </a>

          <div className="footer-note">Escucha música sin límites</div>
        </div>
      </div>
    </>
  );
}
