const { app } = require('../../database/conn');

module.exports = app.post('/users/permissions', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO permission (type) VALUES (?);`, [req.body.type]);
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
