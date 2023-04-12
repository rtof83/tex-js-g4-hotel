const { app } = require("../../database/conn");

const Reservation = require("../../models/Reservation");
const Accommodation = require("../../models/Accommodation");
const User = require("../../models/User");
const Coupon = require("../../models/Coupon");

module.exports = app.get("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findAll({
      where: { id: req.params.id },
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

    if (!reservation)
      return res.status(422).json({ message: "Record not found!" });

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
