import React from 'react'
import Link from 'next/link'

import { getContentDB } from '@/services/firebase'

const SectionCallAbout = () => {
  {
    return (
      <>
        {getContentDB().then(contentDB => {
          if (!contentDB) return <></>;
          return (
            <section id="Sobre" className="bg-mood-secondary text-mood-light">
              <p className="mt-4">{contentDB.home.callAbout}</p>
              <Link href='/sobre' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
            </section>
          )
        })}
      </>
    )
  }
}

export default SectionCallAbout