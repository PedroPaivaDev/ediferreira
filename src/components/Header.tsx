'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';

import LogoType from './LogoType';

const sandwichNavBar = ['/#Home', '/Projetos', '/Sobre', '#Contato'];

const Header = () => {
  const path = usePathname();
  const {visible, currentScrollZero} = React.useContext(HeaderViewContext);

  return (
    <header className={`
      duration-300
      ${currentScrollZero && path==='/' ?
        'bg-transparent' : 'bg-mood-primary'
      }
      ${visible ? 'translate-y-0' : '-translate-y-full'}
      sm:translate-y-0
    `}>
      <nav className='flex flex-wrap sm:flex-nowrap justify-center items-center w-full max-w-[900px] px-5'>
        <div className={`h-24 w-full flex justify-center sm:justify-start`}>
          <LogoType type='name' className='w-72 fill-mood-light'/>
        </div>
        <ul className={`
          flex justify-center items-center gap-5 duration-300
        `}>
          {sandwichNavBar.map(navLink =>
            <li key={navLink}>
              <Link
                href={`${navLink.toLowerCase()}`}
                className='hover:text-mood-tertiary duration-300 text-mood-light leading-10'
              >
                {navLink.replace(/[^\w\s]/gi, '')}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header;