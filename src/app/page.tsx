'use client'
import React from "react";
import Link from "next/link";

import { ContentDBContext } from "@/contexts/ContentDBContext";
import objectBgImage from "@/helpers/objectBgImage";
// import objectBgImage from "@/helpers/objectBgImage";

import Loader from "@/components/Loader";
import Projects from "@/components/Projects";
import InstaPosts from "@/components/InstaPosts";
import Contact from "@/components/Contact";

export default function Home() {
  const contentDB = React.useContext(ContentDBContext);
  // const [videoLoaded, setVideoLoaded] = React.useState(false);

  // React.useEffect(() => {
  //   const videoElement = document.getElementById('videoEdi');
  //   const handleVideoLoaded = () => {
  //     setVideoLoaded(true);
  //   };
  //   if(videoElement) {
  //     videoElement.addEventListener('canplay', handleVideoLoaded);  

  //     return () => {
  //       videoElement.removeEventListener('canplay', handleVideoLoaded);
  //     }
  //   }
  // }, [contentDB]);

  return (
    <>
      {!contentDB && <Loader
        className="
          w-full h-full flex flex-col justify-center items-center
          fixed z-40 bg-mood-light
        "
      />}
      <main className={`${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
        {contentDB && <>
          <section id="home" style={objectBgImage(contentDB.home.bgPhoto)} className="
            flex shrink-0 flex-col justify-end items-center gap-1
            p-0 relative h-screen
          ">
            {/* <video id="videoEdi"
              autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto"
              style={objectBgImage(contentDB.home.bgPhoto)}
              className='w-full h-full object-cover absolute top-0 -z-10'
            >
              <source src={contentDB.home.bgVideo} type="video/mp4"/>
            </video> */}
          </section>
          <section id="Sobre" className="bg-mood-secondary text-mood-light">
            <p className="mt-4">{contentDB.home.callAbout}</p>
            <Link href='/sobre' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
          </section>
          <Projects />
          <section className='bg-mood-secondary text-mood-light'>
            <p className="mt-4">{contentDB.home.callProjects}</p>
            <Link href='/projetos' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
            <a href={contentDB?.contacts.social['1whatsapp'].url}  target="_blank"
              className='group mt-5 px-5 py-2 rounded-full bg-mood-primary flex items-center gap-3'
            >
              <span className="text-mood-light group-hover:text-mood-tertiary duration-300">Entre em Contato</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                width="40" height="40" viewBox="0 0 256 256"
                className='fill-mood-light group-hover:fill-mood-tertiary duration-300'
              >
                <path d={contentDB?.contacts.social['1whatsapp'].icon}/>
              </svg>
            </a>
          </section>
        </>}
        <InstaPosts />
        <Contact />
      </main>
    </>
  )
}
