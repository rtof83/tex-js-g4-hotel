const { app } = require('../../database/conn');

module.exports = app.post('/reservations/coupons', async (req, res) => {
  try {
    const code = require('../../services/createCode')();

    await global.connection.query(`INSERT INTO coupon (code, date, expired, discount) VALUES (?, ?, ?, ?);`,
      [code, req.body.date, false, req.body.discount])
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
