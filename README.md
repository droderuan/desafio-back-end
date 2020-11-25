# Desafio para estágio - Back-End

Projeto desenvolvido para um desafio de estágio. Consistia em back-end de operações CRUD e upload de arquivo.

## Dependências:
* Banco de dados: [MongoDB](https://www.mongodb.com/)
* ORM: [Mongoose](https://mongoosejs.com/)
* Upload: [Amazon S3](https://aws.amazon.com/pt/s3/)
* Validação de requisições: [Celebrate](https://github.com/arb/celebrate)

### Como executar
Faça o clone do repositório e instale todas as dependências.

Com yarn:
```
git clone https://github.com/droderuan/desafio-back-end.git && cd desafio-back-end && yarn add
```
Com npm: 
```
git clone https://github.com/droderuan/desafio-back-end.git && cd desafio-back-end && npm install
```

#### Crie um arquivo **.env** na raiz do projeto e siga o exemplo do arquivo **.env.example**

Por fim execute `yarn dev:server` ou `npm run dev:server` e se tudo ocorreu bem, o projeto deverá rodar em **localhost:3333**.

### Rotas
Para acessar as rotas, isntalle o [Insomnia](https://insomnia.rest/) e depois clique no botão
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=API%20Tractian%20desafio&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdroderuan%2Ftractian-desafio%2Fmaster%2Fapi_insomnia.json)
