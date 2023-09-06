'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { getData } from '@/services/firebase';
import { HeaderViewContext } from '@/contexts/HeaderViewContext';

import Project from '@/components/Project';

const Projects = () => {
  const projectId = useSearchParams().get('projeto');
  const {handleScroll} = React.useContext(HeaderViewContext);
  const [projectsDB, setProjectsDB] = React.useState<ProjectsDB|null>(null);

  React.useEffect(() => {
    getData<ProjectsDB|null>('content/projects', setProjectsDB);
  },[]);

  return (
    <main className='bg-mood-light pt-20' onScroll={(e) => handleScroll(e)}>
      {projectsDB && projectId &&
        <Project project={projectsDB[projectId]}/>
      }
    </main>
  )
}

export default Projects;