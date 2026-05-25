'use client';
// app/share/SharePage.jsx
// Estilo inspirado en Spotify: fondo oscuro, gradiente de color de la portada,
// tarjeta centrada, tipografía bold, un solo botón de descarga.

import { useEffect, useState, use } from 'react';

const DOWNLOAD_URL = 'https://www.mediafire.com/file/y6athk86ct4daqa/app-release.apk/file';

export default function SharePage({ searchParams }) {
  const params  = searchParams instanceof Promise ? use(searchParams) : searchParams;
  const title   = params?.title   || '';
  const artist  = params?.artist  || '';
  const artwork = params?.artwork || '';

  const [redirected, setRedirected] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const ogImageUrl = `https://sounddrift-link.vercel.app/api/og?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}${artwork ? `&artwork=${encodeURIComponent(artwork)}` : ''}`;

  function buildDeepLink() {
    const p = new URLSearchParams();
    if (title)   p.set('title',   title);
    if (artist)  p.set('artist',  artist);
    if (artwork) p.set('artwork', artwork);
    return 'sounddrift://share?' + p.toString();
  }

  function openApp() {
    window.location.href = buildDeepLink();
    setTimeout(() => setShowDownload(true), 1800);
  }

  useEffect(() => {
    if (title && !redirected) {
      setRedirected(true);
      const t = setTimeout(openApp, 600);
      return () => clearTimeout(t);
    }
  }, [title]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Circular+Std:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --accent: #1DB954;
          --bg: #0a0a0a;
          --card-bg: rgba(255,255,255,0.05);
          --text: #ffffff;
          --text-secondary: rgba(255,255,255,0.6);
          --radius: 16px;
        }

        html, body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 20px 48px;
          position: relative;
          overflow: hidden;
        }

        /* Gradiente de fondo difuso como Spotify */
        .bg-blur {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .bg-blur::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%);
          top: -150px;
          left: -100px;
          filter: blur(60px);
        }
        .bg-blur::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(29,185,84,0.2) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          filter: blur(80px);
        }

        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #8B5CF6, #6D28D9);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-bars {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 18px;
        }
        .logo-bar {
          width: 3px;
          border-radius: 2px;
          background: white;
        }
        .logo-name {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: white;
        }

        /* Portada */
        .artwork-wrap {
          position: relative;
          width: 260px;
          height: 260px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 32px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.08);
          opacity: 0;
          animation: fadeUp 0.6s ease 0.15s forwards;
          flex-shrink: 0;
        }
        .artwork-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.3s;
        }
        .artwork-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 72px;
        }

        /* Info canción */
        .song-info {
          width: 100%;
          text-align: center;
          margin-top: 28px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.25s forwards;
        }
        .song-title {
          font-size: 26px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.5px;
          color: #fff;
          margin-bottom: 6px;
        }
        .song-artist {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        /* Separador con onda */
        .wave-sep {
          display: flex;
          align-items: center;
          gap: 2px;
          margin: 24px 0;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.3s forwards;
        }
        .wave-bar {
          width: 3px;
          background: rgba(139,92,246,0.7);
          border-radius: 2px;
          animation: wavePulse 1.2s ease-in-out infinite alternate;
        }

        /* Botones */
        .btn-primary {
          width: 100%;
          padding: 16px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
          color: white;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 8px 32px rgba(139,92,246,0.4);
          opacity: 0;
          animation: fadeUp 0.6s ease 0.35s forwards;
        }
        .btn-primary:active { transform: scale(0.97); }
        .btn-primary:hover  { box-shadow: 0 12px 40px rgba(139,92,246,0.55); }

        .btn-download {
          width: 100%;
          padding: 15px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.15);
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: block;
          text-align: center;
          margin-top: 12px;
          transition: all 0.2s;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.45s forwards;
          backdrop-filter: blur(10px);
        }
        .btn-download:hover {
          border-color: rgba(255,255,255,0.35);
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .badge {
          margin-top: 32px;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.5s forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes wavePulse {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>

      <div className="page">
        <div className="bg-blur" />

        <div className="content">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">
              <div className="logo-bars">
                {[12,18,14,20,10,16,8,18,14].map((h,i) => (
                  <div key={i} className="logo-bar" style={{
                    height: `${h}px`,
                    animationDelay: `${i * 0.1}s`
                  }}/>
                ))}
              </div>
            </div>
            <span className="logo-name">SoundDrift</span>
          </div>

          {/* Portada */}
          <div className="artwork-wrap">
            <img
              src={ogImageUrl}
              alt={title || 'SoundDrift'}
              className="artwork-img"
              onLoad={() => setImgLoaded(true)}
              style={{ opacity: imgLoaded ? 1 : 0 }}
            />
            {!imgLoaded && (
              <div className="artwork-placeholder">🎵</div>
            )}
          </div>

          {/* Título y artista */}
          <div className="song-info">
            <div className="song-title">{title || 'SoundDrift'}</div>
            {artist && <div className="song-artist">{artist}</div>}
          </div>

          {/* Onda decorativa */}
          <div className="wave-sep">
            {[12,20,16,28,18,32,14,26,20,24,16,30,12,22,18,28,14,24,10,20].map((h,i) => (
              <div key={i} className="wave-bar" style={{
                height: `${h}px`,
                animationDelay: `${(i * 0.08) % 0.8}s`,
              }}/>
            ))}
          </div>

          {/* Botón abrir app */}
          <button className="btn-primary" onClick={openApp}>
            Abrir en SoundDrift
          </button>

          {/* Botón descargar */}
          <a
            className="btn-download"
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar SoundDrift
          </a>

          <div className="badge">Escucha música sin límites</div>
        </div>
      </div>
    </>
  );
}
