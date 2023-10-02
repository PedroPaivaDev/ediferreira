import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { deleteProject, listAllFiles } from '@/services/firebase';
import handleTextSubmit from '@/helpers/handleTextSubmit';

import AdminMediaPhotos from './AdminMediaPhotos';
import Select from './Select';
import InputText from './InputText';
import TextArea from './TextArea';
import Button from './Button';

const AdminProjects = () => {
  const contentDB = React.useContext(ContentDBContext);
  const [selectedProject, setSelectedProject] = React.useState<string|null>(null);
  const [photosProjectStorageFiles, setPhotosProjectStorageFiles] = React.useState<FileObjectStorage[]>([]);

  function handleDeleteProject(projectId:string) {
    if(confirm('Esta ação não poderá ser desfeita. Tem certeza que deseja excluir este projeto?')) {
      deleteProject(projectId);
    } else return;
  }

  React.useEffect(() => {
    selectedProject && listAllFiles(`projetos/${selectedProject}`, 'mainPhoto', setPhotosProjectStorageFiles);
  },[selectedProject]);

  return (
    <div className='w-full flex flex-col justify-start items-start gap-3'>
      <h3 className='text-mood-tertiary'>Editar e Adicionar Projetos</h3>
      <Button label='Cadastrar um Novo Projeto'/>
      <p>ou</p>
      {contentDB && <Select
        name="projetos"
        label="Edite um Projeto Cadastrado:"
        initial="Selecione um projeto"
        options={Object.keys(contentDB.projects)}
        selectedOption={selectedProject} setSelectedOption={setSelectedProject}
        className='flex-col sm:flex-row'
      />}
      {selectedProject && contentDB && <div key={selectedProject} className='animeLeft flex flex-col justify-start items-start gap-5'>
        <Button label='Excluir Projeto' className='bg-status-error' onClick={() => handleDeleteProject(selectedProject)}/>
        <form className='w-full flex flex-col justify-start items-start gap-5' onSubmit={handleTextSubmit}>
          <p>Edite o conteúdo deste projeto, utilizando os campos abaixo:</p>
          <InputText label="Nome:" name={`projects/${selectedProject}&name`} placeholder={contentDB.projects[selectedProject].name}/>
          <InputText label="Subtítulo:" name={`projects/${selectedProject}&subtitle`} placeholder={contentDB.projects[selectedProject].subtitle}/>
          <TextArea label="Descrição:" name={`projects/${selectedProject}&description`} placeholder={contentDB.projects[selectedProject].description}/>
          <Button label='Salvar Alterações dos Textos'/>
        </form>
        <p>{`Clique no "X" para remover as imagens:`}</p>
        <p>Selecione uma das imagens para ser a capa do projeto:</p>
        <div className='w-full flex flex-col sm:flex-row flex-wrap justify-center items-center gap-5'>
          {photosProjectStorageFiles.map(photo =>
            <AdminMediaPhotos key={photo.name}
              photoUrlDB={contentDB.projects[selectedProject].mainPhoto}
              usePhotoOnPathDB={`projects/${selectedProject}`}
              photo={photo} fileStorageFolderPath={`projetos/${selectedProject}`}
              projectPhotosDB={contentDB.projects[selectedProject].images}
            />
          )}
        </div>
      </div>}
    </div>
  )
}

export default AdminProjects;