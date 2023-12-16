import React from 'react';

import InputContactForm from './InputContactForm';
import Button from './Button';

const ContactForm = () => {
  return (
    <div className='
        absolute top-1/2 -translate-y-1/2 right-5
        bg-mood-light bg-opacity-80 rounded-sm
        hidden xs:flex flex-col px-6 py-16
    '>
        <h3 className='text-left'>
            <strong className='align-text-bottom'>Olá!</strong> Solicite um orçamento
        </h3>
        <p className='text-mood-secondary mb-3 text-left'>Espaços únicos para sonhos únicos</p>
        <form className='flex flex-col gap-3'>
            <InputContactForm placeholder='nome completo'/>
            <InputContactForm placeholder='e-mail'/>
            <InputContactForm placeholder='whatsapp'/>
            <InputContactForm placeholder='cidade'/>
            <Button label='Iniciar conversa' className='mt-5'/>
        </form>
    </div>
  )
}

export default ContactForm;