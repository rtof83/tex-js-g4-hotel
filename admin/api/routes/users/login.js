const { app } = require('../../database/conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.module = app.post('/users/login', async (req, res) => {
  try {
    // user by email
    const [rows] = await global.connection.query(`SELECT U.id, U.name, U.email, U.password, U.status, P.type AS permission
                                                  FROM user U 
                                                  INNER JOIN permission P
                                                  ON U.permissionId = P.id
                                                  WHERE email = "${req.body.email}"`);

    if (!rows.length)
      return res.status(401).json({ message: 'email or password not valid' }); 

    if (!await bcrypt.compare(req.body.password, rows[0].password))
      return res.status(401).json({ message: 'email or password not valid' });

    // sign token
    const token = jwt.sign({ id: rows[0].id, permission: rows[0].permission },
                             process.env.SECRET,
                           { expiresIn: process.env.TIMEOUT });

    return res.json({ auth: true,
                      id: rows[0].id,
                      name: rows[0].name,
                      permission: rows[0].permission,
                      exp: Math.floor(Date.now() / 1000) + (process.env.TIMEOUT / 1000),
                      token });

    // res.status(200).json({ message: 'User logged in' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
