const { app } = require('../../database/conn');

const User = require('../../models/User');
const Address = require('../../models/Address');

module.exports = app.post('/users', async (req, res) => {
  try {
    req.body.password = await require('../../services/hashPassword')(req.body.password);

    let lastId = 0;
    await User.create(req.body)
      .then(result => lastId = result.id);

    if (req.body.address) {
      req.body.address.userId = lastId;
      await Address.create(req.body.address);
    };

    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
