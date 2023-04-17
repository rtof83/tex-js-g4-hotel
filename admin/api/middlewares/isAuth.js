const { expressjwt } = require("express-jwt");

module.exports = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});
