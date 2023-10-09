'use client'
import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from "next/link";

import { getContentDB } from "@/services/firebase";
import objectBgImage from "@/helpers/objectBgImage";
// import objectBgImage from "@/helpers/objectBgImage";

import Loader from "@/components/Loader";
import Projects from "@/components/Projects";
import InstaPosts from "@/components/InstaPosts";
import Contact from "@/components/Contact";

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetch("https://db-ediferreira-default-rtdb.firebaseio.com/content.json");
  const contentDB = await data.json();
  return {
    props: {
      contentDB
    }
  }
  // try {
  //   const contentDB = await getContentDB();
  //   return {
  //     props: {
  //       contentDB,
  //     },
  //   };
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   return {
  //     props: {
  //       contentDB: null,
  //     },
  //   };
  // }
};

export default function Home({contentDB}:InferGetStaticPropsType<typeof getStaticProps>) {
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
          </section>
        </>}
        <InstaPosts />
        <Contact />
      </main>
    </>
  )
}
