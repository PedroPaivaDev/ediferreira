import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import InputContactForm from './InputContactForm';
import Button from './Button';
import { ContactDataContext } from '@/contexts/ContactDataContext';

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

const validationSchema = Yup.object().shape({
    'nome completo': Yup.string().required('Campo obrigatório'),
    'e-mail': Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    whatsapp: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato inválido de telefone').required('Campo obrigatório'),
    cidade: Yup.string().required('Campo obrigatório')
});

const ContactForm = ({
    greeting, className,
    classHeader, classForm, classInputContainer, classInput, classButton
}:PropsContactForm) => {
    const router = useRouter();
    const {setContactFormData} = React.useContext(ContactDataContext);

    const initialValues: ContactFormData = {
        'nome completo': '',
        'e-mail': '',
        whatsapp: '',
        cidade: ''
    };

    const handleSubmit = (values: ContactFormData) => {
        setContactFormData(values);
        router.push('/obrigado');
    };

    return (
        <div className={`
            bg-mood-light bg-opacity-80 rounded-sm
            flex flex-col px-6 py-16 gap-5
            ${className}
        `}>
            <div className={`flex sm:flex-row flex-col justify-center items-center ${classHeader}`}>
                <h3 className='text-left align-baseline'>
                    {greeting && <strong className='align-baseline'>Olá!</strong>} Solicite um orçamento
                </h3>
                <p className='text-mood-secondary mt-1 text-left align-baseline'>
                    Espaços únicos para sonhos únicos
                </p>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Form className={`flex flex-col gap-3 w-full max-w-[640px] ${classForm}`}>
                    <div className={`flex flex-col w-full gap-5 ${classInputContainer}`}>
                        {inputsToRender.map(input =>
                            <InputContactForm key={input} id={input} name={input} className={classInput} placeholder={input}/>
                        )}
                    </div>
                    <Button label='Iniciar conversa' className={`mt-5 ${classButton}`}/>
                </Form>
            </Formik>
        </div>
    )
}

export default ContactForm;