import React from 'react';
import Image from 'next/image';

import { ContentDBContext } from '@/contexts/ContentDBContext';

const Sobre = () => {
  const contentDB = React.useContext(ContentDBContext);

  return (
    <section id="Sobre" className="bg-mood-light gap-5 text-mood-primary text-justify">
      <h2>Sobre</h2>
      {contentDB && <div className="flex flex-col sm:flex-row items-center gap-5 max-w-[900px]">
        <Image
          src={contentDB.home.photoEdi} alt="Foto Designer Edi"
          width={240} height={240}
          className="rounded-full col-span-3 object-cover h-60 shadow-lg"
        />
        <div className="flex flex-col flex-1 gap-5">
          <p>
            Sou Designer de Interiores e Lignting Designer, com formação em 2008 e pós graduação em 2012 pelo Centro Universitário Belas Artes.
          </p>
          <p>
            Após percorrer muitos caminhos com projetos pessoais, chalés para locação e trocar experiências em uma sociedade com escritório de arquitetura, nasceu Edi Ferreira Designer.
          </p>
          <p>
            Sempre tive verdadeiro apreço pelo sentido implícito do “morar”, entendo que a “CASA”, vai além da construção visível, representa memórias afetivas, proteção, aconchego e funciona como um alicerce entre o mundo externo e interno do ser humano.
          </p>
          <p>
            Dito isto, conte com a minha ajuda para otimizar seu espaço, criar ambientes funcionais, aconchegantes e que expressem a identidade e o estilo de vida de cada cliente.
          </p>
        </div>
      </div>}
    </section>
  )
}

export default Sobre