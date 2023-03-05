// const Sequelize = require('sequelize');

const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');

require('dotenv').config();
app.use(express.json());
app.use(cors());

// mysql2
async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  app.listen(process.env.APP_PORT, () => 
    console.log(`listening on port ${process.env.APP_PORT}...`));

  console.log('Connection has been established successfully. (mysql2)');
  global.connection = connection;
  return connection;
};
// ===========================


// sequelize
// const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   dialect: process.env.DB_DIALECT,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT
// });
// ===========================


// (async () => {
//   await conn.sync();
// })();

// conn
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     app.listen(process.env.APP_PORT);
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });

// module.exports = { app, conn, connect };
module.exports = { app, connect };
