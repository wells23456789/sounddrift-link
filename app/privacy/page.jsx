export const metadata = {
  title: 'Política de Privacidad — SoundDrift',
  description: 'Política de privacidad de la aplicación SoundDrift.',
};

const SECTIONS = [
  {
    title: 'Recopilación y uso de la información',
    content: `La aplicación recopila información cuando usted la descarga y la utiliza. Esta información puede incluir:`,
    list: [
      'La dirección de protocolo de Internet de su dispositivo',
      'Las páginas de la aplicación que usted visita, la hora y la fecha de su visita, el tiempo que pasa en esas páginas',
      'El tiempo dedicado a la aplicación',
      'El sistema operativo móvil que utiliza',
    ],
  },
  {
    title: 'Cookies y tecnologías de seguimiento',
    content: `La aplicación o sus SDK de terceros pueden usar cookies, píxeles y tecnologías similares para brindar soporte a la funcionalidad, el análisis o la prestación de servicios. Cuando lo exija la ley aplicable, el proveedor de servicios obtendrá el consentimiento antes de usar tecnologías de seguimiento no esenciales.`,
  },
  {
    title: 'Sus derechos',
    content: `Usted puede solicitar el acceso, la corrección o la eliminación de sus datos personales en poder del Proveedor de Servicios. Para ejercer estos derechos o para revocar su consentimiento cuando el tratamiento de datos se base en él, póngase en contacto con el Proveedor de Servicios en jt0346969@gmail.com.`,
  },
  {
    title: 'Sus derechos de privacidad en California (CCPA/CPRA)',
    content: `Si reside en California, tiene derecho a saber qué información personal se recopila, derecho a eliminarla, derecho a oponerse a la venta o compartición de su información personal y derecho a no ser discriminado por ejercer estos derechos. Para ejercer sus derechos conforme a la CCPA/CPRA, comuníquese con el proveedor de servicios a través de jt0346969@gmail.com.

El proveedor de servicios podrá utilizar la información que usted proporcione para enviarle información importante, avisos obligatorios y, cuando la ley lo permita, comunicaciones de marketing.`,
  },
  {
    title: 'Acceso de terceros',
    content: `Solo se transmiten periódicamente datos agregados y anonimizados a servicios externos para ayudar al Proveedor de Servicios a mejorar la Aplicación y su servicio. El Proveedor de Servicios podrá compartir su información con terceros según se describe en esta declaración de privacidad.

La aplicación utiliza servicios de terceros que cuentan con su propia política de privacidad sobre el tratamiento de datos:`,
    links: [
      { label: 'AppLovin', href: 'https://www.applovin.com/privacy/' },
    ],
    after: `El Proveedor de Servicios podrá divulgar la información:`,
    afterList: [
      'Según lo exija la ley, como para cumplir con una citación judicial o proceso legal similar',
      'Cuando crean de buena fe que la divulgación es necesaria para proteger sus derechos o la seguridad de otros',
      'Con sus proveedores de servicios de confianza que trabajan en su nombre y han aceptado cumplir con las reglas de esta política',
    ],
  },
  {
    title: 'Transferencias internacionales de datos',
    content: `El Proveedor de Servicios o sus proveedores de servicios externos podrán transferir datos personales a países fuera de su país de residencia. Cuando la legislación aplicable exija garantías, el Proveedor de Servicios utilizará los mecanismos adecuados, incluyendo Cláusulas Contractuales Tipo aprobadas por la Comisión Europea, decisiones de adecuación u otros mecanismos reconocidos legalmente.`,
  },
  {
    title: 'Derechos de exclusión voluntaria',
    content: `Puedes detener la recopilación de información desinstalando la aplicación. Al desinstalarla, la aplicación dejará de recopilar datos de tu dispositivo, pero no eliminará automáticamente la información ya transmitida al proveedor de servicios o a terceros.

Para solicitar la eliminación de sus datos personales, contáctenos en jt0346969@gmail.com.`,
  },
  {
    title: 'Política de retención de datos',
    content: `El proveedor de servicios conserva los datos personales según su necesidad:`,
    list: [
      'Datos proporcionados por el usuario: durante el tiempo que use la aplicación, más 12 meses adicionales',
      'Datos recopilados automáticamente: máximo 24 meses desde su recopilación',
      'Datos agregados y anonimizados: indefinidamente, ya que no le identifican',
      'Datos necesarios para cumplimiento legal: durante el tiempo que exija la ley aplicable',
    ],
  },
  {
    title: 'Niños',
    content: `La aplicación no está destinada a menores de 16 años. El Proveedor de Servicios no solicita datos de menores ni les ofrece la aplicación a sabiendas. Si descubrimos que un menor ha proporcionado información personal, la eliminaremos inmediatamente. Si usted es padre o tutor y sabe que su hijo proporcionó información, contáctenos en jt0346969@gmail.com.`,
  },
  {
    title: 'Seguridad',
    content: `El proveedor de servicios implementa medidas de seguridad físicas, electrónicas y de procedimiento para proteger la información que procesa y almacena.`,
  },
  {
    title: 'Notificación de violación de datos',
    content: `En caso de una violación de datos que afecte sus datos personales, el Proveedor de Servicios le notificará conforme a los requisitos legales aplicables, incluyendo información sobre la naturaleza de la violación y las medidas tomadas para solucionarla.`,
  },
  {
    title: 'Cambios a esta política',
    content: `El Proveedor de Servicios podrá actualizar esta Política de Privacidad periódicamente. Le notificará los cambios sustanciales publicando la Política actualizada con su fecha de entrada en vigor. Las versiones anteriores estarán disponibles previa solicitud contactando a jt0346969@gmail.com.`,
  },
  {
    title: 'Su consentimiento',
    content: `Cuando el tratamiento de datos se basa en el consentimiento, usted lo otorga al aceptar expresamente la función o acción correspondiente. Puede revocar su consentimiento en cualquier momento sin que ello afecte al tratamiento realizado antes de la revocación.`,
  },
  {
    title: 'Contáctanos',
    content: `Si tiene alguna pregunta sobre la privacidad al usar la aplicación, comuníquese con el Proveedor de Servicios en jt0346969@gmail.com.`,
  },
];

