import type { Metadata } from "next";
import { Mona_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { neue_montreal, pp_neue } from "@/fonts";
import TransitionProviders from "@/providers/TransitionProviders";
import Preloader from "@/components/molecul/preloader";
import { Analytics } from '@vercel/analytics/next'

const bebas = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: '400'
})

const mona = Mona_Sans({
  variable: '--font-mona',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Loreast",
  description: "Loreast is a tourism platform that provides information about tourist destinations in Banyuwangi, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${neue_montreal.variable} ${bebas.variable} ${mona.variable} ${pp_neue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-black selection:text-theme">
        <Analytics />
        <Preloader />
        <TransitionProviders>
          {children}
        </TransitionProviders>
      </body>
    </html>
  );
}
