const { app } = require('../../database/conn');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = app.post('/users', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await global.connection.query(`INSERT INTO user (name, email, password, status, permissionId) VALUES (?, ?, ?, ?, ?);`,
      [req.body.name, req.body.email, hashedPassword, true, req.body.permissionId]);
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
