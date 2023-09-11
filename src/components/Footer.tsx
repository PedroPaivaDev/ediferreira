'use client'
import React from 'react';
import Link from 'next/link';

import scrollToTop from '@/helpers/scrollToTop';

const Footer = () => {
  return (
    <footer className='relative bg-mood-tertiary text-mood-light'>
      <a
        href={`https://pedropaiva.vercel.app`} target="_blank"
        className="absolute bottom-2 text-sm text-thin font-sans text-mood-quaternary hover:text-mood-light duration-300"
      >
        Desenvolvido por PedroPaivaDev
      </a>
      <button onClick={scrollToTop} className='
        group absolute top-0 cursor-pointer
        text-mood-secondary hover:text-mood-primary duration-300
        flex flex-col justify-center items-center
      '>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"
          className='fill-mood-secondary group-hover:fill-mood-primary duration-300'
        >
          <path d="M229.66,114.34l-96-96a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,32,128H72v24a8,8,0,0,0,8,8h96a8,8,0,0,0,8-8V128h40a8,8,0,0,0,5.66-13.66ZM176,112a8,8,0,0,0-8,8v24H88V120a8,8,0,0,0-8-8H51.31L128,35.31,204.69,112Zm8,104a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,216Zm0-32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,184Z"/>
        </svg>
        Voltar ao Topo
      </button>
      <nav className='w-full absolute bottom-12'>
        <ul className='flex justify-center items-center gap-5'>
          <li>
            <Link href={`/projetos`}>Projetos</Link>
          </li>
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
            <Link href={`/sobre`}>Sobre</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;