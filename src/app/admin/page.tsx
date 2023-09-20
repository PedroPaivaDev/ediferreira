'use client'
import React from 'react';
import Image from 'next/image';

// import { changeContent } from '@/services/firebase';
import { ContentDBContext } from '@/contexts/ContentDBContext';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';
import createObjectFromEntries from '@/helpers/createObjectFromEntries';

import SignIn from '@/components/SingIn';
import TextArea from '@/components/TextArea';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

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
  
  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // changeContent('home', {callAbout:'teste'});
    const formData = new FormData(event.currentTarget);
    const formDataEntriesArray = Array.from(formData.entries());
    const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);
    console.log(formObjectChangedKeys)
  }
  
  if(!userAuth) {
    return <main className='pt-16'><SignIn /></main>
  }
  
  return (
    <main className={`py-16 ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
      <SignIn />
      {contentDB && userAuth.email==="contato.ediferreira@gmail.com" &&
        <form className='w-full flex flex-col justify-start items-start gap-10 max-w-4xl px-5' onSubmit={handleSubmit}>
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
                className='text-xs overflow-hidden'
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
            <TextArea name='callAbout' label={`Chamada para a página "Sobre":`} placeholder={contentDB.home.callAbout}/>
            <TextArea name='callProjects' label={`Chamada para a página "Projetos":`} placeholder={contentDB.home.callProjects}/>
          </div>
          <div id='aboutContent' className='w-full flex flex-col justify-start items-start gap-5'>
            <h3>Conteúdo da Sessão &quot;Sobre&quot;</h3>
            <TextArea name='aboutText' label={`Texto da sessão "sobre":`} placeholder={contentDB.about.text}/>
            <div className='flex flex-col justify-start items-start gap-3'>
              <label htmlFor="photoEdi">Escolha uma nova foto para a sessão &quot;sobre&quot;</label>
              <input
                onChange={onPhotoSelected}
                name="photoEdi"
                type="file"
                id="photoEdi"
                accept="image/*"
                className="text-xs overflow-hidden"
              />
              {photoPreview && (
                <Image id="imagePreview" src={photoPreview} alt='Foto Nova da Edi'
                  width={240} height={240} className='max-w-lg'
                />
              )}
            </div>
          </div>
          <div id='servicesContent' className='w-full flex flex-col justify-start items-start gap-5'>
            <h3>Conteúdo da Sessão &quot;Serviços&quot;</h3>
            <TextArea name='servicesTextFirstP' label={`Primeiro texto:`} placeholder={contentDB.about.servicesText.firstParagraph}/>
            <TextArea name='servicesTextSecondP' label={`Segundo texto:`} placeholder={contentDB.about.servicesText.secondParagraph}/>
            <TextArea name='servicesTextThirdP' label={`Terceiro texto:`} placeholder={contentDB.about.servicesText.thirdParagraph}/>
            <div id='servicesItems' className='w-full flex flex-col justify-start items-start gap-5'>
              <h3>Tipos de serviços:</h3>
              {Object.keys(contentDB.services).map(serviceId =>
                <div key={serviceId} className='w-full flex flex-col justify-start items-start gap-5 pl-5 mb-5'>
                  <InputText label="Título do Serviço:" name={`${serviceId}Title`} placeholder={contentDB.services[serviceId].subtitle}/>
                  <ul className='w-full flex flex-col justify-start items-start gap-5 pl-5'>
                    {contentDB.services[serviceId].items.map((item, index) =>
                      <li className='w-full' key={index}>
                        <InputText label={`Item ${index+1}:`} name={`Item${serviceId+index+1}`} placeholder={item}/>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div id='contactContent' className='w-full flex flex-col justify-start items-start gap-5'>
            <h3>Conteúdo da Sessão &quot;Fale Conosco&quot;</h3>
            <InputText label="Descrição:" name="contactDescription" placeholder={contentDB.contacts.description}/>
            <div id='contactIMedias' className='w-full flex flex-col justify-start items-start gap-5'>
              <h3>Redes Sociais:</h3>
              {Object.keys(contentDB.contacts.social).map(mediaId =>
                <div key={mediaId} className='w-full flex flex-col justify-start items-start gap-5 pl-5 mb-5'>
                  <InputText label="Nome da Rede:" name={`${mediaId}Name`} placeholder={contentDB.contacts.social[mediaId].name}/>
                  <InputText label="Endereço na Rede:" name={`${mediaId}Address`} placeholder={contentDB.contacts.social[mediaId].address}/>
                  <InputText label="Link da Rede:" name={`${mediaId}Url`} placeholder={contentDB.contacts.social[mediaId].url}/>
                  <TextArea name={`${mediaId}Icon`} label="'Path' do SVG do ícone da Rede (recomendado usar o site: phosphoricons.com):" placeholder={contentDB.contacts.social[mediaId].icon}/>
                </div>
              )}
            </div>
          </div>
          <Button label='Salvar Alterações' className='fixed right-5 top-20'/>
        </form>
      }
    </main>
  );
}

export default Admin;
