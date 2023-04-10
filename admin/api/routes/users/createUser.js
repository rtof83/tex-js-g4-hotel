const { app } = require("../../database/conn");

const User = require("../../models/User");
const Address = require("../../models/Address");

module.exports = app.post("/users", async (req, res) => {
  try {
    // checagem se email já existe no banco de dados
    const email = await User.findOne({ where: { email: req.body.email } });

    if (email)
      return res.status(401).json({ message: "email already exists!" });

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
        message:
          "Password must have between 8 to 15 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    // criptografia da senha
    req.body.password = await require("../../services/hashPassword")(
      req.body.password
    );

    // criação do usuário
    let lastId = 0;
    await User.create(req.body).then((result) => (lastId = result.id));

    // criação do endereço do usuário
    if (req.body.address) {
      req.body.address.userId = lastId;
      await Address.create(req.body.address);
    }

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
