const { app, conn } = require('../../database/conn');

module.exports = app.get('/accommodations/:id', async (req, res) => {
  try {
    const [accommodation] = await conn.query(`SELECT * FROM accommodation WHERE id = ${req.params.id}`);

    if (!accommodation)
      return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
