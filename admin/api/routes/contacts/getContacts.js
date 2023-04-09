const { app } = require('../../database/conn');

const Contact = require('../../models/Contact');

exports.module = app.get('/contacts', async (_, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts)
      return res.status(404).json({ message: 'Record not found!' });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error });
  };
});
