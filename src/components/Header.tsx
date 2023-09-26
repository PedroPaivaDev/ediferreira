'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';

import LogoType from './LogoType';

const Header = () => {
  const path = usePathname();
  const {visible, currentScrollZero} = React.useContext(HeaderViewContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`
      h-16 duration-300
      ${currentScrollZero && path==='/' ?
        'bg-transparent' : 'bg-mood-primary'
      }
      ${visible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <nav className='relative flex justify-center items-center w-full max-w-[900px] px-5'>
        <Link href="/#home" className={`w-full ${currentScrollZero && path==='/' ? 'invisible' : 'visible'}`}>
          <LogoType type='name' className='h-10 fill-mood-light hover:fill-mood-tertiary duration-300'/>
        </Link>
        <ul className={`
          xs:flex justify-center items-center gap-5 duration-300
          ${isOpen ? 'flex bg-mood-quaternary absolute top-[60px] w-full h-10' : 'hidden'}
        `}>
          <li>
            <Link
              href={`/projetos`}
              className='hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Projetos
            </Link>
          </li>
          <li className='hidden sm:block'>
            <Link
              href={`/sobre`} 
              className='hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href={`#Contato`}
              className='hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Contato
            </Link>
          </li>
        </ul>
        <button onClick={handleToggle} type="button"
          className="xs:hidden flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600"
        >
          <svg
            className="w-10 fill-mood-light"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            ) : (
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
            )}
          </svg>
        </button>
      </nav>
    </header>
  )
}

export default Header;