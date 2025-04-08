'use client';

import React from 'react';
import HeaderViewProvider from '@/contexts/HeaderViewContext';
import AuthGoogleProvider from '@/contexts/AuthGoogleContext';
import ContentDBProvider from '@/contexts/ContentDBContext';
import ContactDataProvider from '@/contexts/ContactDataContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeaderViewProvider>
      <AuthGoogleProvider>
        <ContentDBProvider>
          <ContactDataProvider>
            {children}
          </ContactDataProvider>
        </ContentDBProvider>
      </AuthGoogleProvider>
    </HeaderViewProvider>
  );
}
