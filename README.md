# Edi Ferreira
#### _Designer de Interiores e Lighting Design_
Site da designer de interiores Edi Ferreira, desenvolvido com a biblioteca React, com o objetivo de captar possíveis clientes, que façam buscas sobre design no Google. O projeto foi feito como uma *Landing-Page*, mas possui algumas páginas para mostrar os detalhes de cada trabalho da designer. Também foi feita uma página de administração para modificar os conteúdos do site, com um Content Management System (CMS).

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black) ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

## Descrição
O projeto é uma *Single-Page Application* feita com componentes **React** e estilizados com [TailwindCSS](https://tailwindcss.com/). O **TypeScript** foi utilizado para declarar os tipos das variáveis **JavaScript** e dos objetos armazenados no banco de dados.

Foi utilizado o framework [NextJS](https://nextjs.org/) para criar o projeto e atender às novas recomendações da documentação do [React](https://react.dev/learn/start-a-new-react-project). O *NextJs* também ofereceu outros recursos extras, que o *React* puro não possui, como a renderização do lado do servidor (Server-Side Rendering - SSR).

As informações dos projetos foram salvas em um banco de dados do [Firebase](https://firebase.google.com/?hl=pt-br), desse modo não será necessário fazer um novo deploy do site, toda vez que a cliente quiser cadastrar um projeto novo.

<img src="./src/assets/animation.gif" alt="gif"/>

## Instruções
A primeira sessão **Vídeo** mostra um vídeo com alguns trabalhos da designer. O *Header* da página some quando o visitante rola a página para baixo e reaparece quando rola a página para cima.

A segunda sessão **Serviços** mostra um link de atalho para acessar a página de projetos, para que o usuário veja os produtos que são entregues pela designer e veja alguns projetos.

A terceira sessão **Projetos** exibe um carroçel de imagens, com uma imagem de cada trabalho feito pela designer. Ao clicar na foto, o usuário é redirecionado para a página desse projeto específico, para mostrar mais detalhes e imagens do mesmo.

A quarta sessão **Sobre** possui um breve resumo sobre a formação da designer e um link que redireciona o usuário para outra página, onde é exibida uma foto da designer e mais detalhes sobre a sua história.

A quinta e última sessão **Contato** mostra um link para acessar o Instagram, o Whatsapp e o e-mail para contato.

> Caso você seja um desenvolvedor, use as instruções abaixo para instalar as dependências e sugerir alterações para a aplicação.

É possível verificar o conteúdo de cada versão, selecionando a *branch* específica e o histórico de [commits].

Após baixar o projeto deste repositório, dentro do diretório do projeto você deve usar o comando `npm install` em um terminal, para gerar a pasta **node_modules**.
```sh
npm install
```
Concluída a instalação das dependências do projeto, use o comando `npm run dev` para visualizar a aplicação na porta [localhost:3000](http://localhost:3000).
```sh
npm run dev
```
A página irá recarregar a cada alteração feita no código e mostrará eventuais erros no console.

É recomendado que você use o comando `npm run build` antes de fazer um *commit*, para verficar a ocorrência de erros na aplicação e garantir o deploy da aplicação.
```sh
npm run build
```

## Histórico de versões

Clique nas versões abaixo, para observar a evolução do projeto ao longo do tempo.

| Versão | Update |
| ------ | ------ |
| [Versão 0.0](https://ediferreira-c1dscw9on-pedropaivadev.vercel.app/) | Primeira versão do projeto, apresentada para a designer no dia 08 de Setembro 2023, quando foram solicitados alguns ajustes a serem feitos. |
| [Versão 0.1](https://ediferreira-git-v01-pedropaivadev.vercel.app/) | A página 'projetos' foi desenvolvida, para mostrar os serviços prestados pela designer. Também foi adicionada a página 'sobre' para reduzir a quantidade de texto na página 'home'. Foi utilizada a API do Instgram para mostrar no site, os últimos três posts do Instagram da designer. Esta versão foi apresentada dia 14 de Setembro. |
| [Versão 0.2](https://ediferreira-git-v02-pedropaivadev.vercel.app/) | Pequena modificação na sessão 'serviços' solicitada no dia 15 de Setembro, onde foram adicionados alguns parágrafos de texto. Essa versão foi aprovada e dado início à página 'admin'. |
| [Versão 0.3](https://ediferreira-git-v03-pedropaivadev.vercel.app/) | Esta versão foi iniciada no dia 25 de Setembro, para inserir a Logo definitiva e definir sua posição. A designer também optou por remover o vídeo da primeira sessão da Home, já que a resolução dele estava ruim na tela do computador e ela não tinha nenhum vídeo gravado na horizontal. No dia 27 de Setembro foram solicitadas mais altereções no cabeçalho do site. |
| [Versão 0.4](https://ediferreira-git-v04-pedropaivadev.vercel.app/) | Versão definitiva do Layout do site, apresentada e aprovada no dia 29 de Setembro. A logo ficou apenas no cabeçalho e os atalhos de navegação ficam sempre visíveis no cabeçalho do site. |
| [Administrativa](https://ediferreira-git-admin-pedropaivadev.vercel.app/) | Adicionada a página de administração do site, para permitir a edição dos conteúdos do site diretamente pelo browser. Aqui também foi adicionado um botão fixo na tela, para que o usuário possa entrar em contato pelo Whatsapp. |

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[commits]: <https://github.com/PedroPaivaDev/ediferreira/commits/main>