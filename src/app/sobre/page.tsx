import React from 'react';

import About from '@/components/About';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
import Ebooks from '@/components/Ebooks';
import Contact from '@/components/Contact';

const PageAbout = () => {
  return (
    <main className={`bg-mood-light pt-page duration-1000`}>
      <About />
      <Services />
      <ContactForm
        title="Solicite um orçamento"
        subtitile="Espaços únicos para sonhos únicos"
        className="w-full items-center"
        classHeader="sm:gap-3"
        classForm="items-end"
        classInputContainer="sm:grid grid-cols-2"
        classInput="bg-mood-quaternary placeholder:text-mood-light"
      />
      <Ebooks />
      <Contact />
    </main>
  )
}

export default PageAbout;