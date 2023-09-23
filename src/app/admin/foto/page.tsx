'use client'
import React from 'react'
import Image from 'next/image';

import handleFileSubmit from '@/helpers/handleFileSubmit';

import Button from '@/components/Button';

const AdminFoto = () => {
  const [photoPreviewUrl, setPhotoPreviewUrl] = React.useState<string | null>(null);
  const [photoFile, setPotoFile] = React.useState<File | null>(null);

  function onPhotoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    setPotoFile(files[0]);
    setPhotoPreviewUrl(URL.createObjectURL(files[0]));
  }

  return (
    <form className='w-full flex flex-col justify-start items-start gap-3' onSubmit={handleFileSubmit}>
      <h3 className='text-mood-tertiary'>Foto da Edi na Página &quot;Sobre&quot;</h3>
      {photoFile && <Button label='Salvar Nova Foto da Edi'/>}
      <label htmlFor="home&photoEdi">Escolha uma nova foto que o rosto esteja centralizado, para a sessão &quot;sobre&quot;:</label>
      <input
        onChange={onPhotoSelected}
        name="home&photoEdi"
        type="file"
        id="home&photoEdi"
        accept="image/*"
        className="text-xs overflow-hidden"
      />
      {photoPreviewUrl && (
        <Image id="imagePreview" src={photoPreviewUrl} alt='Foto Nova da Edi'
          width={240} height={240} className='max-w-lg' key={photoPreviewUrl}
        />
      )}
    </form>
  )
}

export default AdminFoto