const { app } = require('../database/conn');
const checkAdmin = require('../middlewares/checkAdmin');

const deleteRecord = (path, table) => {
  app.delete(`${path}/:id`, checkAdmin, async (req, res) => {
    try {
      const [rows] = await global.connection.query(`SELECT * FROM ${table} WHERE id = ${req.params.id}`);

      if (!rows.length)
        return res.status(422).json({ message: 'Record not found!' });

      await global.connection.query(`DELETE FROM ${table} WHERE id = ${req.params.id}`);
        
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  });
};

module.exports = deleteRecord;
