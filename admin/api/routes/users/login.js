const { app } = require('../../database/conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

exports.module = app.post('/users/login', async (req, res) => {
  try {
    // user by email   
    const user = await User.findAll({ where: { email: req.body.email }});

    if (!user.length)
      return res.status(401).json({ message: 'email or password not valid' });

    if (!await bcrypt.compare(req.body.password, user[0].password))
      return res.status(401).json({ message: 'email or password not valid' });

    // sign token
    const token = jwt.sign({ id: user[0].id, permission: user[0].permissionId },
                             process.env.SECRET,
                           { expiresIn: process.env.TIMEOUT });

    return res.json({ auth: true,
                      id: user[0].id,
                      name: user[0].name,
                      permission: user[0].permissionId,
                      exp: Math.floor(Date.now() / 1000) + (process.env.TIMEOUT / 1000),
                      token });

    // res.status(200).json({ message: 'User logged in' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
