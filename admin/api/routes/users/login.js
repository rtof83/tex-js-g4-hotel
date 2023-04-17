const { app } = require("../../database/conn");
const bcrypt = require("bcrypt");
const generateToken = require("../../config/jwt.config");

const User = require("../../models/User");

exports.module = app.post("/users/login", async (req, res) => {
  try {
    // validação do req.body.email
    if (
      !req.body.email ||
      !req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      return res.status(400).json({
        message: "email format not valid",
      });
    }

    // validação do req.body.password
    if (
      !req.body.password ||
      !req.body.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,15}$/
      )
    ) {
      return res.status(400).json({
        message: "password format no valid",
      });
    }

    // user by email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user)
      return res.status(401).json({ message: "email or password not valid" });

    // checar se usuário foi deletado anteriormente e reverte o soft delete
    if (user.isActive === false) {
      await user.update({ deletedAt: null, isActive: true });
    }

    // checar se a senha está correta
    if (await bcrypt.compare(req.body.password, user.password)) {
      await user.update({ lastLogin: Date.now() });

      delete user.dataValues.password;
      // gerar o token
      const token = generateToken(user);

      return res
        .status(200)
        .json({ token: token, user: { ...user.dataValues } });
    } else {
      return res.status(401).json({ message: "email or password not valid" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
});
