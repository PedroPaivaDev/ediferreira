import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import Slider from './Slider';

const Projects = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <section id="Projetos"
      className="bg-mood-light flex flex-col gap-5"
    >
      <h2>Projetos</h2>
      {contentDB && <>
        <p>{contentDB.about.projectsText.subtitle}</p>
        <Slider projects={contentDB.projects}/>
        <p>{contentDB.about.projectsText.description}</p>
      </>}
    </section>
  )
}

export default Projects;