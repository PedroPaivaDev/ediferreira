import React from 'react';
import Slider from './Slider';

import { ContentDBContext } from '@/contexts/ContentDBContext';

const Projects = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <section id="Projetos"
      className="bg-mood-light flex flex-col gap-5"
    >
      <h2>Projetos</h2>
      <p>Uma das experiências mais emocionantes da vida é vivenciar o sonho da moradia própria.</p>
      {contentDB && <Slider projects={contentDB?.projects}/>}
      <p>Nosso objetivo é ajudar na tomada de decisões para agregar valor ao imóvel, nesta fase um layout bem resolvido é fundamental para sucesso do projeto de interiores e permitir que a integração dos das pessoas junto aos elementos arquitetônicos ocorram da forma mais fluida possível.</p>
      <p>Após essa etapa que requer mais detalhes técnicos e funcionais, acredite, somos criativos, acompanhamos as tendências e novidades do setor para deixar seu espaço otimizado, personalizado, iluminado, automatizado e aconchegante.</p>
    </section>
  )
}

export default Projects;