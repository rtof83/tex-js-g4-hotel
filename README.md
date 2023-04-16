
#  Atlantic Hotel

## Projeto final do curso de Full Stack Javascript Developer da Technology Experts. Tem como objetivo criar e gerenciar um site de hotel fictício, através de cadastro, criação de reservas e avaliação de quartos por parte do usuário e gerenciamento de quartos, banners, cupons e formulários de contato por parte do administrador.

&nbsp;

## Conteúdo
- [Construção](#construção)
- [Instalação e Inicialização](#instalação-e-inicialização)
- [Configurações](#configurações)
- [Estrutura da Base de Dados](#estrutura-da-base-de-dados)
- [Implementações API](#implementações-api)
- [Desenvolvido por](#desenvolvido-por)

&nbsp;

## Construção:

| Recursos          |                                  |
| ----------------- | -------------------------------- |
| `API`             | Node                             |
| `WEB`             | Vue 3                            |
| `Estilização`     | Sass                             |
| `Base de Dados`   | MySQL e MongoDB                  |
| `ORM`             | Sequelize                        |
| `Ferramentas`     | Visual Studio Code 1.75.1        |
|                   | HeidiSQL e MySQLWorkbench        |
|                   | Postman e Insomnia               |

&nbsp;

## Instalação e Inicialização:

-  (/admin/api):
    - npm install;
    - npm start;

-  (/):
    - npm install;
    - npm run serve;

- porta padrão API: 3000;

- porta padrão WEB: 8080;

- ### a aplicação pode ser acessada através dos links:
  - WEB (armazenado em instância Amazon S3):
    - http://to-do-list-node-vue.s3-website-us-east-1.amazonaws.com

  - API (instanciada em EC2 AWS):
    - http://34.235.89.154:3005

  - Base de Dados instanciada em RDS:
    - database.c4gffxjofhme.us-east-1.rds.amazonaws.com:3306;

&nbsp;

## Configurações

- [WEB - conexão com a API](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/src/store/api.js);

- [ENV - variáveis de ambiente - configuração inicial](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/.env.example) <strong>(antes da inicialização, deve ser renomeado para .env):</strong>

  exemplo de configuração:

  ```javascript
  APP_PORT = 3000

  DB_NAME = name          |
  DB_USER = user          | 
  DB_PASS = password      |
  DB_DIALECT  =  mysql    | --> parâmetros base de dados mySQL
  DB_PORT = 3306          |
  DB_HOST  =  localhost   | 
 
  MDB_USER  =  user       |
  MDB_PASS  =  password   | 
  MDB_CLUSTER  =  cluster | --> parâmetros base de dados MongoDB
  MDB_URL  =  url         | 
  MDB_NAME  =  name       |
         
  SECRET  =  secret_word  |  
  TIMEOUT  =  600000      |    

&nbsp;

## Estrutura da Base de Dados:

- [Quartos;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Accommodation.js)

- [Endereço;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Address.js)

- [Banner;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Banner.js)

- [Usuário;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/User.js)

- [Contato;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Contact.js)

- [Cupom;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Coupon.js)

- [Permissão;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Permission.js)

- [Reserva;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Reservation.js)

- [Comentários;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Review.js)

- [Serviços Adicionais;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/models/Service.js)

&nbsp;

## Implementações API:

- [Collections Postman;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/samples/hotel.postman_collection.json);

- [Estrutura base de dados;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/database/model/script.sql);

- [Model base de dados;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/database/model/DB_hotel.mwb);

- [Rotas de acesso;](https://github.com/rtof83/tex-js-grupo4-final/blob/dev/admin/api/index.js);

- [Middlewares:](https://github.com/rtof83/tex-js-grupo4-final/tree/dev/admin/api/middlewares)

  - isAuth:
    - verifica se quem está fazendo a requisição está enviando o token de autenticação que foi criado pela nossa aplicação ;
  
  - checkAdmin:
    - verifica se quem está fazendo a requisição possui permissão de admin;

  - checkValidate:
    - verifica se quem está fazendo a requisição está enviando um token de autenticação válido;  
 

&nbsp;

- [Serviços:](https://github.com/rtof83/tex-js-grupo4-final/tree/dev/admin/api/services)

  - initialAdmin:
    - ao iniciar a aplicação, gera um usuário com permissão admin automaticamente, caso não haja nenhum;

  - hashPassword:
    - criptografa a senha do usuário no momento do cadastro;

&nbsp;

## Desenvolvido por:
- [Renato Tadeu;](https://github.com/rtof83)
- [Maurício Oliveira Alves;](https://github.com/mauricio-alves)
- [Leonardo Bernardo](https://github.com/L-Bernardo)

Se quiser saber mais sobre nós e esse projeto, acesse o  [link da apresentação](https://docs.google.com/presentation/d/12AroSm4YYZ2jrKXBzxyCUIlyw9ipJx4nond_gP05a_0/edit#slide=id.p).

Desenvolvido apenas para fins educacionais.