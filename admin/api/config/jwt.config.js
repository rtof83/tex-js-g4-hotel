const jwt = require("jsonwebtoken");

function generateToken(user) {
  const { id, name, email, permissionId } = user;

  const signature = process.env.SECRET;
  const expiration = "12h";

  return jwt.sign({ id, name, email, permissionId }, signature, {
    expiresIn: expiration,
  });
}

module.exports = generateToken;
