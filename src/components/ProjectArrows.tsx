import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ContentDBContext } from "@/contexts/ContentDBContext";
import scrollToTop from '@/helpers/scrollToTop';

import SlideArrows from './SlideArrows';

const ProjectArrows = ({projectId}:{projectId:string}) => {
  const {push} = useRouter()
  const contentDB = React.useContext(ContentDBContext);

  function handleSwitchProject(direction:string) {
    if(contentDB && projectId) {
      const previousProjectIndex = Object.keys(contentDB.projects).indexOf(projectId) - 1;
      const nextProjectIndex = Object.keys(contentDB.projects).indexOf(projectId) + 1;

      if(direction==='left') {
        scrollToTop();
        push(`projetos?projeto=${Object.keys(contentDB.projects)[previousProjectIndex]}`);
      } else {
        scrollToTop();
        push(`projetos?projeto=${Object.keys(contentDB.projects)[nextProjectIndex]}`);
      }
    } else return;
  }

  return (
    <div
      className='relative w-full flex justify-center items-center bg-mood-quaternary'
    >
      <Link href='/projetos' className='text-mood-light m-5 z-10 hover:text-mood-secondary duration-300'>
        outros projetos
      </Link>
      {contentDB && <SlideArrows
        currentIndexImage={Object.keys(contentDB.projects).indexOf(projectId)}
        projectImages={Object.keys(contentDB.projects)}
        handleArrowClick={handleSwitchProject}
        classname={'absolute top-0'}
      />}
    </div>
  )
}

export default ProjectArrows;