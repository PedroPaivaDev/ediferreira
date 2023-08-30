import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex as Roboto, Poppins } from 'next/font/google';

import Header from '@/components/Header'

// const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });
const poppins = Poppins({weight:['400', '500'], subsets:['latin'], variable: '--font-poppins'});

export const metadata: Metadata = {
  title: 'Edi Ferreira',
  description: 'Designer de Interiores e Light Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-mood-dark bg-mood-primary`}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
