import React from 'react';
import Image from 'next/image';

import { getContentDB } from '@/services/firebase';

import P from './P';

const About = () => {
  return (
    <section id="Sobre" className="bg-mood-light gap-5 text-mood-primary text-justify">
      <h2>Sobre</h2>
      {getContentDB().then(contentDB => {
        if (!contentDB) return <></>;
        return (
          <>
            {contentDB && <div className="flex flex-col sm:flex-row items-center gap-5 max-w-[900px]">
              <Image
                src={contentDB.home.photoEdi} alt="Foto Designer Edi"
                width={240} height={240}
                className="rounded-full col-span-3 object-cover h-60 shadow-lg"
              />
              <div className="flex flex-col flex-1 gap-5">
                <P>{contentDB.about.text}</P>
              </div>
            </div>}
          </>
        )
      })}
    </section>
  )
}

export default About