const { app } = require('../../database/conn');

const Coupon = require('../../models/Coupon');

module.exports = app.get('/coupons/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ where: { code: req.params.code } });

    if (!coupon)
      return res.status(404).json({ message: 'Record not found!' });

    const result = {
      id: coupon.id,
      code: coupon.code,
      discount: coupon.discount
    };

    if (!coupon.expired)
      res.status(200).json(result)
    else
      res.status(400).json({ message: `coupon ${coupon.code} has expired` })
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
