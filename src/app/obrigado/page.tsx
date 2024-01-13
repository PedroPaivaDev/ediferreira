'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import { ContactDataContext } from '@/contexts/ContactDataContext';
import { trackConversion } from '@/lib/analitics';

const PageThanks = () => {
    const router = useRouter();
    const contentDB = React.useContext(ContentDBContext);
    const {contactFormData, setContactFormData} = React.useContext(ContactDataContext);

    const redirectUser = (values: ContactFormData) => {
        const header = `Olá, Edi. Meu nome é ${values['nome completo']}.`;
        const address = `Moro em ${values.cidade} e procuro uma designer para fazer meu projeto.`;
        const contact = `Meu e-mail é o ${values['e-mail']} e meu contato é o ${values.whatsapp}.`;
        
        const whatsappLink = `${contentDB?.contacts.social['1whatsapp'].url}`;
        router.push(`${whatsappLink}&text=${header}%0a${address}%0a${contact}`);
        setContactFormData(null);
    };
    
    React.useEffect(() => {
        if(contactFormData) {
            setTimeout(() => {
                contactFormData && redirectUser(contactFormData);
                trackConversion();
            }, 5000);
        }
    }, [contactFormData]);

    return (
        <main className={`
            bg-mood-light pt-[136px]
            ${contentDB ? 'opacity-100' : 'opacity-0'} duration-1000
        `}>
            <section className='justify-center h-[80vh] gap-2'>
                <h1>Obrigada pelo seu contato!</h1>
                <p>Em alguns segundos inciaremos nossa conversa pelo Whatsapp.</p>
                <a
                    href={`${contentDB?.contacts.social['1whatsapp'].url}`}
                    className='hover:text-mood-tertiary duration-300'
                >
                    Caso você não seja redirecionado, clique aqui.
                </a>
            </section>
        </main>
    )
}

export default PageThanks;