import React from 'react';

interface PropsContact {
  contactsDB: ContactsDB;
}

const Contact = ({contactsDB}:PropsContact) => {
  return (
    <section id="Contato"
      className="relative bg-mood-tertiary text-mood-light flex flex-col gap-5"
    >
      <h2>Contatos</h2>
      <p className='text-mood-light'>{contactsDB.description}</p>
      <ul className='
        flex flex-col justify-center items-start gap-5
      '>
        {Object.keys(contactsDB.social).map(socialId =>
          <li key={contactsDB.social[socialId].id}
            className="group flex justify-center items-center gap-3 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="30" height="30" viewBox="0 0 256 256"
              className='fill-mood-light group-hover:fill-mood-primary duration-300'
            >
              <path d={contactsDB.social[socialId].icon}></path>
            </svg>
            <a
              href={contactsDB.social[socialId].url} target="_blank"
              className="
                group-hover:text-mood-primary duration-300
                flex flex-col justify-center items-start
              "
            >
              {contactsDB.social[socialId].name}
              <small>{contactsDB.social[socialId].address}</small>
            </a>
          </li>
        )}
      </ul>
      <a
        href={`https://pedropaiva.vercel.app`} target="_blank"
        className="absolute bottom-2 text-sm text-thin font-sans text-mood-quaternary hover:text-mood-light duration-300"
      >
        Desenvolvido por PedroPaivaDev
      </a>
    </section>
  )
}

export default Contact;