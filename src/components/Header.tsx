import React from 'react';

const sections = ['Sobre', 'Projetos', 'Contato'];
const social = ['instagram', 'whatsapp']

const Header = () => {
  return (
    <header className='h-10 bg-mood-light'>
      <nav className='w-full'>
        <ul className='flex justify-around w-full'>
          {sections.map(section =>
            <li key={section}>
              <a
                href={`#${section}`}
                className='text-mood-dark hover:text-mood-tertiary duration-300'
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