export default function PrivacyPage() {
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
          background: linear-gradient(150deg, #7B12C8 0%, #4A0080 18%, #1a0030 45%, #0a0010 100%);
          position: relative;
        }
        .page::before {
          content: '';
          position: absolute;
          width: 800px; height: 500px;
          top: -200px; left: -200px;
          background: radial-gradient(ellipse, rgba(180,60,255,0.3) 0%, transparent 65%);
          filter: blur(50px);
          pointer-events: none;
        }
        .nav {
          position: relative; z-index: 2;
          display: flex; align-items: center; gap: 10px;
          padding: 28px 48px 0;
        }
        .nav-icon {
          width: 38px; height: 38px; border-radius: 50%;
          object-fit: cover; display: block;
          outline: none; border: none; background: transparent;
        }
        .nav-name { font-size: 16px; font-weight: 800; }
        .nav-back {
          margin-left: auto;
          padding: 10px 22px;
          border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,0.35);
          background: transparent; color: #fff;
          font-family: 'Figtree', sans-serif;
          font-size: 13px; font-weight: 700;
          text-decoration: none;
          transition: all 0.15s;
        }
        .nav-back:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        .container {
          position: relative; z-index: 2;
          max-width: 760px;
          margin: 0 auto;
          padding: 56px 24px 96px;
        }
        .header {
          margin-bottom: 48px;
        }
        .eyebrow {
          font-size: 11px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: rgba(255,255,255,0.45);
          margin-bottom: 12px;
        }
        .header h1 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900; line-height: 1.05;
          letter-spacing: -1.5px;
          margin-bottom: 12px;
        }
        .effective-date {
          font-size: 13px; color: rgba(255,255,255,0.38);
        }
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 48px 0;
        }
        .intro {
          font-size: 15px; line-height: 1.7;
          color: rgba(255,255,255,0.7);
          margin-bottom: 48px;
        }
        .section {
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 17px; font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
        }
        .section-text {
          font-size: 14px; line-height: 1.75;
          color: rgba(255,255,255,0.6);
          white-space: pre-line;
        }
        .section-list {
          margin: 12px 0 0 0;
          padding-left: 0;
          list-style: none;
          display: flex; flex-direction: column; gap: 8px;
        }
        .section-list li {
          font-size: 14px; line-height: 1.6;
          color: rgba(255,255,255,0.6);
          padding-left: 20px;
          position: relative;
        }
        .section-list li::before {
          content: '·';
          position: absolute; left: 6px;
          color: rgba(180,60,255,0.8);
          font-size: 18px; line-height: 1.3;
        }
        .section-links {
          margin: 10px 0;
          display: flex; flex-wrap: wrap; gap: 10px;
        }
        .section-links a {
          font-size: 13px; font-weight: 700;
          color: #c084fc;
          text-decoration: none;
          border-bottom: 1px solid rgba(192,132,252,0.35);
          transition: color 0.15s, border-color 0.15s;
        }
        .section-links a:hover { color: #e9d5ff; border-color: rgba(233,213,255,0.5); }
        .after-text {
          font-size: 14px; line-height: 1.75;
          color: rgba(255,255,255,0.6);
          margin-top: 14px;
        }
        .footer {
          position: relative; z-index: 2;
          text-align: center;
          padding: 0 24px 48px;
          font-size: 12px; color: rgba(255,255,255,0.25);
        }

        @media (max-width: 640px) {
          .nav { padding: 22px 20px 0; }
          .container { padding: 40px 20px 72px; }
        }
      `}</style>

      <div className="page">
        <nav className="nav">
          <img src="/icon/icon.png" alt="SoundDrift" className="nav-icon" />
          <span className="nav-name">SoundDrift</span>
          <a className="nav-back" href="/">← Inicio</a>
        </nav>

        <div className="container">
          <div className="header">
            <div className="eyebrow">Legal</div>
            <h1>Política de Privacidad</h1>
            <p className="effective-date">Efectiva desde el 26 de junio de 2026</p>
          </div>

          <p className="intro">
            Esta política de privacidad se aplica a la aplicación <strong>SoundDrift</strong> para
            dispositivos móviles, junto con cualquier servicio relacionado operado por{' '}
            <strong>IrvinG</strong> (en adelante, el "Proveedor de Servicios").
          </p>

          <div className="divider" />

          {SECTIONS.map((s, i) => (
            <div className="section" key={i}>
              <div className="section-title">{s.title}</div>
              {s.content && <p className="section-text">{s.content}</p>}
              {s.list && (
                <ul className="section-list">
                  {s.list.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
              {s.links && (
                <div className="section-links">
                  {s.links.map((l, j) => (
                    <a key={j} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  ))}
                </div>
              )}
              {s.after && <p className="after-text">{s.after}</p>}
              {s.afterList && (
                <ul className="section-list">
                  {s.afterList.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="footer">
          © {new Date().getFullYear()} SoundDrift · jt0346969@gmail.com
        </div>
      </div>
    </>
  );
}
