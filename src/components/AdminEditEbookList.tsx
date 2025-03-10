import React from 'react'

import { ContentDBContext } from '@/contexts/ContentDBContext'
import { deleteEbook } from '@/services/firebase'
import handleTextSubmit from '@/helpers/handleTextSubmit'

import InputText from './InputText'
import TextArea from './TextArea'
import Button from './Button'

interface PropsAdminEditEbookList {
  ebooksStorageFiles: FileObjectStorage[]
}

const AdminEditEbookList = ({ ebooksStorageFiles }: PropsAdminEditEbookList) => {
  const contentDB = React.useContext(ContentDBContext);

  const ebooksDB = contentDB?.guides.ebooks

  function handleDeleteEbook(ebookId: string, ebookUrlLink: string) {
    if (confirm('Esta ação não poderá ser desfeita. Tem certeza que deseja excluir este Ebook?')) {
      const ebookStorageFile = ebooksStorageFiles.find(ebook => ebook.url === ebookUrlLink)
      if (!ebookStorageFile) {
        alert('Ebook não encontrado no banco de dados')
        return
      }
      const ebookStorageFileName = ebookStorageFile.name
      deleteEbook(ebookId, ebookStorageFileName);
    } else return;
  }

  return (
    <>
      <form className='w-full flex flex-col justify-start items-start gap-5 text-left' onSubmit={handleTextSubmit}>
        <h3 className='text-mood-tertiary'>Editar Sessão de Ebooks</h3>
        {contentDB &&
          <>
            <InputText name='guides&title' label={`Título:`} placeholder={contentDB.guides.title} />
            <TextArea name='guides&subtitle' label={`Descrição:`} placeholder={contentDB.guides.subtitle} />
          </>
        }
        <Button label='Salvar Textos da Sessão' />
      </form>
      {ebooksDB && Object.keys(ebooksDB).map(ebookId => {
        const ebook = ebooksDB[ebookId]
        return (
          <div key={ebookId} className='w-full border-solid border-mood-quaternary p-5 rounded-lg'>
            <Button label='Excluir Ebook' className='bg-status-error' onClick={() => handleDeleteEbook(ebookId, ebook.downloadLink)} />
            <form className='w-full flex flex-col justify-start items-start gap-5 text-left' onSubmit={handleTextSubmit}>
              <InputText name={`guides/ebooks/${ebookId}&name`} label={`Nome:`} placeholder={ebook.name} />
              <TextArea name={`guides/ebooks/${ebookId}&description`} label={`Descrição:`} placeholder={ebook.description} />
              <InputText name={`guides/ebooks/${ebookId}&downloadButtonText`} label={`Texto do Botão de Download:`} placeholder={ebook.downloadButtonText} />
              <Button label='Salvar Ebook' />
            </form>
          </div>
        )
      })}
    </>
  )
}

export default AdminEditEbookList