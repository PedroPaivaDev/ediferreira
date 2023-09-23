'use client'
import React from 'react';
import Image from 'next/image';

import { changeContent, uploadFileAndGetUrl } from '@/services/firebase';
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

  const [videoPreviewUrl, setVideoPreviewUrl] = React.useState<string | null>(null);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);

  const [photoPreviewUrl, setPhotoPreviewUrl] = React.useState<string | null>(null);
  const [photoFile, setPotoFile] = React.useState<File | null>(null);

  function onVideoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    setVideoFile(files[0]);
    setVideoPreviewUrl(URL.createObjectURL(files[0]));
  }

  function onPhotoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    setPotoFile(files[0]);
    setPhotoPreviewUrl(URL.createObjectURL(files[0]));
  }
  
  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataEntriesArray = Array.from(formData.entries());
    const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);
    if(Object.keys(Object.keys(formObjectChangedKeys).length===0)) {
      alert('Nenhum campo foi alterado.');
      return
    }
    Object.keys(formObjectChangedKeys).forEach(path =>
      Object.keys(formObjectChangedKeys[path]).forEach(key =>
        changeContent(path, {[key]: formObjectChangedKeys[path][key]})
      )
    );
  }

  function handleFileSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataEntriesArray = Array.from(formData.entries());
    const formObjectChangedKeys = createObjectFromEntries(formDataEntriesArray as Array<[string, string]>);
    Object.keys(formObjectChangedKeys).forEach(path =>
      Object.keys(formObjectChangedKeys[path]).forEach(key => {
        const objectFile = formObjectChangedKeys[path][key];
        uploadFileAndGetUrl(key, objectFile.name, objectFile as File).then(fileUrl =>
          changeContent(path, {[key]: fileUrl})
        )
      })
    );
  }
  
  if(!userAuth) {
    return <main className='pt-16'><SignIn /></main>
  }
  
  return (
    <main className={`py-16 ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
      <SignIn />
      {contentDB && userAuth.email==="contato.ediferreira@gmail.com" &&
        <div className='w-full flex flex-col justify-center items-center gap-10'>
          <p className='w-full max-w-4xl px-5 text-left'>Bem vinda, Edi.</p>
          <div className='w-full max-w-4xl flex flex-col justify-start items-start gap-10 px-5'>
            <form className='w-full flex flex-col justify-start items-start gap-3' onSubmit={handleFileSubmit}>
              <h3 className='text-mood-tertiary'>Vídeo da Página &quot;Home&quot;</h3>
              {videoFile && <Button label='Salvar Novo Vídeo'/>}
              <label htmlFor='home&bgVideo'>Escolha um novo vídeo vertical com no máximo 5 megabytes e que não possua áudio:</label>
              <input
                onChange={onVideoSelected}
                name="home&bgVideo"
                type="file"
                id="home&bgVideo"
                accept="video/*"
                className='text-xs overflow-hidden'
              />
              {videoPreviewUrl && (
                <video id="videoPreview" autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto"
                  className='max-w-lg' key={videoPreviewUrl}
                >
                  <source src={videoPreviewUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </form>
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
          </div>
          <form className='w-full flex flex-col justify-start items-start gap-10 max-w-4xl px-5' onSubmit={handleSubmit}>
            <div id='homeContent' className='w-full flex flex-col justify-start items-start gap-5'>
              <h3 className='text-mood-tertiary'>Chamadas na Página &quot;Home&quot;</h3>
              <TextArea name='home&callAbout' label={`Chamada para a página "Sobre":`} placeholder={contentDB.home.callAbout}/>
              <TextArea name='home&callProjects' label={`Chamada para a página "Projetos":`} placeholder={contentDB.home.callProjects}/>
            </div>
            <div id='aboutContent' className='w-full flex flex-col justify-start items-start gap-5'>
              <h3 className='text-mood-tertiary'>Conteúdo da Sessão &quot;Sobre&quot;</h3>
              <TextArea name='about&text' label={`Texto da sessão "sobre":`} placeholder={contentDB.about.text}/>
            </div>
            <div id='projectsContent' className='w-full flex flex-col justify-start items-start gap-5'>
              <h3 className='text-mood-tertiary'>Conteúdo da Sessão &quot;Projetos&quot;</h3>
              <TextArea name='about/projectsText&subtitle' label={`Introdução da sessão "projetos":`} placeholder={contentDB.about.projectsText.subtitle}/>
              <TextArea name='about/projectsText&description' label={`Texto da sessão "projetos":`} placeholder={contentDB.about.projectsText.description}/>
            </div>
            <div id='servicesContent' className='w-full flex flex-col justify-start items-start gap-5'>
              <h3 className='text-mood-tertiary'>Conteúdo da Sessão &quot;Serviços&quot;</h3>
              <TextArea name='about/servicesText&firstParagraph' label={`Primeiro parágrafo:`} placeholder={contentDB.about.servicesText.firstParagraph}/>
              <TextArea name='about/servicesText&secondParagraph' label={`Segundo parágrafo:`} placeholder={contentDB.about.servicesText.secondParagraph}/>
              <TextArea name='about/servicesText&thirdParagraph' label={`Terceiro parágrafo:`} placeholder={contentDB.about.servicesText.thirdParagraph}/>
              <div id='servicesItems' className='w-full flex flex-col justify-start items-start gap-5'>
                <h3>Tipos de serviços:</h3>
                {Object.keys(contentDB.services).map(serviceId =>
                  <div key={serviceId} className='w-full flex flex-col justify-start items-start gap-5 pl-5 mb-5'>
                    <InputText label="Título do Serviço:" name={`services/${serviceId}&subtitle`} placeholder={contentDB.services[serviceId].subtitle}/>
                    <ul className='w-full flex flex-col justify-start items-start gap-5 pl-5'>
                      {Object.keys(contentDB.services[serviceId].products).map((item) =>
                        <li className='w-full' key={item}>
                          <InputText label={`${item}:`} name={`services/${serviceId}/products&${item}`} placeholder={contentDB.services[serviceId].products[item]}/>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div id='contactContent' className='w-full flex flex-col justify-start items-start gap-5'>
              <h3 className='text-mood-tertiary'>Conteúdo da Sessão &quot;Fale Conosco&quot;</h3>
              <InputText label="Descrição:" name="contacts&description" placeholder={contentDB.contacts.description}/>
              <div id='contactIMedias' className='w-full flex flex-col justify-start items-start gap-5'>
                <h3>Redes Sociais:</h3>
                {Object.keys(contentDB.contacts.social).map(mediaId =>
                  <div key={mediaId} className='w-full flex flex-col justify-start items-start gap-5 pl-5 mb-5'>
                    <InputText label="Nome da Rede:" name={`contacts/social/${mediaId}&name`} placeholder={contentDB.contacts.social[mediaId].name}/>
                    <InputText label="Endereço na Rede:" name={`contacts/social/${mediaId}&address`} placeholder={contentDB.contacts.social[mediaId].address}/>
                    <InputText label="Link da Rede:" name={`contacts/social/${mediaId}&url`} placeholder={contentDB.contacts.social[mediaId].url}/>
                    <TextArea label="'Path' do SVG do ícone da Rede (recomendado usar o site: phosphoricons.com):" name={`contacts/social/${mediaId}&icon`} placeholder={contentDB.contacts.social[mediaId].icon}/>
                  </div>
                )}
              </div>
            </div>
            <Button label='Salvar Textos' className='fixed right-5 top-20'/>
          </form>      
        </div>
      }
    </main>
  );
}

export default Admin;
