'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';
import { ContentDBContext } from '@/contexts/ContentDBContext';

import Project from '@/components/Project';

const Projects = () => {
  const projectId = useSearchParams().get('projeto');
  const {handleScroll} = React.useContext(HeaderViewContext);
  const contentDB = React.useContext(ContentDBContext);

  return (
    <main className='bg-mood-light pt-20' onScroll={(e) => handleScroll(e)}>
      {contentDB?.projects && projectId &&
        <Project project={contentDB.projects[projectId]}/>
      }
    </main>
  )
}

export default Projects;