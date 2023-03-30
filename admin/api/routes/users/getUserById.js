const { app, conn } = require("../../database/conn");

module.exports = app.get("/users/:id", async (req, res) => {
  try {
    const [user] = await conn.query(
      `SELECT * , "" as password FROM users WHERE id = ${req.params.id}`
    );

    if (!user) return res.status(422).json({ message: "User not found!" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
