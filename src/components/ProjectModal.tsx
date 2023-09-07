import React from 'react';

const arrows:{[key:string]:string} = {
  left: "M205.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L131.31,128ZM51.31,128l74.35-74.34a8,8,0,0,0-11.32-11.32l-80,80a8,8,0,0,0,0,11.32l80,80a8,8,0,0,0,11.32-11.32Z",
  right: "M141.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L124.69,128,50.34,53.66A8,8,0,0,1,61.66,42.34l80,80A8,8,0,0,1,141.66,133.66Zm80-11.32-80-80a8,8,0,0,0-11.32,11.32L204.69,128l-74.35,74.34a8,8,0,0,0,11.32,11.32l80-80A8,8,0,0,0,221.66,122.34Z"
}

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
        flex justify-center items-center
      '
    >
      <div className='
        relative h-almostScreen overflow-x-auto
        flex justify-center sm:justify-start items-center rounded-md
      '>
        <div key={currentIndexImage}
          className='fixed sm:absolute w-full p-10 sm:p-5 flex justify-between items-center'
        >
          {Object.keys(arrows).map(arrowDirection =>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"
              onClick={() => handleArrowClick(arrowDirection)}
              className={`
                cursor-pointer fill-mood-quintenary hover:fill-mood-quaternary
                ${(arrowDirection==='left' && currentIndexImage===0) ?
                  'invisible' : 'visible'
                }
                ${(arrowDirection==='right' && currentIndexImage>=(projectImages.length-1)) ?
                  'invisible' : 'visible'
                }
              `}
            >
              <path d={arrows[arrowDirection]}/>
            </svg>
          )}
        </div>
        <img key={modalImage}
          src={modalImage}
          className='max-w-none h-almostScreen'
        />
      </div>
    </div>
  )
}

export default ProjectModal;