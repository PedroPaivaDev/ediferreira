import React from 'react'

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { changeContent, uploadFileAndGetUrl } from '@/services/firebase';

import InputText from './InputText';
import TextArea from './TextArea';
import Button from './Button';

const AdminAddEbook = () => {
  const contentDB = React.useContext(ContentDBContext);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [newEbookId, setNewEbookId] = React.useState<string>('');
  const [newEbookName, setNewEbookName] = React.useState<string>('');
  const [newEbookDescription, setNewEbookDescription] = React.useState('');
  const [ebookObjectFile, setEbookObjectFile] = React.useState<File | null>(null);

  function onFileSelected(
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    setFile(files[0]);
  }

  async function handleSubmitNewEbook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!contentDB?.guides?.ebooks) return

    if (Object.keys(contentDB.guides.ebooks).includes(newEbookId)) {
      alert('Já existe um ebook cadastrado com este nome')
      return
    } else if (!newEbookName || !newEbookDescription) {
      alert('Preencha todos os campos de texto');
      return;
    } else if (!ebookObjectFile) {
      alert('Faça o upload do arquivo do ebook');
      return;
    }

    try {
      setLoading(true);
      const ebookStorageUrl = await uploadFileAndGetUrl('ebooks/guides', ebookObjectFile.name, ebookObjectFile);

      if (typeof ebookStorageUrl === 'string') {
        const newEbookObject = {
          id: newEbookId,
          name: newEbookName,
          description: newEbookDescription,
          downloadLink: ebookStorageUrl,
          downloadButtonText: newEbookName,
        };
        changeContent(`guides/ebooks/${newEbookId}`, newEbookObject);
        alert(`O ebook ${newEbookName} foi cadastrado ao banco de dados.`);
      } else {
        alert('Erro ao obter a URL do arquivo. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar o ebook:', error);
      alert('Ocorreu um erro ao cadastrar o ebook. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    newEbookName && setNewEbookId(`${Date.now()}${newEbookName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_').toLowerCase()}`);
  }, [newEbookName])

  return (
    <form
      className='w-full flex flex-col justify-start items-start gap-5 text-left'
      onSubmit={handleSubmitNewEbook}
    >
      <h3 className='text-mood-tertiary'>Adicionar Novo Ebook</h3>
      <InputText
        label="Nome:"
        name={`guides/ebooks/${newEbookId}&name`}
        placeholder='Ex.: Guia de Obra'
        value={newEbookName} setValue={setNewEbookName}
      />
      <TextArea
        label="Descrição:"
        name={`guides/ebooks/${newEbookId}&description`}
        placeholder=''
        value={newEbookDescription} setValue={setNewEbookDescription}
      />
      <input
        onChange={(e) => onFileSelected(e, setEbookObjectFile)}
        name="guides&ebooks"
        type="file"
        id="guides&ebooks"
        accept="pdf/*"
        className="text-xs overflow-hidden"
      />
      <Button label='Salvar Novo Ebook' loading={loading} />
    </form>
  )
}

export default AdminAddEbook