import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import objectBgImage from '@/helpers/objectBgImage';
import convertBytes from '@/helpers/convertBytes';

import InputText from './InputText';
import TextArea from './TextArea';
import Button from './Button';
import { changeContent, uploadFilesAndGetUrls } from '@/services/firebase';
import getFileNameFromUrl from '@/helpers/getFileNameFromUrl';

const AdminNewProject = () => {
  const contentDB = React.useContext(ContentDBContext);
  const [newProjectId, setNewProjectId] = React.useState<string>('');
  const [newProjectName, setNewProjectName] = React.useState<string>('');
  const [newProjectSubtitle, setnewProjectSubtitle] = React.useState<string>('');
  const [newProjectDescription, setNewProjectDescription] = React.useState('');

  const [photosObjectFiles, setPhotosObjectFiles] = React.useState<FileObjectLocal[]>([]);
  const [mainProjectPhoto, setMainProjectPhoto] = React.useState<FileObjectLocal>();

  function handleSubmitNewProject() {
    if(Object.keys(contentDB?.projects as ProjectsDB).includes(newProjectId) && !confirm('Já existe um projeto com este nome no site. Deseja substituí-lo?')) {
      return
    } else if(!newProjectName || !newProjectSubtitle || !newProjectDescription) {
      alert('Preencha todos os campos de texto');
      return;
    } else if(photosObjectFiles.length === 0) {
      alert('Escolha pelo menos uma foto para o projeto');
      return;
    } else if(!mainProjectPhoto) {
      alert('Defina uma foto para ser a capa do projeto');
      return;
    } else {
      uploadFilesAndGetUrls(photosObjectFiles, newProjectId).then(urlsImagesArray =>{
        function findMainPhoto() {
          return urlsImagesArray.filter(url => getFileNameFromUrl(url)===mainProjectPhoto?.name)[0]
        }
        const newProjectObject = {
          id: newProjectId,
          name: newProjectName,
          subtitle: newProjectSubtitle,
          description: newProjectDescription,
          mainPhoto: findMainPhoto(),
          images: urlsImagesArray
        }
        alert(`O projeto ${newProjectName} foi cadastrado ao banco de dados.`);
        changeContent(`projects/${newProjectId}`, newProjectObject);
      })
    }
  }

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
    setMainProjectPhoto(photo);
  }

  function handleRemovePhoto(photoObject:FileObjectLocal) {
    setPhotosObjectFiles(photosObjectFiles.filter(photo => photo.url!==photoObject.url));
  }

  React.useEffect(() => {
    newProjectName && setNewProjectId(newProjectName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').toLowerCase());
  },[newProjectName])

  return (
    <div className='w-full flex flex-col justify-start items-start gap-3'>
      <h3 className='text-mood-tertiary'>Cadastrar Novo Projeto</h3>
      <form className='w-full flex flex-col justify-start items-start gap-5'>
        <p>Adicione o conteúdo do novo projeto, utilizando os campos abaixo:</p>
        <InputText label="Nome:" name={`projects/${newProjectId}&name`} placeholder='' value={newProjectName} setValue={setNewProjectName}/>
        <InputText label="Subtítulo:" name={`projects/${newProjectId}&subtitle`} placeholder='Ex.: Thera Berrine - Brooklin 71 m².' value={newProjectSubtitle} setValue={setnewProjectSubtitle}/>
        <TextArea label="Descrição:" name={`projects/${newProjectId}&description`} placeholder='' value={newProjectDescription} setValue={setNewProjectDescription}/>
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
              <p className='text-mood-tertiary cursor-pointer opacity-0 group-hover:opacity-100' onClick={() => handleSelectMainPhoto(photo)}>
                usar esta
              </p>
            }
          </div>
        )}
      </div>
      <Button label='Salvar Novo Projeto' onClick={handleSubmitNewProject}/>
    </div>
  )
}

export default AdminNewProject;