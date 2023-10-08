import objectBgImage from '@/helpers/objectBgImage';
import React from 'react';
import convertBytes from '@/helpers/convertBytes';

interface PropsInputPhotoFile {
  projectId: string;
  photosObjectFiles: FileObjectLocal[];
  mainProjectPhoto?: FileObjectLocal | undefined;
  setPhotosObjectFiles: React.Dispatch<React.SetStateAction<FileObjectLocal[]>>;
  setMainProjectPhoto?: React.Dispatch<React.SetStateAction<FileObjectLocal | undefined>>;
}

const InputPhotoFile = ({projectId, photosObjectFiles, mainProjectPhoto, setPhotosObjectFiles, setMainProjectPhoto}:PropsInputPhotoFile) => {

  function handleFilesSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;
    if (!files || !files[0]) {
      return;
    }
    const arrayPhotoObjects:FileObjectLocal[] = [];
    for(let i=0; i < files.length; i++) {
      arrayPhotoObjects.push({
        file: files[i],
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
        size: files[i].size
      })
    }
    setPhotosObjectFiles((current) => [
      ...current,
      ...arrayPhotoObjects
    ]);
  }

  function handleSelectMainPhoto(photo:FileObjectLocal) {
    setMainProjectPhoto && setMainProjectPhoto(photo);
  }

  function handleRemovePhoto(photoObject:FileObjectLocal) {
    setPhotosObjectFiles(photosObjectFiles.filter(photo => photo.url!==photoObject.url));
  }

  return (
    <>
      <input
        type="file"
        multiple
        name={`projects/${projectId}&images`}
        id="newPhotosInput"
        accept="image/*"
        onChange={handleFilesSelect}
        className="text-xs overflow-hidden mt-5"
      />
      <div className='w-full flex flex-col sm:flex-row flex-wrap justify-center items-center gap-5'>
        {photosObjectFiles && photosObjectFiles.map(photo =>
          <div key={photo.name} style={objectBgImage(photo.url)}
            className={`
              h-60 w-60 text-mood-light flex flex-col justify-end items-center p-5
              relative group hover:shadow-blackShadowInsetBottom duration-300
              ${mainProjectPhoto?.url.includes(photo.url) ? 'shadow-blackShadowInsetBottom' : ''}
            `}
          >
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
              className="absolute top-5 w-5 fill-mood-light hover:fill-status-error cursor-pointer duration-300"
              onClick={() => handleRemovePhoto(photo)}
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
            <p>{photo.name}</p>
            <small>{convertBytes(photo.size)}</small>
            {setMainProjectPhoto && <>
              {mainProjectPhoto?.url.includes(photo.url) ?
                <p className='text-mood-tertiary cursor-pointer'>
                  Utilizada
                </p> :
                <p className='text-mood-tertiary cursor-pointer opacity-0 group-hover:opacity-100' onClick={() => handleSelectMainPhoto(photo)}>
                  usar esta
                </p>
              }
            </>}
          </div>
        )}
      </div>
    </>
  )
}

export default InputPhotoFile;