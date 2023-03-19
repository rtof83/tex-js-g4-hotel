const { app } = require('../../database/conn');

const Coupon = require('../../models/Coupon');

module.exports = app.post('/reservations/coupons', async (req, res) => {
  try {
    const code = require('../../services/createCode')();

    req.body.code = code;
    req.body.expired = false;

    await Coupon.create(req.body);
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
