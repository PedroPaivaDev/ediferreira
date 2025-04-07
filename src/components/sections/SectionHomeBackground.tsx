import React from 'react'

import { getContentDB } from '@/services/firebase';
import objectBgImage from '@/helpers/objectBgImage';

import ContactForm from '../ContactForm'

const SectionHomeBackground = () => {
  return (
    <>
      {getContentDB().then(contentDB => {
        if (!contentDB) return <></>;
        return (
          <section id="home" style={objectBgImage(contentDB.home.bgPhoto)} className="
              flex shrink-0 justify-center items-center p-5
              relative h-screen
            ">
            <div className="flex justify-end w-full max-w-[1650px]">
              <ContactForm
                greeting={true}
                title="Solicite um orçamento"
                subtitile="Espaços únicos para sonhos únicos"
                className="hidden lg:flex bg-opacity-80"
                classHeader="sm:flex-col sm:gap-0"
                classForm="items-start"
              />
            </div>
            {/* <video id="videoEdi"
                autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto"
                style={objectBgImage(contentDB.home.bgPhoto)}
                className='w-full h-full object-cover absolute top-0 -z-10'
              >
                <source src={contentDB.home.bgVideo} type="video/mp4"/>
              </video> */}
          </section>
        )
      })}
    </>
  )
}

export default SectionHomeBackground