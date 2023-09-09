'use client'
import React from 'react';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';

import Sobre from '@/components/Sobre';
import Contact from '@/components/Contact';
import Services from '@/components/Services';

const PageSobre = () => {
  const {handleScroll} = React.useContext(HeaderViewContext);
  
  return (
    <main className='bg-mood-light pt-16' onScroll={(e) => handleScroll(e)}>
      <Sobre />
      <Services />
      <Contact />
    </main>
  )
}

export default PageSobre;