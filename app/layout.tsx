import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CANCELLLS | SYSTEM OVERRIDE",
  description: "Senior Creative Developer & UI Architect Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        geistMono.variable,
        "bg-[#050505] text-white antialiased selection:bg-[#00FF41] selection:text-black font-mono cursor-crosshair"
      )}>
        <svg style={{ display: 'none' }}>
          <filter id="glitch-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 1" />
              <feFuncG type="discrete" tableValues="0 1" />
              <feFuncB type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
        </svg>
        <InteractiveBackground />
        <div className="crt-overlay" aria-hidden="true" />
        <div className="noise opacity-10 mix-blend-overlay" aria-hidden="true" />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
