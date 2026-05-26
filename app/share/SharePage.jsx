'use client';
import { useEffect, useState, use } from 'react';

const DOWNLOAD_URL = 'https://www.mediafire.com/file/y6athk86ct4daqa/app-release.apk/file';

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

  const ICON = "data:image/png;base64,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";

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
