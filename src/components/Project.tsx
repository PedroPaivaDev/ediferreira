import React from 'react';

import ProjectModal from './ProjectModal';

interface PropsProject {
  project: ProjectDB;
}

const Project = ({project}:PropsProject) => {
  const [modalImage, setModalImage] = React.useState<string|null>(null);

  return (
    <>
      {modalImage && <ProjectModal projectImages={project.images} modalImage={modalImage} setModalImage={setModalImage}/>}
      <section>
        <h1 className='text-mood-primary'>
          {project.name}
        </h1>
        <p className='text-mood-primary'>{project.description}</p>
      </section>
      <section className='flex justify-center items-center flex-wrap gap-20 flex-col sm:flex-row'>
        {project.images.map(imageUrl =>
          <div key={imageUrl} className='
            w-auto h-auto shadow-lg cursor-pointer
            duration-300 hover:ring ring-mood-quaternary rounded-md
          '>
            <img
              src={imageUrl}
              className='h-full max-h-almostScreen object-contain rounded-md'
              onClick={() => setModalImage(imageUrl)}
            />
          </div>
        )}
      </section>
    </>
  )
}

export default Project;