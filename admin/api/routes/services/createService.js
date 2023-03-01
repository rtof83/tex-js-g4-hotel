const { app } = require('../../database/conn');

module.exports = app.post('/services', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO service (name, image, detail, price) VALUES (?, ?, ?, ?);`,
      [req.body.name, req.body.image, req.body.detail, req.body.price])
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
