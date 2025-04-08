import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google';

import HeaderViewProvider from '@/contexts/HeaderViewContext';
import AuthGoogleProvider from '@/contexts/AuthGoogleContext';
import ContentDBProvider from '@/contexts/ContentDBContext';
import ContactDataProvider from '@/contexts/ContactDataContext';

import WhatsappButton from '@/components/WhatsappButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const poppins = Poppins({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Edi Ferreira',
  description: 'Designer de Interiores e Lighting Design',
  robots: {
    follow: true,
    index: true
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <HeaderViewProvider>
        <body className={`${poppins.className} text-mood-primary bg-mood-light`}>
          <Header />
          <AuthGoogleProvider>
            <ContentDBProvider>
              <ContactDataProvider>
                {children}
                <WhatsappButton />
              </ContactDataProvider>
            </ContentDBProvider>
          </AuthGoogleProvider>
          <Footer />
        </body>
      </HeaderViewProvider>
    </html>
  )
}
