'use client'
import React from "react";

import { HeaderViewContext } from "@/contexts/HeaderViewContext";
import { getData } from "@/services/firebase";
import Image from "next/image";

export default function Home() {
  const {handleScroll} = React.useContext(HeaderViewContext);
  const [contentDB, setContentDB] = React.useState<ContentDB|null>(null);

  React.useEffect(() => {
    getData<ContentDB|null>('content', setContentDB);
  },[]);

  return (
    <main onScroll={(e) => handleScroll(e)}>
      <section className="
        h-screen bg-[url(../assets/sala.jpeg)] bg-cover bg-center
        flex shrink-0 flex-col justify-end items-center gap-1
      ">
        <h1 className="text-mood-light">Edi Ferreira</h1>
        <h3 className="text-mood-light">Designer de Interiores</h3>
      </section>
      <section id="Sobre" className="bg-mood-secondary gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-5 max-w-[900px]">
          {contentDB && <Image
            src={contentDB?.home.photoEdi} alt="Foto Designer Edi"
            width={180} height={128} 
          />}
          <div className={`
            w-60 h-60 rounded-full col-span-3
            bg-[url(../assets/sobre-fot1.jpeg)] bg-cover bg-center
          `}/>
          <div className="flex flex-col flex-1 gap-5">
            <p className="text-mood-light text-justify">
              Sou Designer de Interiores e Lignting Designer, com formação em 2008 e pós graduação em 2012 pelo Centro Universitário Belas Artes.
            </p>
            <p className="text-mood-light text-justify">
              Após percorrer muitos caminhos com projetos pessoais, chalés para locação e trocar experiências em uma sociedade com escritório de arquitetura, nasceu Edi Ferreira Designer.
            </p>
            <p className="text-mood-light text-justify">
              Sempre tive verdadeiro apreço pelo sentido implícito do “morar”, entendo que a “CASA”, vai além da construção visível, representa memórias afetivas, proteção, aconchego e funciona como um alicerce entre o mundo externo e interno do ser humano.
            </p>
            <p className="text-mood-light text-justify">
              Dito isto, conte com a minha ajuda para otimizar seu espaço, criar ambientes funcionais, aconchegantes e que expressem a identidade e o estilo de vida de cada cliente.
            </p>
          </div>
        </div>
      </section>
      <section id="Projetos" className="bg-mood-light flex flex-col gap-5">
        <h2>Projetos</h2>
        <p>Uma das experiências mais emocionantes da vida é vivenciar o sonho da moradia própria.</p>
        <p>Nosso objetivo é ajudar na tomada de decisões para agregar valor ao imóvel, nesta fase um layout bem resolvido é fundamental para sucesso do projeto de interiores e permitir que a integração dos das pessoas junto aos elementos arquitetônicos ocorram da forma mais fluida possível.</p>
        <p>Após essa etapa que requer mais detalhes técnicos e funcionais, acredite, somos criativos, acompanhamos as tendências e novidades do setor para deixar seu espaço otimizado, personalizado, iluminado, automatizado e aconchegante.</p>
      </section>
      <section id="Contato" className="bg-mood-tertiary text-mood-light">
        <h2>Contatos</h2>
        <p>Instagram e Whatsapp</p>
      </section>
    </main>
  )
}
