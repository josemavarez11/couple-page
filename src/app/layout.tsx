import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export const viewport: Viewport = {
  themeColor: "#100e0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Nuestro Camino",
  description: "Un espacio para celebrar nuestro amor y compartir nuestra historia juntos.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nuestro Camino",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="h-full w-full bg-[#100e0c] text-white overflow-hidden fixed inset-0">
        {children}
      </body>
    </html>
  );
}
