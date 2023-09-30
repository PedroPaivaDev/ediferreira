import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { changeContent, removePhotoFromDB } from '@/services/firebase';
import getFileNameFromUrl from '@/helpers/getFileNameFromUrl';
import objectBgImage from '@/helpers/objectBgImage';
import handleTextSubmit from '@/helpers/handleTextSubmit';

import Select from './Select';
import InputText from './InputText';
import TextArea from './TextArea';
import Button from './Button';

const AdminProjects = () => {
  const contentDB = React.useContext(ContentDBContext);
  const [selectedProject, setSelectedProject] = React.useState<string|null>(null);

  function handleDeleteImage(imageFolder:string, imageUrl:string, contentDB:ContentDB) {
    const newImagesArray = contentDB.projects[imageFolder].images.filter(photoUrl => photoUrl!==imageUrl)
    if(confirm('Deseja excluir esta foto?')) {
      removePhotoFromDB(`projetos/${imageFolder}`, getFileNameFromUrl(imageUrl));
      changeContent(`projects/${imageFolder}`, {images: newImagesArray});
    } else return;
  }

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
      {selectedProject && contentDB && <div className='flex flex-col justify-start items-start gap-5'>
        <form className='w-full flex flex-col justify-start items-start gap-5' onSubmit={handleTextSubmit}>
          <p>Edite o conteúdo deste projeto, utilizando os campos abaixo:</p>
          <InputText label="Nome:" name={`projects/${selectedProject}&name`} placeholder={contentDB.projects[selectedProject].name}/>
          <InputText label="Subtítulo:" name={`projects/${selectedProject}&subtitle`} placeholder={contentDB.projects[selectedProject].subtitle}/>
          <TextArea label="Descrição:" name={`projects/${selectedProject}&description`} placeholder={contentDB.projects[selectedProject].description}/>
          <Button label='Salvar Alterações dos Textos'/>
        </form>
        <p>{`Clique no "X" para remover as imagens:`}</p>
        <form className='w-full flex flex-col sm:flex-row flex-wrap justify-center items-center gap-5'>
          {contentDB.projects[selectedProject].images.map(photoUrl =>
            <div key={photoUrl} style={objectBgImage(photoUrl)}
              className={`
                h-64 w-64 text-mood-light flex flex-col justify-end items-center p-5 relative
              `}
            >
              <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
                className="absolute top-5 w-5 fill-mood-light hover:fill-status-error cursor-pointer duration-300"
                onClick={() => handleDeleteImage(selectedProject, photoUrl, contentDB)}
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </div>
          )}
        </form>
      </div>}
    </div>
  )
}

export default AdminProjects;