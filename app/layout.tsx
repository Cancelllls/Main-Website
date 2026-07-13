import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cancellls | Professional Portfolio",
  description: "Senior Creative Developer & UI Architect Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.variable,
        "bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-[#ededed] antialiased font-sans selection:bg-blue-500/30 transition-colors"
      )}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LoadingScreen>
            <AnimatedBackground />
            <Navbar />
            <main className="relative z-10 min-h-screen">
              {children}
            </main>
          </LoadingScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}
