import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

const Services = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <section className='bg-mood-secondary text-mood-light gap-5'>
      <h2>Por que contratar nossos serviços?</h2>
      {contentDB && <div className='max-w-2xl flex flex-col justify-center items-center gap-5'>
        <p>{contentDB.about.servicesText.firstParagraph}</p>
        <p>{contentDB.about.servicesText.secondParagraph}</p>
        <p>{contentDB.about.servicesText.thirdParagraph}</p>
      </div>}
      {contentDB && Object.keys(contentDB.services).map(type =>
        <div key={contentDB.services[type].id} className='
          w-full max-w-2xl border-solid border-mood-tertiary p-5
          flex flex-col justify-center items-start rounded-lg
        '>
          <h3 className='font-bold'>{contentDB.services[type].subtitle}</h3>
          <ul className='flex flex-col justify-center items-start max-w-[900px] mt-3 gap-3'>
          {Object.keys(contentDB.services[type].products).map(item =>
            <li className='relative text-left list-item ml-5' key={item}>
              {contentDB.services[type].products[item]}
            </li>
          )}
          </ul>
        </div>
      )}
    </section>
  )
}

export default Services;