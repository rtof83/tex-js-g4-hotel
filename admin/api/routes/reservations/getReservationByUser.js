const { app, conn } = require('../../database/conn');

const Reservation = require('../../models/Reservation');

module.exports = app.get('/reservations/user/:user', async (req, res) => {
  try {
    const reservation = await Reservation.findAll({ where: { userId: req.params.user } });

    if (!reservation)
      return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
