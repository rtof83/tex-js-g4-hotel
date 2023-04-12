const { app } = require("../../database/conn");

const Reservation = require("../../models/Reservation");
const Accommodation = require("../../models/Accommodation");
const User = require("../../models/User");
const Coupon = require("../../models/Coupon");

module.exports = app.get("/reservations/user/:user", async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.params.user },
      include: [
        {
          model: Accommodation,
          attributes: ["name", "image"],
        },
        {
          model: User,
          attributes: ["name", "email"],
        },
        {
          model: Coupon,
          attributes: ["code"],
        },
      ],
    });

    if (!reservations)
      return res.status(422).json({ message: "Record not found!" });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
