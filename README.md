# Elara - Assistente Virtual

* [Sobre](#sobre)
* [Configurando a aplicação](#configurando-a-aplicação)
    * [Intalando o Yarn (opcional)](#instalando-o-yarn-opcional)
    * [Instalando as dependências](#instalando-as-dependências)
    * [Criando as variáveveis de ambiente](#criando-as-variáveveis-de-ambiente)
    * [Utilizando o Prisma](#utilizando-o-prisma)
    * [Rodando a aplicação](#rodando-a-aplicação)
* [Outros repositórios](#outros-repositórios)
* [Colaboradores](#colaboradores)


## Sobre

Elara é uma assistente virtual com o intuito facilitar o dia a dia dos usuários através de uma plataforma organizacional e intuitiva, possibilitando realizar tarefas de formas simples através da voz, o principal objetivo desse projeto é desenvolver através das possibilidades e retina de um estudante, um assistente virtual, integrando diversas tecnologias e procedimentos para garantir o ciclo completo da informação.

Vale destacar que a aplicação é uma prova de conceito e muitas funcionalidades podem ser melhoradas para que ela seja mais completa e sua utilização mais intuitiva, sendo um projeto totalmente extensível e que pode ajudar várias pessoas no seu dia a dia.

## Configurando a aplicação
### Instalando o Yarn (opcional)

```bash
$ npm -g i yarn
```

### Instalando as dependências

Rode o seguinte comando para instalar as dependências do projeto:

```bash
$ npm install
# ou
$ yarn install
```

### Criando as variáveveis de ambiente

Essa aplicação necessita de algumas variáveis de ambiente para funcionar corretamente, portanto é necessário a criação de um arquivo ```.env``` na raiz do projeto ... Para isso basta cria-lo utilizando como base o arquivo ```.env.example```, substituindo somente os conteúdos das variáveis.

### Utilizando o Prisma

Para rodar a aplicação é necessário gerar as tabelas no banco de dados, para isso o [Prisma](https://www.prisma.io/) está sendo utilizado.

> A string de conexão deve estar no arquivo .env

> O banco utilizado deve ser o SQLite

Os comandos necessários são:
```bash
$ yarn prisma generate
$ yarn prisma db push

# ou

$ npx prisma generate
$ npx prisma db push
```

### Rodando a aplicação

Após realizar todas as etapas acima, já podemos iniciar a aplicação com o seguinte comando:

```bash
$ yarn run start

# ou

$ npm run start
```

## Outros repositórios

- [Elara - Transcript ](https://github.com/gcostacoelho/elara-transcripth)

- [Elara - Mobile](https://github.com/gcostacoelho/elara-mobile)

## Colaboradores

- [Fabricio Souza](https://github.com/Fabricio-SM)
- [Felipe Malengo](https://github.com/Irnyni)