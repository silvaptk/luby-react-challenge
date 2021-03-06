# Teste para vaga de estágio de *front-end* em React na empresa LabLuby

## Considerações iniciais

Este repositório foi criado com o objetivo de possibilitar a avaliação da empresa sobre o desenvolvimento de teste para vaga de estágio em desenvolvimento *front-end* com React, para a empresa LabLuby.

## Sobre o projeto

Este projeto é uma PWA (*Progressive Web Application*) com base na API do GitHub. O usuário insere o *login* do GitHub na página inicial e os dados relacionados ao *login* são armazenados na aplicação.

### A página principal (*Home*)

A página principal exibe as principais informações do usuário: *login*, nome, e-mail, localização, quantidade de repositórios, de seguidores e de pessoas que segue. Ela também concede acesso a todas as outras páginas da aplicação.

### A página de repositórios (*Repos*)

A página de repositórios exibe dados (nome, descrição, quantidade de usuários que favoritam o repositório) dos 30 primeiros repositórios, de acordo com ordem alfabética, do usuário em questão. 

### A página de seguidores (*Followers*) e de usuários que são seguidos (*Following*)

As páginas de seguidores (*Followers*) e de usuários que o usuário atual segue (*Following*) listam o avatar e o *login* dos 30 primeiros seguidores do usuário, em ordem alfabética. É possível clicar sobre cada um dos usuários listados, para ser redirecionado à página que descreve as informações deste.

## Sobre o desenvolvimento

O projeto foi desenvolvido em 

- [React](https://pt-br.reactjs.org/) para construção da interface de usuário, 
- [Redux](https://redux.js.org/) para persistir os dados da aplicação,
- [Sass](https://sass-lang.com/) para estilizar as páginas,
- e a [API do GitHub](https://docs.github.com/pt/rest). 

Para iniciar o desenvolvimento, utilizei o comando 

```
npx create-react-app pwa-github --template redux
```

que instala os módulos essenciais. Também foi necessário utilizar o módulo `react-router-dom` para possibilitar a mudança entre as páginas. Por fim, para que as transições entre as páginas ocorressem de forma mais suave, utilizei o móduo `react-transition-group`.

## Testando o projeto

Para que o projeto funcione, é preciso ter o `node` e o `npm` instalados, e também o `create-react-app`. Depois, basta fazer o *download* desse repositório, navegar até ele utilizando o terminal e, por fim, executar `npm install`. As dependências do projeto serão baixadas e ficarão armazenadas no diretório `node_modules`. Depois, basta executar `npm start` para que o projeto seja iniciado no navegador.

## Considerações finais

Agradecimentos à equipe LabLuby pela oportunidade de realizar o teste. Desde já, disponível para qualquer contato via LinkedIn (https://linkedin.com/in/silvaptk) e via e-mail (patrick.silva2717@outlook.com).
