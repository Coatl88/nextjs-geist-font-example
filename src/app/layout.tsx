import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stereoscopic Vision - PCB Cable Height Detection",
  description: "Industrial application for detecting cable height on PCBs using stereoscopic vision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
