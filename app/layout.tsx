import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // 1. Imported Next.js Script optimizer
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daleel Shahban | IT/OT Infastructure Engineer | London",
  description: "IT/OT Infrastructure Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* SOC TELEMETRY INGESTION AGENT */}
        <Script id="soc-telemetry-agent" strategy="afterInteractive">
          {`
            (function() {
              try {
                // Change this to your live worker link!
                const endpoint = "https://soc-backend.daleel-shahban.workers.dev/log";
                
                const currentPath = window.location.pathname;
                const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const deviceType = isMobile ? "MOBILE_BROWSER" : "DESKTOP_BROWSER";

                fetch(endpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ path: currentPath, device: deviceType }),
                  keepalive: true
                }).catch(() => {});
              } catch (e) {}
            })();
          `}
        </Script>
      </body>
    </html>
  );
}