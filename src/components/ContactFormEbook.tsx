import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import InputContactForm from './InputContactForm';
import Button from './Button';
import { ContactDataContext } from '@/contexts/ContactDataContext';
import { createRegistration } from '@/services/firebase';
import generateIdFromEmail from '@/helpers/generateIdFromEmail';

interface PropsContactForm {
    greeting?: boolean;
    title: string;
    subtitile: string;
    customButtonText?: string;
    customRedirectLink?: string;
    className?: string;
    classHeader?: string;
    classForm?: string;
    classInputContainer?: string;
    classInput?: string;
    classButton?: string;
}

const inputsToRender = ['nome completo', 'e-mail'];

const validationSchema = Yup.object().shape({
    'nome completo': Yup.string().required('Campo obrigatório'),
    'e-mail': Yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
});

const ContactFormEbook = ({
    greeting, title, subtitile, customButtonText, customRedirectLink,
    className, classHeader, classForm, classInputContainer, classInput, classButton
}: PropsContactForm) => {
    const router = useRouter();
    const { contactFormData, setContactFormData } = React.useContext(ContactDataContext);
    const [initialValues, setInitialValues] = React.useState<ContactFormData>({
        'nome completo': '',
        'e-mail': '',
    });

    React.useEffect(() => {
        if (contactFormData) {
            setInitialValues(contactFormData);
        }
    }, [contactFormData]);

    const handleSubmit = (values: ContactFormData) => {
        setContactFormData(values);

        const customerDataId = generateIdFromEmail(values['e-mail'])
        const customerData: RegistrationsDB = {
            [customerDataId]: {
                email: values['e-mail'],
                name: values['nome completo'],
                ebooks: customRedirectLink ? {
                    downloadDate: new Date().toISOString(),
                    ebookLink: customRedirectLink,
                } : null,
                id: customerDataId
            }
        }
        createRegistration(customerData);

        if (customRedirectLink) {
            window.open(customRedirectLink, '_blank');
            return;
        }
        router.push('/obrigado');
    };

    return (
        <div className={`
            bg-mood-light rounded-sm
            flex flex-col px-6 py-16 gap-5
            ${className}
        `}>
            <div className={`flex sm:flex-row flex-col justify-center items-center ${classHeader}`}>
                <h3 className='text-center align-baseline'>
                    {greeting && <strong className='align-baseline'>Olá! </strong>}{title}
                </h3>
                <p className='text-mood-secondary mt-1 text-center align-baseline'>
                    {subtitile}
                </p>
            </div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={`flex flex-col gap-5 w-full max-w-[640px] ${classForm}`}>
                    <div className={`flex flex-col w-full gap-5 ${classInputContainer}`}>
                        {inputsToRender.map(input =>
                            <InputContactForm
                                key={input}
                                id={input}
                                name={input}
                                className={classInput}
                                placeholder={input}
                            />
                        )}
                    </div>
                    <Button
                        label={customButtonText ?? 'Iniciar conversa'}
                        className={`${classButton}`}
                        type='submit'
                    />
                </Form>
            </Formik>
        </div>
    );
}

export default ContactFormEbook;
