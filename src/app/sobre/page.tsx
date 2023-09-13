'use client'
import React from 'react';

import About from '@/components/About';
import Services from '@/components/Services';
import InstaPosts from '@/components/InstaPosts';
import Contact from '@/components/Contact';

const PageAbout = () => {
  
  return (
    <main className='bg-mood-light pt-16'>
      <About />
      <Services />
      <InstaPosts />
      <Contact />
    </main>
  )
}

export default PageAbout;