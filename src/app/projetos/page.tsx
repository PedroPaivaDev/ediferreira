'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { getData } from '@/services/firebase';
import Project from '@/components/Project';

const Projects = () => {
  const projectId = useSearchParams().get('projeto');
  const [projectsDB, setProjectsDB] = React.useState<ProjectsDB|null>(null);

  React.useEffect(() => {
    getData<ProjectsDB|null>('content/projects', setProjectsDB);
  },[]);

  return (
    <main className='bg-mood-primary pt-20'>
      {projectsDB && projectId &&
        <Project project={projectsDB[projectId]}/>
      }
    </main>
  )
}

export default Projects;