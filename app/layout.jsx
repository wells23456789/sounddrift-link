export const metadata = {
  title: 'SoundDrift',
  description: 'Escucha música sin límites',
  other: {
    'facebook-domain-verification': '1cd1ymwozwmnbv9iwhus7bbhpqg84i',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
