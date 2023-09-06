'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';
import logo from '../assets/logo-provisoria.jpeg';

const sections = ['Projetos', 'Contato'];


const Header = () => {
  const {visible, currentScrollZero} = React.useContext(HeaderViewContext);

  return (
    <header className={`
      h-16 duration-300
      ${currentScrollZero ?
        'bg-transparent' :
        'bg-mood-primary'
      }
      ${visible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <nav className='relative flex justify-center items-center w-full max-w-[900px]'>
        <ul className='flex justify-between items-center w-full flex-1 gap-5 m-5'>
          {sections.map(section =>
            <li key={section}>
              <Link
                href={`/#${section}`} 
                className='text-mood-light hover:text-mood-tertiary duration-300'
              >
                {section}
              </Link>
            </li>
          )}
        </ul>
        <Link href="/#home" className='absolute w-14 h-14'>
          <Image
            src={logo} alt='Logo Edi'
            className='w-full h-full'
          />
        </Link>
        <ul className='
          invisible sm:visible flex justify-end items-center gap-5
          absolute right-28
        '>
          <li>
            <a href={`https://www.instagram.com/ediferreiradesigner`} target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" viewBox="0 0 256 256"
                className='fill-mood-light hover:fill-mood-tertiary duration-300'
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href={`https://api.whatsapp.com/send?phone=5511962530018`} target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" viewBox="0 0 256 256"
                className='fill-mood-light hover:fill-mood-tertiary duration-300'
              >
                <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;