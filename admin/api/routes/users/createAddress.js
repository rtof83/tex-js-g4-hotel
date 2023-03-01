const { app } = require('../../database/conn');

module.exports = app.post('/users/addresses', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO address (streetName, streetNumber, neighborhood, city, state, postalCode, userId) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [req.body.streetName, req.body.streetNumber, req.body.neighborhood, req.body.city, req.body.state, req.body.postalCode, req.body.userId]);

    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
