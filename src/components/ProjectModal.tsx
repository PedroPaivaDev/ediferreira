import React from 'react';

import SlideArrows from './SlideArrows';

interface PropsProjectModal {
  projectImages: string[];
  modalImage: string;
  setModalImage: React.Dispatch<React.SetStateAction<string | null>>
}

const ProjectModal = ({projectImages, modalImage, setModalImage}:PropsProjectModal) => {
  const [currentIndexImage, setCurrentIndexImage] = React.useState(projectImages.indexOf(modalImage));
  
  function handleOutsideClick(event:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if(event.target === event.currentTarget) setModalImage(null);
  }

  function handleArrowClick(direction:string) {
    if(direction==='left') {
      setModalImage(projectImages[currentIndexImage - 1]);
      setCurrentIndexImage(currentIndexImage - 1);
    } else {
      setModalImage(projectImages[currentIndexImage + 1]);
      setCurrentIndexImage(currentIndexImage + 1);
    }
  }

  return (
    <div onClick={(e) => handleOutsideClick(e)}
      className='
        w-full h-full p-5 fixed top-0 bg-black bg-opacity-80
        flex justify-center items-center z-30
      '
    >
      <div className='
        relative h-almostScreen overflow-x-auto
        flex justify-start items-center rounded-md
      '>
        <SlideArrows
          currentIndexImage={currentIndexImage}
          projectImages={projectImages}
          handleArrowClick={handleArrowClick}
          classname='fixed'
        />
        <img key={modalImage}
          src={modalImage}
          className='max-w-none h-almostScreen'
        />
      </div>
    </div>
  )
}

export default ProjectModal;