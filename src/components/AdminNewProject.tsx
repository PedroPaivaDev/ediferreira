import React from 'react';

import handleTextSubmit from '@/helpers/handleTextSubmit';
import objectBgImage from '@/helpers/objectBgImage';
import convertBytes from '@/helpers/convertBytes';

import InputText from './InputText';
import TextArea from './TextArea';
import Button from './Button';

const AdminNewProject = () => {
  const [newProjectName, setNewProjectName] = React.useState<string>('');
  const [newProjectId, setNewProjectId] = React.useState<string>('');
  const [photosObjectFiles, setPhotosObjectFiles] = React.useState<FileObjectStorage[]>([]);
  const [mainProjectPhoto, setMainProjectPhoto] = React.useState<FileObjectStorage>();

  function handleFilesSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;
    if (!files || !files[0]) {
      return;
    }
    const arrayPhotoObjects:FileObjectStorage[] = [];
    for(let i=0; i < files.length; i++) {
      arrayPhotoObjects.push({
        name: files[i].name,
        folder: 'mainPhoto',
        url: URL.createObjectURL(files[i]),
        size: files[i].size
      })
    }
    setPhotosObjectFiles((current) => [
      ...current,
      ...arrayPhotoObjects
    ]);
  }

  function handleRemovePhoto(photoObject:FileObjectStorage) {
    setPhotosObjectFiles(photosObjectFiles.filter(photo => photo.url!==photoObject.url));
  }

  React.useEffect(() => {
    newProjectName && setNewProjectId(newProjectName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').toLowerCase());
  },[newProjectName])

  return (
    <div className='w-full flex flex-col justify-start items-start gap-3'>
      <h3 className='text-mood-tertiary'>Cadastrar Novo Projeto</h3>
      <form className='w-full flex flex-col justify-start items-start gap-5' onSubmit={handleTextSubmit}>
        <p>Edite o conteúdo deste projeto, utilizando os campos abaixo:</p>
        <div className={`w-full flex flex-col justify-start items-start gap-3`}>
          <label htmlFor='newProjectName' className='mr-3'>{`Nome: `}</label>
          <input 
            id='newProjectName'
            name={`projects/${newProjectId}&name`}
            type='text'
            className='p-3 w-full'
            value={newProjectName}
            onChange={({target}) => setNewProjectName(target.value)}
          />
        </div>
        <InputText label="Subtítulo:" name={`projects/${newProjectId}&subtitle`} placeholder='Ex.: Thera Berrine - Brooklin 71 m².'/>
        <TextArea label="Descrição:" name={`projects/${newProjectId}&description`} placeholder=''/>
        <Button label='Salvar Alterações dos Textos'/>
      </form>
      <p className='mt-10'>Escolha as fotos do projeto e defina uma para ser utilizada como capa do projeto:</p>
      <input
        type="file"
        multiple
        name={`projects/${newProjectId}&images`}
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
            {mainProjectPhoto?.url.includes(photo.url) ?
              <p className='text-mood-tertiary cursor-pointer'>
                Utilizada
              </p> :
              <p className='text-mood-tertiary cursor-pointer opacity-0 group-hover:opacity-100' onClick={() => setMainProjectPhoto(photo)}>
                usar esta
              </p>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNewProject;