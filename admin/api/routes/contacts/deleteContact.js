const { app } = require('../../database/conn');
const checkAdmin = require("../../middlewares/checkAdmin");

const Contact = require('../../models/Contact');

exports.module = app.delete('/contacts/:id', checkAdmin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ message: 'Record not found!' });

    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
