'use client'
import React from 'react';
import Image from 'next/image';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import TextArea from '@/components/TextArea';
import SignIn from '@/components/SingIn';

const Admin = () => {
  const contentDB = React.useContext(ContentDBContext);
  const {userAuth} = React.useContext(AuthGoogleContext);

  const [videoPreview, setVideoPreview] = React.useState<string | null>(null);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);

  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [photoFile, setPotoFile] = React.useState<File | null>(null);

  function onVideoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    const videoPreviewURL = URL.createObjectURL(files[0]);
    setVideoFile(files[0]);
    setVideoPreview(videoPreviewURL);
  }

  function onPhotoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    const videoPreviewURL = URL.createObjectURL(files[0]);
    setPotoFile(files[0]);
    setPhotoPreview(videoPreviewURL);
  }
  
  if(!userAuth) {
    return <main className='pt-16'><SignIn /></main>
  }
  
  return (
    <main className={`py-16 ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
      <SignIn />
      {contentDB && userAuth.email==="contato.ediferreira@gmail.com" &&
        <div className='w-full flex flex-col justify-start items-start gap-10 max-w-4xl px-20'>
          <p>Bem vinda, Edi.</p>
          <div id='homeContent' className='w-full flex flex-col justify-start items-start gap-5'>
            <h3>Conteúdo da Página &quot;Home&quot;</h3>
            <div className='flex flex-col justify-start items-start gap-3'>
              <label htmlFor='newBgVideo'>Escolha um novo vídeo vertical com no máximo 5 megabytes e que não possua áudio:</label>
              <input
                onChange={onVideoSelected}
                name="newBgVideo"
                type="file"
                id="newBgVideo"
                accept="video/*"
                className='text-xs overflow-hidden max-w-[280px]'
              />
              {videoPreview && (
                <video id="videoPreview" autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto"
                  className='max-w-lg'
                >
                  <source src={videoPreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <TextArea id='callAbout' label={`Chamada para a página "Sobre":`} placeholder={contentDB.home.callAbout}/>
            <TextArea id='callProjects' label={`Chamada para a página "Projetos":`} placeholder={contentDB.home.callProjects}/>
          </div>
          <div id='aboutContent' className='w-full flex flex-col justify-start items-start gap-5'>
            <h3>Conteúdo da Sessão &quot;Sobre&quot;</h3>
            <TextArea id='aboutText' label={`Texto da sessão "sobre":`} placeholder={contentDB.about.text}/>
            <div className='flex flex-col justify-start items-start gap-3'>
              <label htmlFor="photoEdi">Escolha uma nova foto para a sessão &quot;sobre&quot;</label>
              <input
                onChange={onPhotoSelected}
                name="photoEdi"
                type="file"
                id="photoEdi"
                accept="image/*"
                className="text-xs overflow-hidden max-w-[280px]"
              />
              {photoPreview && (
                <Image id="videoPreview" src={photoPreview} alt='Foto Nova da Edi'
                  width={240} height={240} className='max-w-lg'
                />
              )}
            </div>
          </div>
          <div id='servicesContent' className='w-full flex flex-col justify-start items-start gap-5'>
            <h3>Conteúdo da Sessão &quot;Serviços&quot;</h3>
            <TextArea id='servicesTextFirstP' label={`Primeiro texto:`} placeholder={contentDB.about.servicesText.firstParagraph}/>
            <TextArea id='servicesTextSecondP' label={`Segundo texto:`} placeholder={contentDB.about.servicesText.secondParagraph}/>
            <TextArea id='servicesTextThirdP' label={`Terceiro texto:`} placeholder={contentDB.about.servicesText.thirdParagraph}/>
          </div>
        </div>
      }
    </main>
  );
}

export default Admin;
