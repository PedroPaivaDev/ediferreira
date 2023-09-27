'use client'
import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import handleTextSubmit from '@/helpers/handleTextSubmit';

import Button from '@/components/Button';
import InputText from '@/components/InputText';
import TextArea from '@/components/TextArea';

const AdminTexts = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <form className='w-full flex flex-col justify-start items-start gap-10' onSubmit={handleTextSubmit}>
      {contentDB && <>
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
          <TextArea name='about/servicesText&firstParagraph' label={`Texto da sessão "serviços":`} placeholder={contentDB.about.servicesText.firstParagraph}/>
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
      </>}
      <Button label='Salvar Textos' className='fixed right-5 top-[150px]'/>
    </form>
  )
}

export default AdminTexts;