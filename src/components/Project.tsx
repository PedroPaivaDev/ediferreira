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
        <p className='text-mood-light'>{project.description}</p>
      </section>
      <section>
        {project.images.map(imageUrl =>
          <img key={imageUrl} src={imageUrl} className='mb-5 max-w-[900px]'/>
        )}
      </section>
    </>
  )
}

export default Project;