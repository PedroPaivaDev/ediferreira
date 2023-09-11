'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import Project from '@/components/Project';
import ProjectModal from '@/components/ProjectModal';
import Contact from '@/components/Contact';
import Services from '@/components/Services';
import Slider from '@/components/Slider';
import ProjectArrows from '@/components/ProjectArrows';

const PageProjects = () => {
  const projectId = useSearchParams().get('projeto');
  const contentDB = React.useContext(ContentDBContext);
  const [modalImage, setModalImage] = React.useState<string|null>(null);

  return (
    <main className='bg-mood-light pt-16'>
      {contentDB && !projectId && <>
        <Services />
        <section>
          <h2>Projetos</h2>
          <Slider projects={contentDB?.projects}/>
        </section>
      </>}
      {contentDB?.projects && projectId &&
        <>
          <ProjectArrows projectId={projectId} />
          {modalImage && <ProjectModal
            projectImages={contentDB.projects[projectId].images}
            modalImage={modalImage} setModalImage={setModalImage}
          />}
          <Project project={contentDB.projects[projectId]} setModalImage={setModalImage}/>
          <ProjectArrows projectId={projectId} />
        </>
      }
      <Contact />
    </main>
  )
}

export default PageProjects;