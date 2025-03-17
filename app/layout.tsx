import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'PG&E Dividend Calculator',
  description: 'How much PG&E stock do you need to own to pay your electricity bill via dividend income?',
  openGraph: {
    title: "PG&E Dividend Calculator",
    description: "How much PG&E stock do you need to own to pay your electricity bill via dividend income?",
    url: "https://pge-dividend.vercel.app/",
    siteName: "PG&E Dividend Calculator",
    images: [
      {
        url: "https://pge-dividend.vercel.app/pge.png",
        width: 1200,
        height: 630,
        alt: "PG&E sucks",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PG&E Dividend Calculator",
    description: "How much PG&E stock do you need to own to pay your electricity bill via dividend income?",
    images: ["https://pge-dividend.vercel.app/pge.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Other head elements */}
    </Head>
      <body>{children}</body>
    </html>
  )
}
