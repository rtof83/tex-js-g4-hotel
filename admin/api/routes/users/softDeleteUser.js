const { app } = require("../../database/conn");
const User = require("../../models/User");
const isAuth = require("../../middlewares/isAuth");

module.exports = app.delete(`/users/:id`, isAuth, async (req, res) => {
  try {
    const result = await User.findByPk(req.params.id);

    if (!result) return res.status(422).json({ message: "User not found!" });

    await result.update({ deletedAt: Date.now(), isActive: false });

    return res.status(200).json({ message: "User disabled successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
