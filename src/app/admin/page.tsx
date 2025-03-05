'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import AdminMedias from '@/components/AdminMedias';
import AdminTexts from '@/components/AdminTexts';
import AdminProjects from '@/components/AdminProjects';
import AdminNewProject from '@/components/AdminNewProject';
import AdminRegistrations from '@/components/AdminRegistrations';

const Admin = () => {
  const projectId = useSearchParams().get('content');
  const contentDB = React.useContext(ContentDBContext);
  
  return (
    <>
      {contentDB && !projectId && <>
        <p>Bem vinda, Edi.</p>
        <p>Selecione uma das quatro categorias acima (midias, textos, projetos, novo), para alterar os seus conteúdos.</p>
      </>}
      {projectId==='midias' && <AdminMedias/>}
      {projectId==='textos' && <AdminTexts/>}
      {projectId==='projetos' && <AdminProjects/>}
      {projectId==='novo' && <AdminNewProject/>}
      {projectId==='emails' && <AdminRegistrations/>}
    </>
  );
}

export default Admin;
