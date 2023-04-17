const { app } = require("../../database/conn");

const Reservation = require("../../models/Reservation");
const Accommodation = require("../../models/Accommodation");
const User = require("../../models/User");
const Review = require("../../models/Review");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = app.get("/reviews/accommodation/:accommodationId", async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { accommodationId: req.params.accommodationId, reviewId: { [Op.not]: null }},
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
  };
});
