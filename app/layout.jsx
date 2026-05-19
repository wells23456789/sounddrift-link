export const metadata = {
  title: 'SoundDrift',
  description: 'Escucha música sin límites',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
