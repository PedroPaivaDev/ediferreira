import React from 'react';

import objectBgImage from '@/helpers/objectBgImage';

interface PropsProject {
  project: ProjectDB;
}

const Project = ({project}:PropsProject) => {

  return (
    <>
      <section>
        <h1 className='text-mood-primary'>
          {project.name}
        </h1>
        <p className='text-mood-primary'>{project.description}</p>
      </section>
      <section>
        {project.images.map(imageUrl =>
          <div key={imageUrl}
            style={objectBgImage(imageUrl)}
            className='w-full h-almostScreen mb-10 rounded-md shadow-lg'
          />
        )}
      </section>
    </>
  )
}

export default Project;