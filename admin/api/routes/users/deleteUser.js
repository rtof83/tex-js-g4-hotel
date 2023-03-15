const { app } = require("../../database/conn");

module.exports = app.delete("/users/:id", async (req, res) => {
  try {
    const [rows] = await global.connection.query(
      `SELECT * FROM user WHERE id = ${req.params.id}`
    );

    if (!rows.length)
      return res.status(422).json({ message: "User not found!" });

    await global.connection.query(
      `DELETE FROM user WHERE id = ${req.params.id}`
    );

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
