const { app, conn } = require("../../database/conn");

module.exports = app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // validação do req.params.id em ser apenas números
    if (!id.match(/^[0-9]*$/)) {
      return res.status(400).json({ message: "Just numbers, please!" });
    }

    // uso de 'mysql.escape()' para evitar ataques de SQL injection
    const sql =
      `SELECT * , "" as password FROM users WHERE id = ` + conn.escape(id);
    const [user] = await conn.query(sql);

    if (!user) return res.status(422).json({ message: "User not found!" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
