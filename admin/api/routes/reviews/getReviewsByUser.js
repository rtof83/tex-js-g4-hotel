const { app } = require("../../database/conn");

const Reservation = require("../../models/Reservation");
const Accommodation = require("../../models/Accommodation");
const User = require("../../models/User");
const Review = require("../../models/Review");

module.exports = app.get("/reviews/user/:userId", async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: Accommodation,
          attributes: ["name", "image"],
        },
        {
          model: User,
          attributes: ["email", "name"],
        },
        {
          model: Review,
          attributes: ["message", "rating"],
        }
      ],
    });

    if (!reservations)
      return res.status(422).json({ message: "Record not found!" });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
