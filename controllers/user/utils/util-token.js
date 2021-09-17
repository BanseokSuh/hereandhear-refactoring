const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: function (id) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  },

  genereateRefreshToken: function (id) {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "2w",
    });
  },

  authenticateToken: function (token) {},
};
