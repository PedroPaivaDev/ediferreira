'use client'
import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

const WhatsappButton = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <a href={contentDB?.contacts.social['1whatsapp'].url}  target="_blank" className='fixed bottom-5 right-5 rounded-full p-2 z-10 bg-mood-primary'>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="40" height="40" viewBox="0 0 256 256"
        className='fill-mood-light hover:fill-mood-tertiary duration-300'
      >
        <path d={contentDB?.contacts.social['1whatsapp'].icon}/>
      </svg>
    </a>
  )
}

export default WhatsappButton;