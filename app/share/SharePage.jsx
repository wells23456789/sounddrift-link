'use client';
import { useEffect, useState, use } from 'react';

const DOWNLOAD_URL = 'https://www.mediafire.com/file/i5q6vlgqb672i7r/SoundDrift.apk/file';

export default function SharePage({ searchParams }) {
  const params  = searchParams instanceof Promise ? use(searchParams) : searchParams;
  const title   = params?.title   || '';
  const artist  = params?.artist  || '';
  const artwork = params?.artwork || '';

  const [redirected,     setRedirected]     = useState(false);
  const [displayArtwork, setDisplayArtwork] = useState('');
  const [imgLoaded,      setImgLoaded]      = useState(false);
  const [related,        setRelated]        = useState([]);
  const [isMobile,       setIsMobile]       = useState(false);

  const ICON = '/icon/icon.png';
  
  function buildDeepLink() {
    const p = new URLSearchParams();
    if (title)   p.set('title',   title);
    if (artist)  p.set('artist',  artist);
    if (artwork) p.set('artwork', artwork);
    return 'sounddrift://share?' + p.toString();
  }
  function openApp() { window.location.href = buildDeepLink(); }

  useEffect(() => {
    if (artwork) setDisplayArtwork(artwork);
    if (!title && !artist) return;

    // Buscar canción principal + canciones similares por género
    const q = encodeURIComponent(`${artist} ${title}`.trim());
    fetch(`https://itunes.apple.com/search?term=${q}&entity=song&limit=3&media=music`)
      .then(r => r.json())
      .then(async data => {
        const results = data?.results ?? [];
        const main = results[0];
        if (main && !artwork) {
          setDisplayArtwork((main.artworkUrl100 || '').replace('100x100bb','600x600bb'));
        }

        // Buscar música similar por género usando el primaryGenreName del primer resultado
        const genre = main?.primaryGenreName;
        const searchTerm = genre
          ? encodeURIComponent(genre)
          : encodeURIComponent(artist || title);

        const relRes = await fetch(
          `https://itunes.apple.com/search?term=${searchTerm}&entity=song&limit=12&media=music`
        ).then(r => r.json()).catch(() => ({ results: [] }));

        // Filtrar: que no sea la misma canción, con portada, max 5
        const filtered = (relRes?.results ?? [])
          .filter(r => r.artworkUrl100 && r.trackName &&
            !(r.trackName === title && r.artistName === artist))
          .slice(0, 5);
        setRelated(filtered);
      })
      .catch(() => {});
  }, [title, artist, artwork]);

  useEffect(() => {
    // Detectar mobile por User-Agent — desktop no muestra el botón de descarga
    const ua = navigator.userAgent || '';
    const mobile = /android|iphone|ipad|ipod|mobile|tablet/i.test(ua);
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (title && !redirected) {
      setRedirected(true);
      setTimeout(openApp, 500);
    }
  }, [title]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;900&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html, body {
          min-height: 100vh;
          font-family: 'Figtree', sans-serif;
          background: #0a0010;
          color: #fff;
          overflow-x: hidden;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(150deg, #7B12C8 0%, #4A0080 28%, #1a0030 58%, #0a0010 100%);
          position: relative;
          overflow: hidden;
        }
        .page::before {
          content: '';
          position: absolute;
          width: 1000px; height: 700px;
          top: -250px; left: -250px;
          background: radial-gradient(ellipse, rgba(180,60,255,0.4) 0%, transparent 65%);
          filter: blur(50px);
          pointer-events: none;
        }

        /* Nav — sin borde en el icono */
        .nav {
          position: relative; z-index: 2;
          display: flex; align-items: center; gap: 10px;
          padding: 28px 48px 0;
          opacity: 0; animation: fadeIn 0.5s ease forwards;
        }
        .nav-icon {
          width: 38px; height: 38px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          /* Sin outline ni box-shadow ni border */
          outline: none;
          border: none;
          background: transparent;
        }
        .nav-name { font-size: 16px; font-weight: 800; }

        /* Hero */
        .hero {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: start;
          gap: 0;
          padding: 48px 48px 56px;
        }

        .hero-left {
          display: flex; flex-direction: column; gap: 0;
          padding-right: 56px;
          opacity: 0; animation: fadeUp 0.6s ease 0.15s forwards;
        }

        .label {
          font-size: 11px; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 12px;
        }

        /* TÍTULO = nombre de la canción (grande) */
        .song-title {
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -2px;
          color: #fff;
          margin-bottom: 10px;
        }

        /* ARTISTA debajo del título (pequeño) */
        .song-artist {
          font-size: clamp(14px, 1.6vw, 18px);
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          margin-bottom: 10px;
        }

        .song-meta {
          font-size: 13px;
          color: rgba(255,255,255,0.38);
          margin-bottom: 32px;
          line-height: 1.7;
        }

        /* Solo botón de descarga */
        .btn-download {
          display: inline-block;
          padding: 15px 36px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.45);
          background: transparent; color: #fff;
          font-family: 'Figtree', sans-serif;
          font-size: 15px; font-weight: 700;
          cursor: pointer; white-space: nowrap;
          text-decoration: none;
          transition: all 0.15s;
          margin-bottom: 44px;
          align-self: flex-start;
        }
        .btn-download:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }

        /* Música similar */
        .related-label {
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin-bottom: 14px;
        }
        .related-list {
          display: flex; flex-direction: column; gap: 8px;
        }
        .related-item {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 10px;
          border-radius: 10px;
          /* No clickeable — solo visual */
          cursor: default;
          user-select: none;
        }
        .related-thumb {
          width: 42px; height: 42px;
          border-radius: 6px; object-fit: cover;
          flex-shrink: 0;
          background: #1e1040;
        }
        .related-info { min-width: 0; }
        .related-title {
          font-size: 13px; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          color: #fff;
        }
        .related-artist {
          font-size: 12px; color: rgba(255,255,255,0.45);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* Derecha: portada */
        .hero-right {
          flex-shrink: 0;
          opacity: 0;
          animation: scaleIn 0.7s cubic-bezier(0.34,1.4,0.64,1) 0.25s forwards;
          padding-top: 8px;
        }
        .artwork-wrap {
          width: clamp(220px, 28vw, 400px);
          height: clamp(220px, 28vw, 400px);
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 48px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07);
          background: linear-gradient(135deg, #1e1040, #0d0620);
          display: flex; align-items: center; justify-content: center;
          font-size: 72px;
        }
        .artwork-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: opacity 0.4s;
        }

        /* Mobile */
        @media (max-width: 640px) {
          .nav { padding: 22px 20px 0; }
          .hero {
            grid-template-columns: 1fr;
            padding: 28px 20px 48px;
            gap: 28px;
          }
          .hero-left  { padding-right: 0; order: 2; }
          .hero-right { order: 1; justify-self: center; }
          .artwork-wrap {
            width: min(260px, 75vw);
            height: min(260px, 75vw);
          }
          .song-title { letter-spacing: -1px; }
          .btn-download { align-self: stretch; text-align: center; }
        }

        @keyframes fadeIn  { from{opacity:0}  to{opacity:1} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.86)} to{opacity:1;transform:scale(1)} }
      `}</style>

      <div className="page">
        <nav className="nav">
          <img src={ICON} alt="SoundDrift" className="nav-icon" />
          <span className="nav-name">SoundDrift</span>
        </nav>

        <div className="hero">
          <div className="hero-left">
            <div className="label">Canción compartida</div>

            {/* Título = nombre de la canción */}
            <h1 className="song-title">{title || 'SoundDrift'}</h1>

            {/* Artista debajo */}
            <p className="song-artist">
              {artist || 'Artista desconocido'}
              {artist && ' · descárgala con SoundDrift'}
            </p>

            <p className="song-meta">
              {isMobile
                ? <>Con SoundDrift puedes descargar esta canción y toda tu música<br/>directamente en tu dispositivo. Sin suscripciones, sin anuncios.</>
                : <>SoundDrift es una app móvil para descargar tu música favorita<br/>directamente en tu dispositivo. Sin suscripciones, sin anuncios.</>
              }
            </p>

            {/* Solo botón descargar */}
            <a className="btn-download" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
              Descargar SoundDrift
            </a>

            {/* Música similar */}
            {related.length > 0 && (
              <>
                <div className="related-label">También en SoundDrift</div>
                <div className="related-list">
                  {related.map((r, i) => (
                    <div key={i} className="related-item">
                      <img
                        src={(r.artworkUrl100 || '').replace('100x100bb','60x60bb')}
                        alt={r.trackName}
                        className="related-thumb"
                      />
                      <div className="related-info">
                        <div className="related-title">{r.trackName}</div>
                        <div className="related-artist">{r.artistName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Portada */}
          <div className="hero-right">
            <div className="artwork-wrap">
              {displayArtwork ? (
                <img
                  src={displayArtwork}
                  alt={title}
                  className="artwork-img"
                  onLoad={() => setImgLoaded(true)}
                  style={{ opacity: imgLoaded ? 1 : 0 }}
                />
              ) : '🎵'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
