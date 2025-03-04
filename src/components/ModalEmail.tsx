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
        className="w-full items-center"
        classHeader="sm:gap-3"
        classForm="items-end"
        classInputContainer="sm:grid grid-cols-2"
        classInput="bg-mood-quaternary placeholder:text-mood-light"
        customRedirectLink={downloadLink}
      />
    </Modal>
  );
}

export default ModalEmail