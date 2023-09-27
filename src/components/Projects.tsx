import React from 'react';

import { ContentDBContext } from '@/contexts/ContentDBContext';

import Slider from './Slider';
import P from './P';

const Projects = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <section id="Projetos"
      className="bg-mood-light flex flex-col gap-5"
    >
      <h2>Projetos</h2>
      {contentDB && <>
        <P>{contentDB.about.projectsText.subtitle}</P>
        <Slider projects={contentDB.projects}/>
        <P>{contentDB.about.projectsText.description}</P>
      </>}
    </section>
  )
}

export default Projects;