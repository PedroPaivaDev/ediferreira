'use client'
import React from 'react';
import { HeaderViewContext } from '@/contexts/HeaderViewContext';

const sections = ['Sobre', 'Projetos', 'Contato'];
// const social = ['instagram', 'whatsapp'];


const Header = () => {
  const {visible, currentScrollZero} = React.useContext(HeaderViewContext);

  return (
    <header className={`
      h-10 duration-300
      ${currentScrollZero ?
        'bg-transparent' :
        'bg-mood-primary'
      }
      ${visible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <nav className='flex justify-center items-center w-full'>
        <ul className='flex justify-around items-center w-full max-w-[900px]'>
          {sections.map(section =>
            <li key={section}>
              <a
                href={`#${section}`}
                className='text-mood-light hover:text-mood-tertiary duration-300'
              >
                {section}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header;