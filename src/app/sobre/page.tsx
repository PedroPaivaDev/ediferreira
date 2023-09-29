'use client'
import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import Loader from '@/components/Loader';
import About from '@/components/About';
import Services from '@/components/Services';
import InstaPosts from '@/components/InstaPosts';
import Contact from '@/components/Contact';

const PageAbout = () => {
  const contentDB = React.useContext(ContentDBContext);
  
  return (
    <>
      {!contentDB && <Loader
        className="
          w-full h-full flex flex-col justify-center items-center
          fixed z-40 bg-mood-light
        "
      />}
      <main className={`bg-mood-light pt-28 ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
        <About />
        <Services />
        <InstaPosts />
        <Contact />
      </main>
    </>
  )
}

export default PageAbout;