'use client'
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';
import { ContentDBContext } from '@/contexts/ContentDBContext';

import Project from '@/components/Project';
import ProjectModal from '@/components/ProjectModal';
import SlideArrows from '@/components/SlideArrows';
import Contact from '@/components/Contact';

const Projects = () => {
  const {push} = useRouter()
  const projectId = useSearchParams().get('projeto');
  const {handleScroll} = React.useContext(HeaderViewContext);
  const contentDB = React.useContext(ContentDBContext);
  const [modalImage, setModalImage] = React.useState<string|null>(null);

  function handleSwitchProject(direction:string) {
    if(contentDB && projectId) {
      const previousProjectIndex = Object.keys(contentDB.projects).indexOf(projectId) - 1;
      const nextProjectIndex = Object.keys(contentDB.projects).indexOf(projectId) + 1;

      if(direction==='left') {
        push(`projetos?projeto=${Object.keys(contentDB.projects)[previousProjectIndex]}`);
      } else {
        push(`projetos?projeto=${Object.keys(contentDB.projects)[nextProjectIndex]}`);
      }
    } else return;
  }

  return (
    <main className='bg-mood-light pt-16' onScroll={(e) => handleScroll(e)}>
      {contentDB?.projects && projectId &&
        <>
          <div
            className='relative w-full flex justify-center items-center bg-mood-quaternary'
          >
            <h3 className='text-mood-light m-5'>outros projetos</h3>
            <SlideArrows
              currentIndexImage={Object.keys(contentDB.projects).indexOf(projectId)}
              projectImages={Object.keys(contentDB.projects)}
              handleArrowClick={handleSwitchProject}
              classname={'absolute top-0'}
            />
          </div>
          {modalImage && <ProjectModal
            projectImages={contentDB.projects[projectId].images}
            modalImage={modalImage} setModalImage={setModalImage}
          />}
          <Project project={contentDB.projects[projectId]} setModalImage={setModalImage}/>
          <div
            className='relative w-full flex justify-center items-center bg-mood-quaternary'
          >
            <h3 className='text-mood-light m-5'>outros projetos</h3>
            <SlideArrows
              currentIndexImage={Object.keys(contentDB.projects).indexOf(projectId)}
              projectImages={Object.keys(contentDB.projects)}
              handleArrowClick={handleSwitchProject}
              classname={'absolute top-0'}
            />
          </div>
          <Contact />
        </>
      }
    </main>
  )
}

export default Projects;