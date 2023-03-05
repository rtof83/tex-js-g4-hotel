const { app } = require('../database/conn');
const checkAdmin = require('../middlewares/checkAdmin');

const updateRecord = (path, table) => {
  app.put(`${path}/:id`, checkAdmin, async (req, res) => {
    try {
      const [rows] = await global.connection.query(`SELECT * FROM ${table} WHERE id = ${req.params.id}`);

      if (!rows.length)
        return res.status(422).json({ message: 'Record not found!' });

      let query = '';
      Object.keys(req.body).forEach((key, index) => {
        if (key !== 'userId') {
          query += `${key} = "${req.body[key]}"`;

          if (Object.keys(req.body).length-1 > index)
            query += ', ';
        };
      })

      await global.connection.query(`UPDATE ${table} SET ${query} WHERE id = ${req.params.id}`);
        
      res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = updateRecord;
