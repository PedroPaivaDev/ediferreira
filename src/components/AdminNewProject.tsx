import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { changeContent, uploadFilesAndGetUrls } from '@/services/firebase';
import getFileNameFromUrl from '@/helpers/getFileNameFromUrl';

import InputText from './InputText';
import TextArea from './TextArea';
import Button from './Button';
import InputPhotoFile from './InputPhotoFile';

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

  React.useEffect(() => {
    newProjectName && setNewProjectId(newProjectName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').toLowerCase());
  },[newProjectName])

  return (
    <div className='w-full flex flex-col justify-start items-start gap-3 text-left'>
      <h3 className='text-mood-tertiary'>Cadastrar Novo Projeto</h3>
      <form className='w-full flex flex-col justify-start items-start gap-5'>
        <p>Adicione o conteúdo do novo projeto, utilizando os campos abaixo:</p>
        <InputText label="Nome:" name={`projects/${newProjectId}&name`} placeholder='' value={newProjectName} setValue={setNewProjectName}/>
        <InputText label="Subtítulo:" name={`projects/${newProjectId}&subtitle`} placeholder='Ex.: Thera Berrine - Brooklin 71 m².' value={newProjectSubtitle} setValue={setnewProjectSubtitle}/>
        <TextArea label="Descrição:" name={`projects/${newProjectId}&description`} placeholder='' value={newProjectDescription} setValue={setNewProjectDescription}/>
      </form>
      <p className='mt-10'>Escolha as fotos do projeto. Recomendo utilizar o site: https://www.easy-resize.com/pt/, para reduzir o tamanho das imagens, deixando-as com no máximo 500KB.</p>
      <p>Em seguida, defina uma das imagens para ser utilizada como capa do projeto:</p>
      <InputPhotoFile
        projectId={newProjectId}
        mainProjectPhoto={mainProjectPhoto} setMainProjectPhoto={setMainProjectPhoto}
        photosObjectFiles={photosObjectFiles} setPhotosObjectFiles={setPhotosObjectFiles}
      />
      <Button label='Salvar Novo Projeto' onClick={handleSubmitNewProject}/>
    </div>
  )
}

export default AdminNewProject;