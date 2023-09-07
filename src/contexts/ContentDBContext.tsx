'use client'
import React from 'react';

import { getData } from '@/services/firebase';

export const ContentDBContext = React.createContext<ContentDB|null>(null);

const ContentDBProvider = ({children}:{children:React.ReactNode}) => {
  const [contentDB, setContentDB] = React.useState<ContentDB|null>(null);

  React.useEffect(() => {
    getData<ContentDB|null>('content', setContentDB);
  },[]);

  return (
    <ContentDBContext.Provider value={contentDB}>
      {children}
    </ContentDBContext.Provider>
  )
}

export default ContentDBProvider;