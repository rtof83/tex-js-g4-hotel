const { app } = require("../../database/conn");
const isAuth = require("../../middlewares/isAuth");
const User = require("../../models/User");

module.exports = app.put("/users/:id", isAuth, async (req, res) => {
  try {
    // checagem se há tentativa de alterar o email
    if (req.body.email || req.body.email === "")
      return res.status(400).json({ message: "Can't change email" });

    // validação do req.body.password
    if (
      !req.body.password ||
      !req.body.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,15}$/
      )
    ) {
      return res.status(400).json({
        message:
          "Password must have between 8 to 15 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    // criptografia da senha
    req.body.password = await require("../../services/hashPassword")(
      req.body.password
    );

    // busca do usuário
    const result = await User.findByPk(req.params.id);

    if (!result) return res.status(422).json({ message: "User not found!" });

    // atualização do usuário
    await result.update(req.body);
    delete result.dataValues.password;

    // retorno do usuário atualizado (menos a senha)
    return res
      .status(200)
      .json({ message: "User updated successfully", result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
