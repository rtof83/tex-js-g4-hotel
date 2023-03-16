const User = require("../models/User");

module.exports = async (req, res, next) => {

  try {
    // const [rows] = await global.connection.query(`SELECT user.name
    //                                               FROM user
    //                                               INNER JOIN permission
    //                                               ON permission.id = user.permissionId
    //                                               WHERE user.id = ${req.body.userId} AND permission.id = 1`);

    // if (!rows.length)
    //   return res.status(401).json({ message: 'access only for admin' });

    const result = await User.findAll({ where: { id: req.body.userId} });

    res.status(200).json(result);
  
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  };
};
