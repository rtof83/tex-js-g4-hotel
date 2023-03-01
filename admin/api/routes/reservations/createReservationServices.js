const { app } = require('../../database/conn');

module.exports = app.post('/reservations/services', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO reservationServices (reservationId, serviceId) VALUES (?, ?);`,
      [req.body.reservationId, req.body.serviceId])
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
