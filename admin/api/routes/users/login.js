const { app } = require('../../database/conn');
const bcrypt = require('bcrypt');

exports.module = app.post('/users/login', async (req, res) => {
  try {
    // user by email
    const [rows] = await global.connection.query(`SELECT * FROM user WHERE email = "${req.body.email}"`);

    if (!rows.length)
      return res.status(401).json({ message: 'email or password not valid' }); 

    if (!await bcrypt.compare(req.body.password, rows[0].password))
      return res.status(401).json({ message: 'email or password not valid' });

    res.status(200).json({ message: 'User logged in' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
