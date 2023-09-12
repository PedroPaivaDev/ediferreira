'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import Services from '@/components/Services';
import Projects from '@/components/Projects';
import InstaPosts from '@/components/InstaPosts';
import Contact from '@/components/Contact';

import ProjectArrows from '@/components/ProjectArrows';
import ProjectModal from '@/components/ProjectModal';
import Project from '@/components/Project';

const PageProjects = () => {
  const projectId = useSearchParams().get('projeto');
  const contentDB = React.useContext(ContentDBContext);
  const [modalImage, setModalImage] = React.useState<string|null>(null);

  return (
    <main className='bg-mood-light pt-16'>
      {contentDB && !projectId && <>
        <Services />
        <Projects />
        <InstaPosts />
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