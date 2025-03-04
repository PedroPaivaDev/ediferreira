'use server'

import { cookies } from 'next/headers'

export async function setCookieContactFormData(data: any) {
  cookies().set('contactFormData', JSON.stringify(data), {
    maxAge: 3600,
    path: '/',
    httpOnly: false,
  })
}

export async function getCookieContactFormData() {
  const cookieStore = cookies()
  const savedData = cookieStore.get('contactFormData')
  return savedData ? JSON.parse(savedData.value) : null
}

export async function clearCookieContactFormData() {
  cookies().delete('contactFormData')
}
