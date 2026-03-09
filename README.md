<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Desafio Técnico: Centro Pokémon (Backend)

Bem-vindo ao repositório backend do **Centro Pokémon**. Este projeto foi inicializado utilizando [NestJS](https://nestjs.com/) e tem como objetivo fornecer uma API RESTful completa para um sistema de controle de Pokémons.

O sistema permite que treinadores ou pesquisadores autenticados operem um CRUD (Create, Read, Update, Delete) gerenciando os registros dos Pokémons, incluindo: Nome, Tipo, Nível, HP e Número da Pokédex. 

As informações de usuários e Pokémons são armazenadas em um banco de dados PostgreSQL, gerenciado pela ORM Prisma.

## Tecnologias Principais
- Node.js & NestJS
- Prisma ORM
- PostgreSQL
- TypeScript

## Requisitos Prévios
- Node.js (v18+)
- PostgreSQL rodando localmente (ou via Docker)
- Gerenciador de pacotes npm

## Configuração do Ambiente (Database)

1. Clone o repositório e navegue para o diretório `backend`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo de variáveis de ambiente:
   - Copie o arquivo `.env.example` fornecido e cole como um novo arquivo `.env`.
   - Modifique o `DATABASE_URL` no seu arquivo `.env` para corresponder às credenciais do seu banco de dados PostgreSQL. Exemplo:
     ```
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/centropokemon?schema=public"
     ```

4. Aplique a estrutura do banco de dados executando as migrations do Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Gere o Prisma Client:
   ```bash
   npx prisma generate
   ```

## Executando o servidor

```bash
# desenvolvimento padrão
$ npm run start

# modo watch (observando alterações)
$ npm run start:dev

# modo produção
$ npm run start:prod
```

## Testes Automatizados

O backend conta com uma suite de testes unitários (utilizando Jest e mocks avançados) cobrindo os casos de uso de Autenticação e as principais lógicas de negócio do CRUD de Pokémons.

Para rodar os testes, execute o seguinte comando:
```bash
$ npm run test
```

## Documentação Interativa (Swagger)

A API possui uma interface interativa (Swagger UI) para facilitar o teste das rotas.

Após iniciar o servidor (por padrão na porta `3000`), acesse a documentação no navegador:
👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

> **Nota de Autenticação**: Para testar rotas protegidas que exigem login, gere um token na rota `POST /auth/login` e insira clicando no botão verde **"Authorize"** no topo da página do Swagger.

## Arquitetura e Modelagem

Os modelos iniciais contêm:
- **User**: Para o controle da autenticação de Treinadores e Pesquisadores.
- **Pokemon**: O recurso principal que sofrerá as interações de CRUD.

## Licença

Este projeto é desenvolvido para uma avaliação técnica e segue como código aberto. NestJS é [MIT licensed](LICENSE).
