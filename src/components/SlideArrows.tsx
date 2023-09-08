import React from 'react';

const slideArrows:{[key:string]:string} = {
  left: "M205.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L131.31,128ZM51.31,128l74.35-74.34a8,8,0,0,0-11.32-11.32l-80,80a8,8,0,0,0,0,11.32l80,80a8,8,0,0,0,11.32-11.32Z",
  right: "M141.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L124.69,128,50.34,53.66A8,8,0,0,1,61.66,42.34l80,80A8,8,0,0,1,141.66,133.66Zm80-11.32-80-80a8,8,0,0,0-11.32,11.32L204.69,128l-74.35,74.34a8,8,0,0,0,11.32,11.32l80-80A8,8,0,0,0,221.66,122.34Z"
}

interface PropsSlideArrows {
  currentIndexImage: number;
  handleArrowClick: (direction: string) => void;
  projectImages: string[];
  classname?: string;
}

const SlideArrows = ({currentIndexImage, handleArrowClick, projectImages, classname=''}:PropsSlideArrows) => {
  return (
    <div key={currentIndexImage}
      className={`${classname} lg:absolute w-almostScreen lg:w-full p-5 flex justify-between items-center`}
    >
      {Object.keys(slideArrows).map(arrowDirection =>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"
          key={arrowDirection} onClick={() => handleArrowClick(arrowDirection)}
          className={`
            cursor-pointer fill-mood-light hover:fill-mood-tertiary
            ${(arrowDirection==='left' && currentIndexImage===0) ?
              'invisible' : 'visible'
            }
            ${(arrowDirection==='right' && currentIndexImage>=(projectImages.length-1)) ?
              'invisible' : 'visible'
            }
          `}
        >
          <path d={slideArrows[arrowDirection]}/>
        </svg>
      )}
    </div>
  )
}

export default SlideArrows;