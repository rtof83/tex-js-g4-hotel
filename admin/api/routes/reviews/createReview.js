const { app } = require('../../database/conn');

const Review = require('../../models/Review');
const Reservation = require('../../models/Reservation');

module.exports = app.post('/reviews', async (req, res) => {
  try {
    let lastId = null;
    await Review.create(req.body)
      .then(result => lastId = result.id);

    const reservation = await Reservation.findOne({ userId: req.body.userId, accommodationId: req.body.accommodationId });
    if (reservation)
      await reservation.update({ reviewId: lastId });

    return res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
});
