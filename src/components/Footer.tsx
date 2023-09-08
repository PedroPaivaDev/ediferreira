import React from 'react';

const Footer = () => {
  return (
    <footer className='relative'>
      <a
        href={`https://pedropaiva.vercel.app`} target="_blank"
        className="absolute bottom-2 text-sm text-thin font-sans text-mood-quaternary hover:text-mood-light duration-300"
      >
        Desenvolvido por PedroPaivaDev
      </a>
    </footer>
  )
}

export default Footer;