import React from 'react';
import Link from 'next/link';

import { ContentDBContext } from '@/contexts/ContentDBContext';
import objectBgImage from '@/helpers/objectBgImage';

import Slider from './Slider';
import P from './P';

const Projects = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <section id="Projetos"
      className="bg-mood-light gap-5"
    >
      <h2>Projetos</h2>
      {contentDB && <>
        <P>{contentDB.about.projectsText.subtitle}</P>
        <Slider projects={contentDB.projects} className='md:hidden'/>
        <div className='hidden md:flex gap-5 w-full'>
          {Object.keys(contentDB.projects).slice(0,4).map(projectId =>
              <Link 
                key={contentDB.projects[projectId].id}
                href={`projetos?projeto=${projectId}`}
                className='w-full rounded-md  h-[50vh] overflow-hidden hover:shadow-xl duration-300'
                  >
                <div
                  style={objectBgImage(contentDB.projects[projectId].mainPhoto)}
                  className={`
                    w-full h-full
                    shadow-blackShadowInsetBottom
                    flex flex-col justify-end items-center pb-5
                  `}
                >
                  <h3 className='text-mood-light text-normal font-normal'>
                    {contentDB.projects[projectId].name}
                  </h3>
                </div>
              </Link>
          )}
        </div>
        <P>{contentDB.about.projectsText.description}</P>
      </>}
    </section>
  )
}

export default Projects;