'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';
import { getData } from '@/services/firebase';
import logo from '../assets/logo-provisoria.jpeg';

const Header = () => {
  const path = usePathname();
  const {visible, currentScrollZero} = React.useContext(HeaderViewContext);
  const [contactsSocialDB, setcontactsSocialDB] = React.useState<ContactsSocialDB|null>(null);

  React.useEffect(() => {
    getData<ContactsSocialDB|null>('content/contacts/social', setcontactsSocialDB);
  },[]);

  return (
    <header className={`
      h-16 duration-300
      ${currentScrollZero && path==='/' ?
        'bg-transparent' : 'bg-mood-primary'
      }
      ${visible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <nav className='relative flex justify-center items-center w-full max-w-[900px]'>
        <ul className='flex justify-start items-center w-full gap-10 m-5'>
          <li>
            <Link
              href={`/projetos`} 
              className='hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Projetos
            </Link>
          </li>
          <li>
            <Link
              href={`/sobre`} 
              className='hidden sm:block hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Sobre
            </Link>
          </li>
        </ul>
        <Link href="/#home" className='absolute w-14 h-14'>
          <Image
            src={logo} alt='Logo Edi'
            className='w-full h-full'
          />
        </Link>
        <ul className='flex justify-end items-center w-full gap-5 m-5'>
          {contactsSocialDB && Object.keys(contactsSocialDB).map(socialId =>
            <li className='hidden sm:block' key={contactsSocialDB[socialId].id}>
              <a href={contactsSocialDB[socialId].url} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="30" height="30" viewBox="0 0 256 256"
                  className='hover:fill-mood-tertiary duration-300 fill-mood-light'
                >
                  <path d={contactsSocialDB[socialId].icon}></path>
                </svg>
              </a>
            </li>
          )}
          <li>
            <Link
              href={`/#Contato`} 
              className='hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;