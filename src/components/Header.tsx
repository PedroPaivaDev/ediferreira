'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { HeaderViewContext } from '@/contexts/HeaderViewContext';
import { getData } from '@/services/firebase';

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
      <nav className='relative flex justify-center items-center w-full max-w-[900px] gap-5 px-5'>
        <Link href="/#home" className='sm:absolute w-full sm:w-auto'>
          <svg className='group' version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="60" height="60" viewBox="0 0 392.000000 295.000000"
          preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,295.000000) scale(0.100000,-0.100000)"
            className='group-hover:fill-mood-tertiary duration-300 fill-mood-light' stroke="none">
              <path d="M770 2217 l0 -733 -382 -171 -383 -172 -3 -55 c-2 -31 -1 -56 1 -56
              3 0 170 75 373 166 203 91 375 168 382 171 9 4 12 -95 12 -476 l0 -481 960 0
              960 0 0 45 0 45 -910 0 -910 0 0 458 0 459 28 12 c60 28 990 445 1028 461 l41
              18 544 -247 544 -247 3 -657 2 -657 -1150 0 -1151 0 3 -48 3 -47 1198 -3 1197
              -2 0 680 c0 374 3 680 8 680 4 0 174 -76 377 -168 l370 -168 3 55 c2 31 0 57
              -5 58 -4 2 -174 79 -378 171 l-370 168 -3 532 -2 532 -50 0 -50 0 0 -505 c0
              -278 -3 -505 -6 -505 -4 0 -250 111 -547 246 l-541 245 -540 -242 c-298 -133
              -544 -244 -548 -246 -5 -2 -8 293 -8 656 l0 661 1145 0 1145 0 0 50 0 50
              -1195 0 -1195 0 0 -733z"/>
              </g>
          </svg>
        </Link>
        <ul className='flex justify-start items-center sm:w-full gap-10'>
          <li>
            <Link
              href={`/projetos`}
              className='hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Projetos
            </Link>
          </li>
          <li className='hidden sm:block '>
            <Link
              href={`/sobre`} 
              className='hover:text-mood-tertiary duration-300 text-mood-light'
            >
              Sobre
            </Link>
          </li>
        </ul>
        <ul className='flex justify-end items-center sm:w-full gap-5'>
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