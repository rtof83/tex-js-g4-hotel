const { app, conn, connection } = require('../../database/conn');

// sequelize model
const Accommodation = require('../../models/Accommodation');

module.exports = app.get('/accommodations/:id', async (req, res) => {
  try {
    // const result = await Accommodation.findAll({ where: { id: req.params.id }});

    const result = connection.query('select * from accommodation where id = ' + req.params.id);

  if (!result)
    return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
