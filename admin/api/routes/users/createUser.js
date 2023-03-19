const { app } = require('../../database/conn');

const User = require('../../models/User');

module.exports = app.post('/users', async (req, res) => {
  try {
    req.body.password = await require('./hashPassword')(req.body.password);

    await User.create(req.body);

    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
