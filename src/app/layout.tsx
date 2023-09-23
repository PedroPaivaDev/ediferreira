import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google';

import HeaderViewProvider from '@/contexts/HeaderViewContext';
import ContentDBProvider from '@/contexts/ContentDBContext';
import AuthGoogleProvider from '@/contexts/AuthGoogleContext';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const poppins = Poppins({weight:['400', '500'], subsets:['latin'], variable: '--font-poppins'});

export const metadata: Metadata = {
  title: 'Edi Ferreira',
  description: 'Designer de Interiores e Lighting Design',
}

export default function RootLayout({children}:{children:React.ReactNode}) {

  return (
    <html lang="en">
      <HeaderViewProvider>
        <body className={`${poppins.className} text-mood-primary bg-mood-light`}>
          <Header />
          <AuthGoogleProvider>
            <ContentDBProvider>
              {children}
            </ContentDBProvider>
          </AuthGoogleProvider>
          <Footer />
        </body>
      </HeaderViewProvider>
    </html>
  )
}
