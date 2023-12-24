'use client'
import React from 'react';

interface PropsContactDataContext {
    contactFormData: ContactFormData | null;
    setContactFormData: React.Dispatch<React.SetStateAction<ContactFormData | null>>;
}

const defaultContext: PropsContactDataContext = {
    contactFormData: null,
    setContactFormData: () => {}
}

export const ContactDataContext = React.createContext<PropsContactDataContext>(defaultContext);

const ContactDataProvider = ({children}:{children:React.ReactNode}) => {
  const [contactFormData, setContactFormData] = React.useState<ContactFormData|null>(null);

  return (
    <ContactDataContext.Provider value={{contactFormData, setContactFormData}}>
      {children}
    </ContactDataContext.Provider>
  )
}

export default ContactDataProvider;