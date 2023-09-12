import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

const Services = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <section className='bg-mood-secondary text-mood-light gap-5'>
      <h2>Serviços</h2>
      {contentDB && Object.keys(contentDB.services).map(type =>
        <div key={contentDB.services[type].id} className='
          w-full max-w-2xl border-solid border-mood-tertiary p-5
          flex flex-col justify-center items-start
        '>
          <h3 className='font-bold'>{contentDB.services[type].subtitle}</h3>
          <ul className='flex flex-col justify-center items-start max-w-[900px] mt-3 gap-3'>
          {contentDB.services[type].items.map(item =>
            <li className='relative text-left list-item ml-5' key={item}>
              {item}
            </li>
          )}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Services;