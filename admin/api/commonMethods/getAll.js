const { app } = require('../database/conn');

const getAll = (path, table) => {
  app.get(path, async (_, res) => {
    try {
      const [rows] = await global.connection.query(`SELECT * FROM ${table}`);

    if (!rows)
      return res.status(422).json({ message: 'Record not found!' });
        
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = getAll;
