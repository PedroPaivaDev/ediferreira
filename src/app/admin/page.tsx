'use client'
import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import TextArea from '@/components/TextArea';
import SignIn from '@/components/SingIn';

const Admin = () => {
  const contentDB = React.useContext(ContentDBContext);
  const {userAuth} = React.useContext(AuthGoogleContext);

  const [videoPreview, setVideoPreview] = React.useState<string | null>(null);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);

  function onFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }

    const videoPreviewURL = URL.createObjectURL(files[0]);
    setVideoFile(files[0]);
    setVideoPreview(videoPreviewURL);
  }

  if(!userAuth) {
    return <main className='pt-16'><SignIn /></main>
  } else {
    return (
      <main className={`pt-16 ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
        <SignIn />
        {contentDB && userAuth.email==="contato.ediferreira@gmail.com" ?
          <section className='w-full flex flex-col justify-start items-start gap-10 max-w-3xl pb-20'>
            <p>Bem vinda, Edi.</p>
            <h3>Conteúdo da Home</h3>
            <div className='flex flex-col justify-start items-start gap-3'>
              <label htmlFor='newBgVideo'>Escolha um novo vídeo</label>
              <input
                onChange={onFileSelected}
                name="video"
                type="file"
                id="newBgVideo"
                accept="video/*"
                className='text-sm overflow-hidden max-w-[280px]'
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
            <TextArea id='callProjects' label={`Chamada para a página "Projetos":":`} placeholder={contentDB.home.callProjects}/>
          </section> :
          <section className='h-screen flex flex-col gap-5'>
            <p className='text-status-error'>O e-mail que você selecionou não é o "contato.ediferreira@gmail.com".</p>
            <p>Clique em "Logout" e escolha o e-mail correto.</p>
          </section>
        }
      </main>
    );
  }
}

export default Admin;
