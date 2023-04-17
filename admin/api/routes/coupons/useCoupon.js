const { app } = require('../../database/conn');

const Coupon = require('../../models/Coupon');

module.exports = app.put('/coupons/use/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon)
      return res.status(404).json({ message: 'Record not found!' });

    await coupon.update({ expired: true });

    res.status(200).json({ message: `coupon ${coupon.code} is now expired` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
