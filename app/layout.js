import "./globals.css";

export const metadata = {
  title: "ENVIA2 | La Misión",
  description: "Plataforma oficial de ENVIA2 para Congreso Activa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
