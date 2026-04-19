import "./globals.css";
import { Navbar } from "@/components/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="mx-auto max-w-6xl p-6">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
