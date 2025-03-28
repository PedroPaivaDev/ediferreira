'use client'
import React from "react";
import Link from "next/link";

// import { ContentDBContext } from "@/contexts/ContentDBContext";
import objectBgImage from "@/helpers/objectBgImage";
import { initGoogleAnalytics, initGoogleTagManager } from "@/lib/analitics";
import { initFacebookPixel } from "@/lib/FacebookPixel";
import FacebookScript from "@/lib/FacebookScript";
import { getContentDB } from "@/services/firebase";
// import objectBgImage from "@/helpers/objectBgImage";

// import Loader from "@/components/Loader";
import Projects from "@/components/Projects";
import ContactForm from "@/components/ContactForm";
import Contact from "@/components/Contact";
import Ebooks from "@/components/Ebooks";

export default function Home() {
  // const contentDB = React.useContext(ContentDBContext);
  // const [imageLoaded, setImageLoaded] = React.useState(false);

  // React.useEffect(() => {
  //   if (contentDB) {
  //     const image = new Image();
  //     image.src = contentDB.home.bgPhoto

  //     const handleImageLoaded = () => {
  //       setImageLoaded(true);
  //     };
  //     image.addEventListener('load', handleImageLoaded);

  //     return () => {
  //       image.removeEventListener('load', handleImageLoaded);
  //     };
  //   }
  // }, [contentDB]);

  React.useEffect(() => {
    // Initialize Google Tag Manager and Google Analytics on component mount
    initGoogleTagManager();
    initGoogleAnalytics();
    initFacebookPixel();
  }, []);


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
      <FacebookScript />
      {/* {!imageLoaded && <Loader
        className="
          w-full h-full flex flex-col justify-center items-center
          fixed z-40 bg-mood-light
        "
      />} */}
      <main /* className={`${imageLoaded ? 'opacity-100' : 'opacity-0'} duration-1000`} */>
        {getContentDB().then(contentDB => {
          if (!contentDB) return <></>;
          return (
            <>
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
              <section id="Sobre" className="bg-mood-secondary text-mood-light">
                <p className="mt-4">{contentDB.home.callAbout}</p>
                <Link href='/sobre' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
              </section>
              <Projects />
              <Ebooks />
              <section className='bg-mood-secondary text-mood-light'>
                <p className="mt-4">{contentDB.home.callProjects}</p>
                <Link href='/projetos' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
              </section>
            </>
          )
        })}
        <ContactForm
          title="Solicite um orçamento"
          subtitile="Espaços únicos para sonhos únicos"
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