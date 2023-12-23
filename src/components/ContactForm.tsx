import React from 'react';

import InputContactForm from './InputContactForm';
import Button from './Button';

interface PropsContactForm {
    greeting?: boolean;
    className?: string;
    classHeader?: string;
    classForm?: string;
    classInputContainer?: string;
    classInput?: string;
    classButton?: string;
}

const inputsToRender = ['nome completo', 'e-mail', 'whatsapp', 'cidade'];

const ContactForm = ({
    greeting, className,
    classHeader, classForm, classInputContainer, classInput, classButton
}:PropsContactForm) => {
  return (
    <div className={`
        bg-mood-light bg-opacity-80 rounded-sm
        flex flex-col px-6 py-16 gap-5
        ${className}
    `}>
        <div className={`flex sm:flex-row flex-col justify-center items-center gap-0 sm:gap-3 ${classHeader}`}>
            <h3 className='text-left align-baseline'>
                {greeting && <strong className='align-baseline'>Olá!</strong>} Solicite um orçamento
            </h3>
            <p className='text-mood-secondary mt-1 text-left align-baseline'>
                Espaços únicos para sonhos únicos
            </p>
        </div>
        <form className={`flex flex-col gap-3 w-full max-w-[640px] ${classForm}`}>
            <div className={`flex flex-col w-full gap-3 ${classInputContainer}`}>
                {inputsToRender.map(input =>
                    <InputContactForm key={input} className={classInput} placeholder={input}/>
                )}
            </div>
            <Button label='Iniciar conversa' className={`mt-5 ${classButton}`}/>
        </form>
    </div>
  )
}

export default ContactForm;