const { app } = require('../../database/conn');

module.exports = app.post('/users', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO user (name, email, password, status, permissionId) VALUES (?, ?, ?, ?, ?);`,
      [req.body.name, req.body.email, req.body.password, true, req.body.permissionId]);

    // if (!rows)
    //   return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
