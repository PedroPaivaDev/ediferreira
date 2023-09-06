'use client'
import React from "react";
import Image from "next/image";

import { HeaderViewContext } from "@/contexts/HeaderViewContext";
import { getData } from "@/services/firebase";

import Slider from "@/components/Slider";

export default function Home() {
  const {handleScroll} = React.useContext(HeaderViewContext);
  const [contentDB, setContentDB] = React.useState<ContentDB|null>(null);

  React.useEffect(() => {
    getData<ContentDB|null>('content', setContentDB);
  },[]);

  return (
    <main onScroll={(e) => handleScroll(e)}>
      <section id="home" className="
        flex shrink-0 flex-col justify-end items-center gap-1
        p-0 relative h-screen
      ">
        {contentDB?.home.bgVideo &&
          <video
            autoPlay loop muted playsInline preload="auto"
            className="w-full h-full object-cover absolute top-0 -z-10"
          >
            <source src={contentDB?.home.bgVideo} type="video/mp4"/>
          </video>
        }
        <h1 className="text-mood-light">Edi Ferreira</h1>
        <h3 className="text-mood-light mb-24">Designer de Interiores</h3>
      </section>
      <section id="Sobre" className="bg-mood-secondary gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-5 max-w-[900px]">
          {contentDB && <Image
            src={contentDB?.home.photoEdi} alt="Foto Designer Edi"
            width={240} height={240}
            className="rounded-full col-span-3 object-cover h-60"
          />}
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
        {contentDB && <Slider projects={contentDB?.projects}/>}
        <p>Nosso objetivo é ajudar na tomada de decisões para agregar valor ao imóvel, nesta fase um layout bem resolvido é fundamental para sucesso do projeto de interiores e permitir que a integração dos das pessoas junto aos elementos arquitetônicos ocorram da forma mais fluida possível.</p>
        <p>Após essa etapa que requer mais detalhes técnicos e funcionais, acredite, somos criativos, acompanhamos as tendências e novidades do setor para deixar seu espaço otimizado, personalizado, iluminado, automatizado e aconchegante.</p>
      </section>
      <section id="Contato" className="relative bg-mood-tertiary text-mood-light">
        <h2>Contatos</h2>
        <ul className='
          flex flex-col justify-center items-start gap-5
        '>
          <li>
            <a
              href={`https://www.instagram.com/ediferreiradesigner`} target="_blank"
              className="flex justify-center items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" viewBox="0 0 256 256"
                className='fill-mood-light hover:fill-mood-primary duration-300'
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
              </svg>
              Instagram
            </a>
          </li>
          <li>
            <a
              href={`https://api.whatsapp.com/send?phone=5511962530018`} target="_blank"
              className="flex justify-center items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" viewBox="0 0 256 256"
                className='fill-mood-light hover:fill-mood-primary duration-300'
              >
                <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
              </svg>
              Whatsapp
            </a>
          </li>
          <li>
            <a
              href={`mailto:contato.ediferreira@gmail.com`} target="_blank"
              className="flex justify-center items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                width="30" height="30" viewBox="0 0 256 256"                
                className='fill-mood-light hover:fill-mood-primary duration-300'
              >
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
              </svg>
              Email
            </a>
          </li>
        </ul>
        <a
          href={`https://pedropaiva.vercel.app`} target="_blank"
          className="absolute bottom-2 text-sm text-thin font-sans text-mood-quaternary"
        >
          Desenvolvido por PedroPaivaDev
        </a>
      </section>
    </main>
  )
}
