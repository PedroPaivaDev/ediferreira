'use client'
import React from 'react';
import Link from 'next/link';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import SignIn from '@/components/SingIn';

const adminSections = ['video', 'foto', 'textos', 'projetos']

const AdminLayout = ({children}:{children:React.ReactNode}) => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <main className={`gap-5 py-16 ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000`}>
      <nav className='w-full min-h-10 flex flex-col justify-center items-center bg-mood-secondary text-mood-light'>
        <ul className='w-full max-w-4xl flex justify-center items-center gap-10 p-5 flex-wrap'>
          {adminSections.map(section =>
            <li key={section}>
              <Link className='hover:text-mood-tertiary duration-300 font-normal' href={`/admin/${section}`}>{section}</Link>
            </li>
          )}
        </ul>
      </nav>
      <SignIn />
      <div className='w-full max-w-4xl flex flex-col justify-start items-start gap-10 px-5'>
        {children}
      </div>
    </main>
  )
}

export default AdminLayout;