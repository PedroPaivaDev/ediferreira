import React from 'react';

import handleTextSubmit from '@/helpers/handleTextSubmit';

import InputText from './InputText';
import TextArea from './TextArea';
import Button from './Button';
import AdminMediaPhotos from './AdminMediaPhotos';

const AdminNewProject = () => {
  const [newProjectName, setNewProjectName] = React.useState<string>('');
  const [newProjectId, setNewProjectId] = React.useState<string>('');
  const [photosProjectFiles, setPhotosProjectFiles] = React.useState<FileObjectStorage[]>([]);
  const [mainProjectPhoto, setMainProjectPhoto] = React.useState<FileObjectStorage>();

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
      <div className='w-full flex flex-col sm:flex-row flex-wrap justify-center items-center gap-5'>
        {mainProjectPhoto && photosProjectFiles.map(photo =>
          <AdminMediaPhotos key={photo.name}
            photoUrlDB={mainProjectPhoto.url}
            usePhotoOnPathDB={`projects/${newProjectId}`}
            photo={photo} fileStorageFolderPath={`projetos/${newProjectId}`}
          />
        )}
      </div>
    </div>
  )
}

export default AdminNewProject;