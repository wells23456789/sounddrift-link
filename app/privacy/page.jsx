export const metadata = {
  title: 'Política de Privacidad — SoundDrift',
  description:
    'Qué permisos pide SoundDrift, qué guarda en tu teléfono, qué sale de él y qué decides tú. Explicado en palabras sencillas.',
};

const SECTIONS = [
  {
    title: 'En pocas palabras',
    content: `SoundDrift no te pide crear una cuenta, ni tu nombre, correo, teléfono ni contactos.

Tu música, tus listas, tu historial y tus preferencias se quedan guardados en tu teléfono. Solo sale información del teléfono cuando usas una función que necesita internet, por ejemplo buscar una letra, reconocer una canción, ver el clima o enviar un archivo a otra persona. En cada sección te explicamos qué sale y para qué.

No vendemos tu información personal.`,
  },
  {
    title: 'Permisos que pide la app y para qué',
    content: `Un permiso es una autorización que tu teléfono te pide antes de dejar que una app use algo, como el micrófono o tus archivos. SoundDrift pide cada permiso solo cuando vas a usar la función que lo necesita, y puedes quitarlo en cualquier momento desde los ajustes de tu teléfono, en la sección de permisos de la app. Si no concedes un permiso, esa función no estará disponible, pero el resto de la app sigue funcionando.`,
    list: [
      'Internet y estado de la red: para buscar letras y portadas, reproducir y descargar contenido, mostrar anuncios y compartir.',
      'Música y videos: para encontrar y reproducir lo que tienes en tu teléfono.',
      'Acceso a todos los archivos y a modificar medios: para guardar lo que descargas o recibes en la carpeta SoundDrift, renombrar, mover o eliminar solo los archivos que tú indiques y corregir el título y el artista de tus canciones.',
      'Micrófono: para reconocer canciones, grabar audio, traducir lo que hablas y usar el asistente de voz. Solo se usa mientras tú activas la función.',
      'Cámara: para escanear códigos QR y códigos de SoundDrift. Las imágenes se analizan en tu teléfono y no se guardan ni se envían.',
      'Ubicación aproximada o precisa (opcional): para mostrar el clima y los conciertos cercanos.',
      'Notificaciones: para los controles de reproducción, el avance de descargas y envíos, y el aviso de archivos recibidos.',
      'Funcionar en segundo plano y mantener el teléfono despierto: para que la música, las descargas y los envíos no se detengan si bloqueas la pantalla o sales de la app. También se pide que el teléfono no limite el consumo de batería de SoundDrift. Mientras esto ocurre verás una notificación.',
      'WiFi y red cercana: para encontrar otros teléfonos con SoundDrift cuando compartes archivos.',
      'Bluetooth: para saber qué auricular o altavoz tienes conectado y mostrarlo en el reproductor.',
      'Mostrar sobre otras apps (opcional): para la ventana flotante del reconocimiento de canciones.',
      'Captura del audio del teléfono: para reconocer una canción que suena en otra app. Tu teléfono te muestra un aviso cada vez.',
      'Instalar apps: para abrir el instalador de tu teléfono cuando tocas un archivo de instalación (APK) recibido. La instalación siempre te pide confirmación.',
      'Ventana de video flotante: para seguir viendo un video en una ventana pequeña.',
      'Identificador de publicidad: lo usa el servicio de anuncios que muestra la app (ver la sección Anuncios).',
    ],
  },
  {
    title: 'Lo que se guarda en tu teléfono',
    content: `Esta información se queda en tu teléfono y no se envía a servidores de SoundDrift:`,
    list: [
      'Tu biblioteca de música y videos, los nombres y artistas que edites y las portadas ya descargadas.',
      'Tus favoritos, listas de reproducción y la cola de canciones.',
      'Tu historial de reproducción (qué escuchaste y cuándo, hasta 5000 registros) y, a partir de él, el resumen de Tu Semana Sonora.',
      'Tus búsquedas recientes, hasta dónde llevas cada video y la velocidad que elegiste.',
      'Tus ajustes de sonido, idioma y apariencia.',
      'Lo que descargas o recibes, en la carpeta SoundDrift.',
    ],
    after: `Puedes borrar tu historial desde la app. El resto se elimina si borras los datos de la app o la desinstalas. Los archivos que ya estén en tus carpetas pueden seguir ahí hasta que tú los borres.

La app desactiva las copias de seguridad automáticas, así que estos datos no se suben a la nube de tu teléfono por esa vía. Convertir videos a audio y otros procesos de edición de sonido se hacen dentro de tu teléfono, sin enviar tus archivos a ningún servidor.`,
  },
  {
    title: 'Lo que sale de tu teléfono y a quién',
    content: `Para que algunas funciones trabajen, la app consulta servicios externos de otras empresas. Siempre se envía solo lo necesario. Como en cualquier conexión a internet, esos servicios también pueden ver tu dirección IP y datos básicos de tu teléfono.`,
    list: [
      'Portadas, discografías y datos de canciones: el nombre del artista y de la canción.',
      'Letras: el artista y el título.',
      'Traducción: el texto de la letra o de lo que hablas, solo cuando pides traducirlo.',
      'Reconocer canciones: un fragmento de audio de unos 10 segundos, solo cuando tocas el botón de reconocer.',
      'Videos en línea: lo que buscas y el video que eliges reproducir o descargar. No se inicia sesión en ninguna cuenta.',
      'Clima: tu ubicación aproximada. Si no das permiso de ubicación, se estima tu ciudad a partir de tu conexión a internet.',
      'Conciertos: el nombre del artista y tu país.',
      'Películas, series y radio: lo que buscas o consultas para mostrarte resultados.',
      'Enlaces para compartir canciones: el título y el artista, que van dentro del enlace.',
    ],
    after: `Cada una de esas empresas tiene sus propias reglas de privacidad sobre cómo trata lo que recibe.`,
  },
  {
    title: 'Compartir archivos con otras personas',
    content: `Compartir envía los archivos directamente de un teléfono a otro. Los archivos no se suben a servidores de SoundDrift.

Para que tu teléfono aparezca en la lista de otros, la app anuncia un código aleatorio de instalación (no te identifica personalmente), el nombre que le pusiste a tu teléfono y su dirección en la red.

Para encontrar teléfonos que están en otra red, la app también avisa cada pocos segundos a un servidor de SoundDrift que ayuda a que los dispositivos se vean entre sí. A ese servidor le llegan el código aleatorio, el nombre del teléfono y su dirección en internet, y se usan solo en el instante en que se busca un dispositivo, para mostrarte a los demás y mostrarte a ti. SoundDrift no registra ni guarda esas direcciones. Para conocer la dirección, la app consulta un servicio externo sencillo. Si ese servidor no está disponible, Compartir sigue funcionando entre teléfonos de la misma red WiFi.

Antes de recibir, la otra persona ve el nombre, el tamaño y una miniatura del archivo, y cualquiera de los dos puede cancelar en cualquier momento. Lo que recibes se guarda en la carpeta SoundDrift de tu teléfono.`,
    after: `Importante: los archivos viajan sin un cifrado especial. Compártelos solo con personas que conozcas y, de preferencia, en redes de confianza, no en WiFi públicos.`,
  },
  {
    title: 'Micrófono, voz y audio del teléfono',
    list: [
      'Reconocer canciones: se graba un fragmento corto, ya sea con el micrófono o capturando el audio que suena en tu teléfono, se envía una vez para identificar la canción y se borra del teléfono al terminar.',
      'Traducción en vivo y asistente de voz: usan el reconocimiento de voz de tu teléfono. Según tu equipo, ese servicio puede procesar tu voz en internet. SoundDrift no guarda tu voz.',
      'Grabadora: tus grabaciones se guardan solo en tu teléfono.',
    ],
    after: `El micrófono y la captura de audio nunca se activan solos: siempre los activas tú, y tu teléfono muestra un indicador mientras están en uso.`,
  },
  {
    title: 'Cámara',
    content: `La cámara solo se abre para escanear códigos. Lo que ve la cámara se analiza al instante en tu teléfono y no se guarda ni se envía a ningún lado.`,
  },
  {
    title: 'Ubicación',
    content: `Es opcional. Se consulta cuando abres el clima o los conciertos, se envía al servicio del clima (y tu país al de conciertos) para darte resultados, y no se guarda en servidores de SoundDrift ni se usa para seguirte. Si no das el permiso, la app estima tu ciudad por tu conexión o te deja elegirla a mano.`,
  },
  {
    title: 'Anuncios',
    content: `La app muestra anuncios para poder ser gratuita. Esos anuncios los gestiona un servicio de publicidad externo, que puede recopilar el identificador de publicidad de tu teléfono, tu dirección IP, datos del equipo (modelo, sistema, idioma), cómo interactúas con los anuncios y datos de diagnóstico, y compartirlos con sus socios publicitarios.

Puedes borrar o reiniciar el identificador de publicidad, o desactivar los anuncios personalizados, desde los ajustes de anuncios de tu teléfono. Si la ley de tu país lo exige, la app te pedirá tu consentimiento antes de mostrar anuncios personalizados.

SoundDrift no vende tus datos personales.`,
  },
  {
    title: 'Segundo plano y notificaciones',
    list: [
      'Música: la reproducción sigue con la pantalla bloqueada y muestra sus controles en una notificación.',
      'Descargas y envíos: siguen aunque salgas de la app y muestran una notificación con el nombre, la imagen y el avance del archivo. Se quita sola al terminar.',
      'Avisos de estrenos: de forma periódica (cerca de cada 6 horas), aunque la app esté cerrada, revisa por internet si hay películas, series o episodios nuevos para avisarte con una notificación.',
      'Accesos directos: la app puede mostrar atajos de lo último que escuchaste al mantener presionado su icono. Se arman en tu teléfono.',
    ],
    after: `Puedes desactivar las notificaciones desde los ajustes de tu teléfono.`,
  },
  {
    title: 'Apps instaladas y archivos de instalación',
    content: `En Compartir puedes elegir apps instaladas para enviarlas a otra persona. Para mostrarlas, la app consulta la lista de apps de tu teléfono que tienen icono (su nombre e imagen). Esa lista se usa solo en pantalla y no se envía a servidores.

Si tocas un archivo de instalación (APK) que recibiste, tu teléfono te deja elegir con qué instalarlo y te pide confirmar. SoundDrift no puede instalar nada sin tu permiso. Instala solo archivos de personas y lugares en los que confíes, porque una app mala puede dañar tu teléfono.`,
  },
  {
    title: 'Lo que SoundDrift no hace',
    list: [
      'No te pide cuenta, contraseña, correo ni teléfono.',
      'No lee tus contactos ni tus mensajes.',
      'No vende tu información personal.',
      'No activa el micrófono ni la cámara por su cuenta.',
      'No instala apps sin que tú lo confirmes.',
      'No usa herramientas propias para rastrear lo que haces dentro de la app.',
    ],
  },
  {
    title: 'Cuándo podríamos divulgar información',
    content: `El Proveedor de Servicios podrá divulgar información:`,
    list: [
      'Según lo exija la ley, como para cumplir con una citación judicial o proceso legal similar.',
      'Cuando crea de buena fe que la divulgación es necesaria para proteger sus derechos o la seguridad de otros.',
      'Con proveedores de servicios de confianza que trabajan en su nombre y han aceptado cumplir con las reglas de esta política.',
    ],
  },
  {
    title: 'Tus derechos',
    content: `Como casi todo se guarda en tu teléfono, tú mismo puedes ver, corregir o borrar tus datos desde la app o borrando sus datos.

Si quieres pedir acceso, corrección o eliminación de datos que estén en manos del Proveedor de Servicios, o retirar un consentimiento que diste, escríbenos a jt0346969@gmail.com.`,
  },
  {
    title: 'Si vives en California (CCPA/CPRA)',
    content: `Tienes derecho a saber qué información personal se recopila, a pedir que se elimine, a oponerte a que se venda o comparta y a que no te traten distinto por ejercer estos derechos.

SoundDrift no vende información personal. Lo que el servicio de anuncios recopile puede considerarse “compartir” para publicidad, y puedes limitarlo desde los ajustes de anuncios de tu teléfono. Para ejercer tus derechos escribe a jt0346969@gmail.com.`,
  },
  {
    title: 'Datos en otros países',
    content: `Los servicios externos que usa la app pueden estar en otros países. Cuando la ley exige protecciones adicionales, cada empresa las aplica según los mecanismos legales reconocidos, incluyendo Cláusulas Contractuales Tipo, decisiones de adecuación u otros.`,
  },
  {
    title: 'Cuánto tiempo se conservan los datos',
    list: [
      'Lo que está en tu teléfono se queda hasta que lo borres, borres los datos de la app o la desinstales.',
      'El fragmento de audio del reconocimiento de canciones se usa una sola vez y se borra de tu teléfono.',
      'Las direcciones de red que se usan para encontrar dispositivos en Compartir no se guardan: solo se usan en el momento de la búsqueda.',
      'Lo que reciben las empresas externas se conserva según sus propias reglas.',
    ],
    after: `Desinstalar la app deja de recopilar datos de tu teléfono, pero no elimina lo que ya tengan las empresas externas. Para pedir que se elimine información que esté en manos del Proveedor de Servicios, escribe a jt0346969@gmail.com.`,
  },
  {
    title: 'Niños',
    content: `La app no está dirigida a menores de 16 años y no pide datos personales de menores a sabiendas. Si descubrimos que un menor proporcionó información personal, la eliminaremos. Si eres madre, padre o tutor y crees que un menor dio información, escríbenos a jt0346969@gmail.com.`,
  },
  {
    title: 'Seguridad',
    content: `La mayoría de las consultas a internet van protegidas, pero la app permite algunas conexiones sin cifrar (por ejemplo, para ciertos servicios y para la consulta sencilla de tu dirección en internet). Los archivos que envías con Compartir también viajan sin un cifrado especial.

Tus datos guardados en el teléfono están protegidos por la seguridad normal del sistema, no por un cifrado adicional de SoundDrift. Si alguien usa tu teléfono desbloqueado, podría verlos; por eso te recomendamos mantenerlo bloqueado. Ningún sistema es 100 % seguro.`,
  },
  {
    title: 'Si ocurre un problema de seguridad',
    content: `Si hubiera una filtración que afecte datos personales bajo responsabilidad del Proveedor de Servicios, te avisaremos como lo exige la ley, explicando qué pasó y qué se hizo para resolverlo.`,
  },
  {
    title: 'Cambios a esta política',
    content: `Podemos actualizar esta política, por ejemplo cuando la app agregue funciones nuevas. Los cambios importantes se publicarán aquí con su fecha de actualización. Las versiones anteriores estarán disponibles previa solicitud en jt0346969@gmail.com.`,
  },
  {
    title: 'Tu consentimiento',
    content: `Al dar un permiso o usar una función (por ejemplo, el micrófono o la ubicación) aceptas que se use para eso. Puedes retirar tu permiso cuando quieras desde los ajustes de tu teléfono; esto no afecta lo que ya se hizo antes.`,
  },
  {
    title: 'Contáctanos',
    content: `Si tienes dudas sobre tu privacidad al usar la app, escríbenos a jt0346969@gmail.com.`,
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
          white-space: pre-line;
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
            <p className="effective-date">Última actualización: 21 de octubre de 2026</p>
          </div>

          <p className="intro">
            Esta política de privacidad se aplica a la aplicación <strong>SoundDrift</strong> para
            dispositivos móviles, junto con cualquier servicio relacionado operado por{' '}
            <strong>IrvinG</strong> (en adelante, el &quot;Proveedor de Servicios&quot;). Aquí te
            explicamos, en palabras sencillas, qué permisos pide la app, qué guarda, qué sale de tu
            teléfono y qué puedes decidir tú.
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
