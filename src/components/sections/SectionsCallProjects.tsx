import React from 'react'
import Link from 'next/link'

import { getContentDB } from '@/services/firebase'

const SectionCallProjects = () => {
  {
    return (
      <>
        {getContentDB().then(contentDB => {
          if (!contentDB) return <></>;
          return (
            <section className='bg-mood-secondary text-mood-light'>
              <p className="mt-4">{contentDB.home.callProjects}</p>
              <Link href='/projetos' className="text-mood-tertiary hover:text-mood-light duration-300">Saiba Mais</Link>
            </section>
          )
        })}
      </>
    )
  }
}

export default SectionCallProjects