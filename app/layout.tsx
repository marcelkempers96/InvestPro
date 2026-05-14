import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { QueryProvider } from "@/components/query-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Catalyst — Things that move the market",
    template: "%s · Catalyst",
  },
  description:
    "A swing-trade catalyst tracker. Earnings, FDA decisions, regulatory rulings, contract awards — with options flow, sympathy plays, and the bull/bear case for each.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Catalyst",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Catalyst — Things that move the market",
    description:
      "Identify high-conviction swing-trade setups around catalysts. Earnings, FDA, regulatory, contracts — with the narrative, not just the date.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
