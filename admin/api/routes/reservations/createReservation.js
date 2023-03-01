const { app } = require('../../database/conn');

module.exports = app.post('/reservations', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO reservation (checkin, checkout, qty, createdAt, subTotal, total, accommodationId, userId, couponId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [req.body.checkin, req.body.checkout, req.body.qty, new Date(), req.body.subTotal, req.body.total, req.body.accommodationId, req.body.userId, req.body.couponId])
      .then(async () => await global.connection.query(`UPDATE accommodation SET status = true WHERE id = ${req.body.accommodationId}`))

    // if (!rows)
    //   return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
