
const checkValidate = require('./checkValidate');

module.exports = async (req, res, next) => {
  try {
    const { error, decoded } = checkValidate(req);

    if (error)
      return res.status(401).json(error);

    if (decoded.permissionId === 1) {
      next();
    } else {
      return res.status(401).json({ message: "access only for admin" });
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  };
};
