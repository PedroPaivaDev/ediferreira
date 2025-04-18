'use client'
import React from 'react'

import Button from './Button'
import ModalEmail from './ModalEmail';

interface PropsEbooks {
  contentDB: ContentDB | null
}

const Ebooks = ({contentDB}: PropsEbooks) => {
  const [openModalEmail, setOpenModalEmail] = React.useState(false);
  const [ebookDownloadLink, setEbookDownloadLink] = React.useState('');

  function handleEbookButton(downloadLink: string) {
    setEbookDownloadLink(downloadLink)
    setOpenModalEmail(true)
  }

  return (
    <section id='ebooks'>
      {openModalEmail && ebookDownloadLink.length > 0 && <ModalEmail
        downloadLink={ebookDownloadLink}
        setOpenModalEmail={setOpenModalEmail}
      />}
      {contentDB?.guides.title && <h2>{contentDB.guides.title}</h2>}
      {contentDB?.guides.subtitle && <p>{contentDB.guides.subtitle}</p>}
      {contentDB && Object.keys(contentDB.guides.ebooks).map(ebookId =>
        <React.Fragment key={contentDB.guides.ebooks[ebookId].id}>
          <Button
            label={contentDB.guides.ebooks[ebookId].downloadButtonText}
            className='mt-5'
            onClick={() => handleEbookButton(contentDB.guides.ebooks[ebookId].downloadLink)}
          />
        </React.Fragment>
      )}
    </section>
  )
}

export default Ebooks