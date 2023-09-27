import React from 'react';

import objectBgImage from '@/helpers/objectBgImage';
import handleSelectedFile from '@/helpers/handleSelectedFile';
import handleDeleteFile from '@/helpers/handleDeleteFile';

interface PropsAdminMediaPhoto {
  photos: FileObjectStorage[];
  contentDB: ContentDB;
}

const AdminMediaPhotos = ({photos, contentDB}:PropsAdminMediaPhoto) => {
  return (
    <div className='flex justify-center items-center flex-wrap gap-5'>
      {photos.map(photo =>
        <div key={photo.name} style={objectBgImage(photo.url)}
          className={`
            rounded-full h-60 w-60 text-mood-light flex flex-col justify-end items-center p-5
            relative group hover:shadow-blackShadowInsetBottom cursor-pointer duration-300
            ${contentDB?.home[photo.folder]===photo.url ? 'shadow-blackShadowInsetBottom' : ''}
          `}
        >
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
            className="absolute top-5 w-5 fill-mood-light hover:fill-status-error cursor-pointer duration-300"
            onClick={() => handleDeleteFile(photo.folder, photo, contentDB)}
          >
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
          {contentDB?.home[photo.folder]===photo.url ?
            <p>
              Utilizada
            </p> :
            <p className='opacity-0 group-hover:opacity-100' onClick={() => handleSelectedFile('home', photo.folder, photo.url)}>
              usar esta
            </p>
          }
        </div>
      )}
    </div>
  )
}

export default AdminMediaPhotos;