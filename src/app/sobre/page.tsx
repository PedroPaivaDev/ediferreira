'use client'
import React from 'react';

import Sobre from '@/components/Sobre';
import Services from '@/components/Services';
import InstaPosts from '@/components/InstaPosts';
import Contact from '@/components/Contact';

const PageSobre = () => {
  
  return (
    <main className='bg-mood-light pt-16'>
      <Sobre />
      <Services />
      <InstaPosts />
      <Contact />
    </main>
  )
}

export default PageSobre;