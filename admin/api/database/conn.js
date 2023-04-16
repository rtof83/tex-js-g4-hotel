const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
app.use(express.json());
app.use(cors());

// sequelize
const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

// mongoDB
const connMongo = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@${process.env.MDB_CLUSTER}.${process.env.MDB_URL}/${process.env.MDB_NAME}?retryWrites=true&w=majority`;

(async () => {
  await conn.sync();
})();

try {
  conn.authenticate()
    .then(() => console.log('MySQL connection has been established successfully.'));
  
  // mongoose.connect(connMongo)
  //   .then(() => console.log('MongoDB connection has been established successfully.'));
    // .then(() => console.log('MongoDB connection has been established successfully.'));

  app.listen(process.env.APP_PORT);
} catch (error) {
  console.log('Unable to connect to the database: ', error);
};

// conn
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     app.listen(process.env.APP_PORT);
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });

//   mongoose.connect(connMongo)
//     .then(() => {
//       console.log('mongoDB connected...');
//       // app.listen(process.env.PORT, () => 
//       //     console.log(`server listening on port ${process.env.PORT}...`));
//     })
//     .catch((error) => console.log(error));

module.exports = { app, conn };
