
#  Atlantic Hotel

## Projeto final do Curso Full Stack Javascript Developer da Technology Experts. Tem como objetivo gerenciar um site de hotel fictício, através de cadastro, criação de reservas e avaliação de quartos por parte do usuário e gerenciamento de quartos, banners, cupons e formulários de contato por parte do administrador.

&nbsp;

## Conteúdo
- [Construção](#construção)
- [Instalação e Inicialização](#instalação-e-inicialização)
- [Configurações](#configurações)
- [Estrutura da Base de Dados](#estrutura-da-base-de-dados)
- [Implementações API](#implementações-api)
- [Backlog](#backlog)
- [Desenvolvido por](#desenvolvido-por)

&nbsp;

## Construção:

| Recursos          |                                  |
| ----------------- | -------------------------------- |
| `API`             | Node 18                          |
| `WEB`             | Vue 3                            |
| `Estilização`     | Sass                             |
| `Base de Dados`   | MySQL e MongoDB                  |
| `ORM`             | Sequelize                        |
| `ODM`             | Mongoose                         |
| `Ferramentas`     | Visual Studio Code               |
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

- porta API: arquivo de configuração .env;

- porta padrão WEB: 8080;

- acesso web:
  - rota pública -> {baseURL}:{PORT}/#
  - rota admin -> {baseURL}:{PORT}/#/admin

- usuário padrão (admin):
  - email: admin@email.com
  - senha: Admin123@456

- ### a aplicação pode ser acessada através dos links:
  - WEB (armazenado em instância Amazon S3):
    - http://tex-js-grupo4.s3-website-us-east-1.amazonaws.com

  - API (instanciada em EC2 AWS):
    - http://3.92.70.204:3010

  - Base de Dados instanciada em RDS:
    - database.c4gffxjofhme.us-east-1.rds.amazonaws.com:3306;

&nbsp;

## Configurações

- [WEB - conexão com a API](https://github.com/rtof83/tex-js-grupo4-final/blob/main/src/store/api.js);

- [ENV - variáveis de ambiente - configuração inicial](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/.env.example) <strong>(antes da inicialização, deve ser renomeado para .env):</strong>

  exemplo de configuração:

  ```javascript
  APP_PORT     =  3000

  DB_NAME      =  name          |
  DB_USER      =  user          | 
  DB_PASS      =  password      |
  DB_DIALECT   =  mysql         | --> parâmetros base de dados mySQL
  DB_PORT      =  3306          |
  DB_HOST      =  localhost     | 
 
  MDB_USER     =  user         |
  MDB_PASS     =  password     | 
  MDB_CLUSTER  =  cluster      | --> parâmetros base de dados MongoDB
  MDB_URL      =  url          | 
  MDB_NAME     =  name         |
         
  SECRET       =  secret_word

&nbsp;

## Estrutura da Base de Dados:

- [Quartos;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Accommodation.js)

- [Endereço;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Address.js)

- [Banner;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Banner.js)

- [Usuário;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/User.js)

- [Contato;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Contact.js)

- [Cupom;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Coupon.js)

- [Permissão;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Permission.js)

- [Reserva;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Reservation.js)

- [Comentários;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Review.js)

- [Serviços Adicionais;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/models/Service.js)

&nbsp;

## Implementações API:

- [Collections Postman;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/samples/hotel.postman_collection.json)

- [Estrutura base de dados;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/database/model/hotel_db.sql)

- [Model base de dados;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/database/model/hotel_diagram.mwb)

- [Rotas de acesso;](https://github.com/rtof83/tex-js-grupo4-final/blob/main/admin/api/index.js)

- [Middlewares:](https://github.com/rtof83/tex-js-grupo4-final/tree/main/admin/api/middlewares)

  - isAuth:
    - verifica se quem está fazendo a requisição está enviando o token de autenticação que foi criado pela nossa aplicação;
  
  - checkAdmin:
    - verifica se quem está fazendo a requisição possui permissão de admin;

  - checkValidate:
    - verifica se quem está fazendo a requisição está enviando um token de autenticação válido;  
 

&nbsp;

- [Serviços:](https://github.com/rtof83/tex-js-grupo4-final/tree/main/admin/api/services)

  - initialAdmin:
    - ao iniciar a aplicação, gera um usuário com permissão admin automaticamente, caso não haja nenhum;

  - initialPermission:
    - ao iniciar a aplicação, gera as permissões "admin" e "user", caso não existam;

  - hashPassword:
    - criptografa a senha do usuário no momento do cadastro;

&nbsp;

## Backlog
- Relatório de consumo dinâmico;
- Atualização de reservas;
- Área Admin:
  - CRUD Serviços;
  - Responsividade para tela mobile;
- Usuários:
  - CRUD admin;
  - atualização de endereço;
- Alguns componentes apresentam instabilidade ao atualizar a página;
- Ampliar a utilização do campo deletedAt para toda base de dados;
- Integrar o componente de comentário da acomodação para a reserva;
- Implementar confirmação da reserva (admin) para liberação de outros recursos (controle de consumo, disponibilidade da acomodação);
- Adicionar paginação em listagens;
- Aprimorar integração entre tela de acomodações e reservas; 
- Rodapé:
  - Tornar funcional a opção de outros idiomas para o site;
  - Criar as seções "sobre nós" e "termos e condições";
- Home:
  - Criar as telas de "spa wellness", "gastronomia" e "experiências" da seção "conheça mais sobre nossos serviços";
  - Corrigir layout do componente banner para resoluções superiores a 1920 x 1080 pixels.

&nbsp;

## Desenvolvido por:
- [Renato Tadeu](https://github.com/rtof83)
- [Maurício Oliveira Alves](https://github.com/mauricio-alves)

&nbsp;

Se quiser saber mais sobre nós e esse projeto, acesse o  [link da apresentação](https://vimeo.com/824220389).

Desenvolvido para fins educacionais.
