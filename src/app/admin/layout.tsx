'use client'
import React from 'react';
import Link from 'next/link';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { AuthGoogleContext } from '@/contexts/AuthGoogleContext';

import SignIn from '@/components/SingIn';

const adminSections = ['midias', 'textos', 'projetos', 'novo']

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  const contentDB = React.useContext(ContentDBContext);
  const {userAuth} = React.useContext(AuthGoogleContext);
  
  if(!userAuth) {
    return <main className='pt-page'><SignIn /></main>
  }

  return (
    <main className={`gap-5 pt-page ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
      <nav className='w-full min-h-10 flex flex-col justify-center items-center bg-mood-secondary text-mood-light'>
        <ul className='w-full max-w-md flex justify-between items-center p-5 flex-wrap'>
          {adminSections.map(section =>
            <li key={section}>
              <Link className='hover:text-mood-tertiary duration-300 font-normal' href={`admin?content=${section}`}>{section}</Link>
            </li>
          )}
        </ul>
      </nav>
      <SignIn />
      {contentDB && (
        userAuth.email==="contato.ediferreira@gmail.com" ||
        userAuth.email==="pedropaivadev@gmail.com" ||
        userAuth.email==="projetos.ediferreira@gmail.com"
      ) ?
        <div className='w-full max-w-4xl flex flex-col justify-start items-start gap-10 px-5'>
          {children}
        </div> :
        <section className='h-screen flex flex-col gap-5'>
          <p className='text-status-error'>O e-mail que você selecionou não é o &quot;contato.ediferreira@gmail.com&quot;.</p>
          <p>Clique em &quot;Logout&quot; e escolha o e-mail correto.</p>
        </section>
      }
    </main>
  )
}

export default AdminLayout;