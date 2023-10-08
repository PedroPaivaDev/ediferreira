'use client'
import React from 'react';
import Image from 'next/image';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import { listAllFiles } from '@/services/firebase';
import handleFileSubmit from '@/helpers/handleFileSubmit';

import Button from '@/components/Button';
import AdminMediaPhotos from '@/components/AdminMediaPhotos';

const AdminMedias = () => {
  const contentDB = React.useContext(ContentDBContext);

  const [photosEdiStorageFiles, setPhotosEdiStorageFiles] = React.useState<FileObjectStorage[]>([]);
  const [photoEdiPreviewUrl, setPhotoEdiPreviewUrl] = React.useState<string | null>(null);
  const [photoEdiFile, setPhotoEdiFile] = React.useState<File | null>(null);

  const [bgPhotosStorageFiles, setBgPhotosStorageFiles] = React.useState<FileObjectStorage[]>([]);
  const [bgPhotoPreviewUrl, setBgPhotoPreviewUrl] = React.useState<string | null>(null);
  const [bgPhotoFile, setBgPotoFile] = React.useState<File | null>(null);

  function onFileSelected(
    event: React.ChangeEvent<HTMLInputElement>,
    setPhotoFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPhotoPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
  ) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    setPhotoFile(files[0]);
    setPhotoPreviewUrl(URL.createObjectURL(files[0]));
  }

  React.useEffect(() => {
    listAllFiles('photoEdi', 'photoEdi', setPhotosEdiStorageFiles);
    listAllFiles('bgPhoto', 'bgPhoto', setBgPhotosStorageFiles);
  },[]);


  return (
    <>
      <form className='w-full flex flex-col justify-start items-start gap-5 text-left' onSubmit={handleFileSubmit}>
        <h3 className='text-mood-tertiary'>Foto da Edi na Página &quot;Sobre&quot;</h3>
        <p>Faça upload de nova foto que o seu rosto esteja centralizado ou escolha uma das fotos abaixo para usar na sessão &quot;sobre&quot;:</p>
        <input
          onChange={(e) => onFileSelected(e, setPhotoEdiFile, setPhotoEdiPreviewUrl)}
          name="home&photoEdi"
          type="file"
          id="home&photoEdi"
          accept="image/*"
          className="text-xs overflow-hidden"
        />
        {photoEdiPreviewUrl && (<div className='flex'>
          <Image id="photoEdiPreview" src={photoEdiPreviewUrl} alt='Foto Nova da Edi'
            width={240} height={240} className='h-60 rounded-full object-cover' key={photoEdiPreviewUrl}
          />
          {photoEdiFile && <Button label='Fazer Upload'/>}
        </div>)}
        {contentDB && photosEdiStorageFiles &&
          <div className='flex justify-center items-center flex-wrap gap-5'>
            {photosEdiStorageFiles.map(photo =>
              <AdminMediaPhotos key={photo.name}
                photoUrlDB={contentDB.home.photoEdi}
                usePhotoOnPathDB='home'
                photo={photo} fileStorageFolderPath='photoEdi'
                className='rounded-full'
              />
            )}
          </div>
        }
      </form>
      <form className='w-full flex flex-col justify-start items-start gap-5 text-left' onSubmit={handleFileSubmit}>
        <h3 className='text-mood-tertiary'>Foto no início da Página &quot;Home&quot;</h3>
        <p>Faça upload de nova foto para a home ou escolha uma das fotos abaixo para usar como background:</p>
        <input
          onChange={(e) => onFileSelected(e, setBgPotoFile, setBgPhotoPreviewUrl)}
          name="home&bgPhoto"
          type="file"
          id="home&bgPhoto"
          accept="image/*"
          className="text-xs overflow-hidden"
        />
        {bgPhotoPreviewUrl && (<div className='flex'>
          <Image id="bgPhotoPreview" src={bgPhotoPreviewUrl} alt='Foto Nova da Edi'
            width={240} height={240} className='h-60 rounded-full object-cover' key={bgPhotoPreviewUrl}
          />
          {bgPhotoFile && <Button label='Fazer Upload'/>}
        </div>)}
        {contentDB && bgPhotosStorageFiles &&
          <div className='flex justify-center items-center flex-wrap gap-5'>
            {bgPhotosStorageFiles.map(photo =>
              <AdminMediaPhotos key={photo.name}
                photoUrlDB={contentDB.home.bgPhoto}
                usePhotoOnPathDB='home'
                photo={photo} fileStorageFolderPath='bgPhoto'
              />
            )}
          </div>
        }
      </form>
    </>
  )
}

export default AdminMedias;