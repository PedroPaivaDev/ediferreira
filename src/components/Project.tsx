import React from 'react';

interface PropsProject {
  project: ProjectDB;
  setModalImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Project = ({project, setModalImage}:PropsProject) => {

  return (
    <>
      <section>
        <h1 className='text-mood-primary'>
          {project.name}
        </h1>
        <h3>{project.subtitle}</h3>
        <p className='text-mood-primary mt-5'>{project.description}</p>
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