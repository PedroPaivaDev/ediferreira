'use client'
import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import Loader from '@/components/Loader';
import About from '@/components/About';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
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
      <main className={`bg-mood-light pt-[136px] ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
        <About />
        <Services />
        <ContactForm
          className="w-full items-center"
          classHeader="sm:gap-3"
          classForm="items-end"
          classInputContainer="sm:grid grid-cols-2"
          classInput="bg-mood-quaternary placeholder:text-mood-light"
        />
        <Contact />
      </main>
    </>
  )
}

export default PageAbout;