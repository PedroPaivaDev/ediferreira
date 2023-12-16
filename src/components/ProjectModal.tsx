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

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalImage(null);
      } else if (event.key === 'ArrowRight') {
        if (currentIndexImage < projectImages.length - 1) {
          setModalImage(projectImages[currentIndexImage + 1]);
          setCurrentIndexImage(currentIndexImage + 1);
        }
      } else if (event.key === 'ArrowLeft') {
        if (currentIndexImage > 0) {
          setModalImage(projectImages[currentIndexImage - 1]);
          setCurrentIndexImage(currentIndexImage - 1);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndexImage, projectImages, setModalImage]);

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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"
          onClick={() => setModalImage(null)}
          className='
          fill-mood-primary hover:fill-mood-tertiary cursor-pointer
            fixed lg:absolute top-0 right-0 mr-10 mt-28 lg:m-5
          '
        >
          <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
        </svg>
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