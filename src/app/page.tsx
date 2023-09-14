'use client'
import React from "react";
import Link from "next/link";

import { ContentDBContext } from "@/contexts/ContentDBContext";

import Loader from "@/components/Loader";
import Projects from "@/components/Projects";
import InstaPosts from "@/components/InstaPosts";
import Contact from "@/components/Contact";
import objectBgImage from "@/helpers/objectBgImage";

export default function Home() {
  const contentDB = React.useContext(ContentDBContext);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  React.useEffect(() => {
    const videoElement = document.getElementById('videoEdi');
    const handleVideoLoaded = () => {
      setVideoLoaded(true);
    };
    if(videoElement) {
      videoElement.addEventListener('canplay', handleVideoLoaded);  

      return () => {
        videoElement.removeEventListener('canplay', handleVideoLoaded);
      }
    }
  }, [contentDB]);

  return (
    <>
      {!videoLoaded && <Loader
        className="
          w-full h-full flex flex-col justify-center items-center
          fixed z-40 bg-mood-light
        "
      />}
      <main className={`${videoLoaded ? 'opacity-100' : 'opacity-0'} duration-1000`}>
        {contentDB && <>
          <section id="home" className="
            flex shrink-0 flex-col justify-end items-center gap-1
            p-0 relative h-screen
          ">
            <video id="videoEdi"
              autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto"
              style={objectBgImage(contentDB.home.bgPhoto)}
              className='w-full h-full object-cover absolute top-0 -z-10'
            >
              <source src={contentDB.home.bgVideo} type="video/mp4"/>
            </video>
            <h1 className="text-mood-light">Edi Ferreira</h1>
            <h3 className="text-mood-light mb-24">Designer de Interiores</h3>
          </section>
          <section id="Sobre" className="bg-mood-secondary text-mood-light">
            <p className="mt-4">{contentDB.home.callAbout}</p>
            <Link href='/sobre' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
          </section>
          <Projects />
          <section className='bg-mood-secondary text-mood-light'>
            <p className="mt-4">{contentDB.home.callProjects}</p>
            <Link href='/projetos' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
          </section>
        </>}
        <InstaPosts />
        <Contact />
      </main>
    </>
  )
}
