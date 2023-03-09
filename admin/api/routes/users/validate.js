const { app } = require('../../database/conn');

module.exports = app.post('/users/validate', async (req, res) => {
  try {
    const { error, decoded } = require('../../middlewares/checkValidate')(req);
      
    if (error) res.status(401).json({ message: 'invalid token' });
    if (decoded) res.status(200).json(decoded);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  };
});
