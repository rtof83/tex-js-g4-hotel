const { app } = require('../../database/conn');

const Contact = require('../../models/Contact');

exports.module = app.post('/contacts', async (req, res) => {
  try {
    await Contact.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
