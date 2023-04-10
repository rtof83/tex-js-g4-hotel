const { app } = require('../../database/conn');
const checkAdmin = require('../../middlewares/checkAdmin');

const Coupon = require('../../models/Coupon');

module.exports = app.put('/coupons/:code', checkAdmin, async (req, res) => {
  try {
    const coupon = await Coupon.findAll({ where: { code: req.params.code } });

    if (!coupon.length)
      return res.status(404).json({ message: 'Record not found!' });

    await coupon[0].update({ expired: true });

    res.status(200).json({ message: `coupon ${coupon[0].code} is now expired` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
