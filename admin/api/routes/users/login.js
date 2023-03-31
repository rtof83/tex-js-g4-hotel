const { app } = require("../../database/conn");
const bcrypt = require("bcrypt");
const generateToken = require("../../config/jwt.config");

const User = require("../../models/User");

exports.module = app.post("/users/login", async (req, res) => {
  try {
    // user by email
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user)
      return res.status(401).json({ message: "email or password not valid" });

    if (await bcrypt.compare(req.body.password, user.password)) {
      delete user.dataValues.password;
      const token = generateToken(user);

      return res
        .status(200)
        .json({ token: token, user: { ...user.dataValues } });
    } else {
      return res.status(401).json({ message: "email or password not valid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
