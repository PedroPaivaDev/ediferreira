import React from 'react'

import Modal from './Modal'
import ContactForm from './ContactForm';

interface PropsModalEmails {
  downloadLink: string
  setOpenModalEmail: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalEmail = ({downloadLink, setOpenModalEmail }: PropsModalEmails) => {
  console.log('ModalEmail', downloadLink)

  return (
    <Modal setOpenModal={setOpenModalEmail}>
      <ContactForm
        title=""
        subtitile="Preencha seus dados para acessar o material"
        customButtonText="Acessar material"
        className="w-full items-center px-0 py-0"
        classHeader=""
        classForm="items-end"
        classInputContainer=""
        classInput="bg-mood-quaternary placeholder:text-mood-light"
        classButton="mt-0"
        customRedirectLink={downloadLink}
      />
    </Modal>
  );
}

export default ModalEmail