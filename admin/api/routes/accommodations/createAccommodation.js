const { app } = require('../../database/conn');

module.exports = app.post('/accommodations', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO accommodation (name, image, description, price, status) VALUES (?, ?, ?, ?, ?);`,
      [req.body.name, req.body.image, req.body.description, req.body.price, false]);

    // if (!rows)
    //   return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
