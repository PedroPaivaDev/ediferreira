import React from 'react';

interface PropsProjectModal {
  modalImage: string;
  setModalImage: React.Dispatch<React.SetStateAction<string | null>>
}

const ProjectModal = ({modalImage, setModalImage}:PropsProjectModal) => {
  
  function handleOutsideClick(event:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(event.target === event.currentTarget) setModalImage(null);
  }

  return (
    <div onClick={(e) => handleOutsideClick(e)}
      className='
        w-screen h-screen p-5 fixed top-0 bg-black bg-opacity-80
        flex justify-center items-center
      '
    >
      <div className='
        relative h-almostScreen overflow-x-auto
        flex justify-start items-center rounded-md
      '>
        <img key={modalImage}
          src={modalImage}
          className='max-w-none h-almostScreen'
        />
      </div>
    </div>
  )
}

export default ProjectModal;