const { app } = require('../../database/conn');

const Reservation = require('../../models/Reservation');
const ReservationServices = require('../../models/ReservationServices');

module.exports = app.post('/reservations', async (req, res) => {
  try {
    let lastId = 0;
    await Reservation.create(req.body)
      .then(result => lastId = result.id);

    if (req.body.services.length) {
      req.body.services.map(async (service) => {
        await ReservationServices.create({ reservationId: lastId, serviceId: service.id })
      });
    };
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
