import type { Metadata } from "next";
import { Mona_Sans, Bebas_Neue, Open_Sans } from "next/font/google";
import "./globals.css";
import { neue_montreal, pp_neue, simple } from "@/fonts";
import TransitionProviders from "@/providers/TransitionProviders";
import Preloader from "@/components/molecul/preloader";
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from "@/components/(navbar)/navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const bebas = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: '400'
})

const open = Open_Sans({
  variable: '--font-open',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${neue_montreal.variable} ${bebas.variable} ${mona.variable} ${pp_neue.variable} ${open.variable} ${simple.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-black selection:text-theme">
        <Analytics />
        <Preloader />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TransitionProviders>
            <Navbar />
            {children}
          </TransitionProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
