'use client'

import React from 'react'
import { setCookieContactFormData, getCookieContactFormData, clearCookieContactFormData } from '@/lib/next-headers'

interface PropsContactDataContext {
  contactFormData: ContactFormData | null
  setContactFormData: (data: ContactFormData | null) => void
}

const defaultContext: PropsContactDataContext = {
  contactFormData: null,
  setContactFormData: () => { },
}

export const ContactDataContext = React.createContext<PropsContactDataContext>(defaultContext)

const ContactDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [contactFormData, setContactFormDataState] = React.useState<ContactFormData | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const savedData = await getCookieContactFormData()
      setContactFormDataState(savedData)
    }
    fetchData()
  }, [])

  const updateContactFormData = async (data: ContactFormData | null) => {
    setContactFormDataState(data)
    if (data) {
      await setCookieContactFormData(data)
    } else {
      await clearCookieContactFormData()
    }
  }

  return (
    <ContactDataContext.Provider value={{ contactFormData, setContactFormData: updateContactFormData }}>
      {children}
    </ContactDataContext.Provider>
  )
}

export default ContactDataProvider
