import React from "react";

import FacebookScript from "@/lib/FacebookScript";
import { getContentDB } from "@/services/firebase";

import ContactForm from "@/components/ContactForm";
import Contact from "@/components/Contact";
import Ebooks from "@/components/Ebooks";
import SectionCallAbout from "@/components/sections/SectionCallAbout";
import SectionCallProjects from "@/components/sections/SectionsCallProjects";
import SectionHomeBackground from "@/components/sections/SectionHomeBackground";
import SectionProjects from "@/components/sections/SectionProjects";

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
        <SectionHomeBackground />
        <SectionCallAbout />
        {getContentDB().then(contentDB =>
          <>
            <SectionProjects contentDB={contentDB} />
            <Ebooks contentDB={contentDB} />
          </>
        )}
        <SectionCallProjects />
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