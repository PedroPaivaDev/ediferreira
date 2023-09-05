import React from 'react';

interface PropsProject {
  project: ProjectDB;
}

const Project = ({project}:PropsProject) => {

  return (
    <>
      <section>
        <h1 className='text-mood-light'>
          {project.name}
        </h1>
        <p className='text-mood-light'>{project.resume}</p>
      </section>
    </>
  )
}

export default Project;