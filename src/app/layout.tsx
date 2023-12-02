'use client'
import './globals.css'
import { useEffect } from 'react';
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google';

import HeaderViewProvider from '@/contexts/HeaderViewContext';
import ContentDBProvider from '@/contexts/ContentDBContext';
import AuthGoogleProvider from '@/contexts/AuthGoogleContext';

import WhatsappButton from '@/components/WhatsappButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { initGoogleAnalytics, initGoogleTagManager } from '@/lib/analitics';

const poppins = Poppins({weight:['400', '500'], subsets:['latin'], variable: '--font-poppins'});

export const metadata: Metadata = {
  title: 'Edi Ferreira',
  description: 'Designer de Interiores e Lighting Design',
  robots: {
    follow: true,
    index: true
  }
}

export default function RootLayout({children}:{children:React.ReactNode}) {

  useEffect(() => {
    // Initialize Google Tag Manager and Google Analytics on component mount
    initGoogleTagManager();
    initGoogleAnalytics();
  }, []);
  return (
    <html lang="en">
      <HeaderViewProvider>
        <body className={`${poppins.className} text-mood-primary bg-mood-light`}>
          <Header />
          <AuthGoogleProvider>
            <ContentDBProvider>
              {children}
              <WhatsappButton />
            </ContentDBProvider>
          </AuthGoogleProvider>
          <Footer />
        </body>
      </HeaderViewProvider>
    </html>
  )
}
