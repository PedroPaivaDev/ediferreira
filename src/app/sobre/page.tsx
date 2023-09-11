'use client'
import React from 'react';

import Sobre from '@/components/Sobre';
import Contact from '@/components/Contact';
import Services from '@/components/Services';

const PageSobre = () => {
  
  return (
    <main className='bg-mood-light pt-16'>
      <Sobre />
      <Services />
      <Contact />
    </main>
  )
}

export default PageSobre;