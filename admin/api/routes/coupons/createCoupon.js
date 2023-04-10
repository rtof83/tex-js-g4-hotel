const { app } = require('../../database/conn');
const checkAdmin = require('../../middlewares/checkAdmin');

const Coupon = require('../../models/Coupon');

module.exports = app.post('/coupons', checkAdmin, async (req, res) => {
  try {
    const coupon = {
      code: Math.random().toString(17).substring(7),
      date: Date.now(),
      expired: false,
      discount: req.body.discount ? req.body.discount : 0.1
    };

    await Coupon.create(coupon);

    return res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
});
