const { app } = require('../../database/conn');
const Accommodation = require('../../models/Accommodation');

module.exports = app.get('/accommodations', async (_, res) => {
  try {
    const result = await Accommodation.findAll();

  if (!result)
    return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
