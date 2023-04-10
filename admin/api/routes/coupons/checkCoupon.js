const { app } = require('../../database/conn');
// const checkAdmin = require('../../middlewares/checkAdmin');

const Coupon = require('../../models/Coupon');

module.exports = app.get('/coupons/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findAll({ where: { code: req.params.code } });

    if (!coupon.length)
      return res.status(404).json({ message: 'Record not found!' });

    if (!coupon.expired)
      res.status(200).json({ message: `coupon ${coupon[0].code} is valid` })
    else
      res.status(400).json({ message: `coupon ${coupon[0].code} has expired` })
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
