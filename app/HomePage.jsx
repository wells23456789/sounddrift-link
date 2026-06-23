'use client';
import { useEffect, useRef, useState } from 'react';

const DOWNLOAD_URL = 'https://www.mediafire.com/file/i5q6vlgqb672i7r/SoundDrift.apk/file';

const ICON = '/icon/icon.png';

const SCREENSHOTS = [
  { src: '/screenshots/1.png', alt: 'Crea playlists de tus artistas favoritos' },
  { src: '/screenshots/2.png', alt: 'Agrega tus videos favoritos' },
  { src: '/screenshots/3.png', alt: 'Busca y disfruta de tus artistas' },
  { src: '/screenshots/4.png', alt: 'Explora más opciones' },
  { src: '/screenshots/5.png', alt: 'Descubre tu música' },
];

const FEATURES = [
  { title: 'Descarga sin límites', text: 'Guarda tu música favorita directo en tu dispositivo, sin depender de internet.' },
  { title: 'Videos integrados', text: 'Agrega y organiza los videos musicales que más te gustan.' },
  { title: 'Modo Karaoke', text: 'Elimina las voces de cualquier canción y canta sin pistas.' },
  { title: 'Recorta y mezcla', text: 'Crea clips con fade-in/fade-out o mezcla dos canciones a tu gusto.' },
  { title: 'Sin anuncios molestos', text: 'Sin suscripciones obligatorias, sin interrupciones constantes.' },
];

export default function HomePage() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[i];
    if (slide) slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slides = Array.from(track.children);
      const trackRect = track.getBoundingClientRect();
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((slide, i) => {
        const r = slide.getBoundingClientRect();
        const dist = Math.abs((r.left + r.width / 2) - (trackRect.left + trackRect.width / 2));
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActive(closest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

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

        .nav {
          position: relative; z-index: 2;
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 48px 0;
          opacity: 0; animation: fadeIn 0.5s ease forwards;
        }
        .nav-left { display: flex; align-items: center; gap: 10px; }
        .nav-icon {
          width: 38px; height: 38px; border-radius: 50%;
          object-fit: cover; display: block;
          outline: none; border: none; background: transparent;
        }
        .nav-name { font-size: 16px; font-weight: 800; }
        .nav-btn {
          padding: 10px 22px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.45);
          background: transparent; color: #fff;
          font-family: 'Figtree', sans-serif;
          font-size: 13px; font-weight: 700;
          text-decoration: none;
          transition: all 0.15s;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        .hero {
          position: relative; z-index: 2;
          text-align: center;
          padding: 64px 24px 8px;
          opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards;
        }
        .hero-eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.45);
          margin-bottom: 16px;
        }
        .hero h1 {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900; line-height: 1.02;
          letter-spacing: -2px;
          margin-bottom: 18px;
        }
        .hero h1 span {
          background: linear-gradient(90deg, #fff, #e6c9ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero p {
          max-width: 560px; margin: 0 auto 32px;
          font-size: 16px; color: rgba(255,255,255,0.65);
          line-height: 1.6;
        }
        .btn-download {
          display: inline-block;
          padding: 16px 40px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.45);
          background: #fff; color: #4A0080;
          font-family: 'Figtree', sans-serif;
          font-size: 15px; font-weight: 800;
          cursor: pointer; white-space: nowrap;
          text-decoration: none;
          transition: all 0.15s;
        }
        .btn-download:hover { transform: translateY(-2px); }

        /* Carrusel */
        .carousel-section {
          position: relative; z-index: 2;
          padding: 56px 0 20px;
          opacity: 0; animation: fadeUp 0.6s ease 0.2s forwards;
        }
        .carousel-track {
          display: flex; gap: 22px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0 calc(50vw - 140px) 20px;
          scrollbar-width: none;
        }
        .carousel-track::-webkit-scrollbar { display: none; }
        .slide {
          flex: 0 0 auto;
          scroll-snap-align: center;
          width: 260px;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08);
          background: #0d0620;
          transition: transform 0.25s;
        }
        .slide img {
          width: 100%; display: block; height: 100%;
          object-fit: cover; aspect-ratio: 9/16;
        }
        .dots { display: flex; justify-content: center; gap: 8px; margin-top: 18px; }
        .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.25);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.2s;
        }
        .dot.active { background: #fff; width: 22px; border-radius: 4px; }

        /* Features */
        .features {
          position: relative; z-index: 2;
          max-width: 980px; margin: 0 auto;
          padding: 40px 24px 80px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          opacity: 0; animation: fadeUp 0.6s ease 0.3s forwards;
        }
        .feature-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 22px;
        }
        .feature-icon { font-size: 26px; margin-bottom: 12px; }
        .feature-title { font-size: 15px; font-weight: 800; margin-bottom: 6px; }
        .feature-text { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }

        .footer-cta {
          position: relative; z-index: 2;
          text-align: center;
          padding: 24px 24px 64px;
        }
        .footer-cta p { color: rgba(255,255,255,0.4); font-size: 13px; margin-top: 18px; }

        @media (max-width: 640px) {
          .nav { padding: 22px 20px 0; }
          .hero { padding: 44px 20px 8px; }
          .carousel-track { padding: 0 calc(50vw - 110px) 20px; }
          .slide { width: 220px; }
        }

        @keyframes fadeIn  { from{opacity:0}  to{opacity:1} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div className="page">
        <nav className="nav">
          <div className="nav-left">
            <img src={ICON} alt="SoundDrift" className="nav-icon" />
            <span className="nav-name">SoundDrift</span>
          </div>
          <a className="nav-btn" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            Descargar
          </a>
        </nav>

        <header className="hero">
          <div className="hero-eyebrow">Tu música, sin límites</div>
          <h1>Escucha y descarga<br/><span>toda tu música favorita</span></h1>
          <p>
            SoundDrift es la app para descargar música y videos directo en tu dispositivo.
            Crea playlists, usa el modo karaoke, recorta tus canciones y mucho más —
            sin suscripciones.
          </p>
          <a className="btn-download" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            Descargar SoundDrift
          </a>
        </header>

        <section className="carousel-section">
          <div className="carousel-track" ref={trackRef}>
            {SCREENSHOTS.map((s, i) => (
              <div className="slide" key={i} onClick={() => scrollToIndex(i)}>
                <img src={s.src} alt={s.alt} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="dots">
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === active ? 'active' : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="features">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-text">{f.text}</div>
            </div>
          ))}
        </section>

        <div className="footer-cta">
          <a className="btn-download" href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            Descargar SoundDrift gratis
          </a>
          <p>© {new Date().getFullYear()} SoundDrift · Hecho para amantes de la música</p>
        </div>
      </div>
    </>
  );
}
