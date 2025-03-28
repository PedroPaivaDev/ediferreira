'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { getContentDB } from '@/services/firebase';

import Services from '@/components/Services';
import Projects from '@/components/Projects';
import ContactForm from '@/components/ContactForm';
import Ebooks from '@/components/Ebooks';
import Contact from '@/components/Contact';

import ProjectArrows from '@/components/ProjectArrows';
import ProjectModal from '@/components/ProjectModal';
import Project from '@/components/Project';

const PageProjects = () => {
  const projectId = useSearchParams()?.get('projeto');
  const [modalImage, setModalImage] = React.useState<string | null>(null);

  return (
    <main className={`bg-mood-light pt-page duration-1000`}>
      {getContentDB().then(contentDB => {
        if (!contentDB) return <></>;
        return (
          <>
            {contentDB && !projectId && <>
              <Projects />
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
            </>}
            {contentDB?.projects && projectId &&
              <>
                <ProjectArrows projectId={projectId} />
                {modalImage && <ProjectModal
                  projectImages={contentDB.projects[projectId].images}
                  modalImage={modalImage} setModalImage={setModalImage}
                />}
                <Project project={contentDB.projects[projectId]} setModalImage={setModalImage} />
                <ProjectArrows projectId={projectId} />
              </>
            }
            <Ebooks />
            <Contact />
          </>
        )
      })}
    </main>
  )
}

export default PageProjects;