import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import Footer from './Footer';

const Contact = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <>
      <section id="Contato"
        className="bg-mood-tertiary text-mood-light gap-5"
      >
        <h2>Contatos</h2>
        <p className='text-mood-light'>{contentDB?.contacts.description}</p>
        <ul className='
          flex flex-col justify-center items-start gap-5
        '>
          {contentDB && Object.keys(contentDB.contacts.social).map(socialId =>
            <li key={contentDB?.contacts.social[socialId].id}
              className="group flex justify-center items-center gap-3 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" viewBox="0 0 256 256"
                className='fill-mood-light group-hover:fill-mood-primary duration-300'
              >
                <path d={contentDB?.contacts.social[socialId].icon}></path>
              </svg>
              <a
                href={contentDB?.contacts.social[socialId].url} target="_blank"
                className="
                  group-hover:text-mood-primary duration-300
                  flex flex-col justify-center items-start
                "
              >
                {contentDB?.contacts.social[socialId].name}
                <small>{contentDB?.contacts.social[socialId].address}</small>
              </a>
            </li>
          )}
        </ul>
      </section>
      <Footer />
    </>
  )
}

export default Contact;