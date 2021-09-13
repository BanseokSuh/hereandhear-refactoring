const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (id, email) => {
    return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30s",
    });
  },

  genereateRefreshToken: (id, email) => {
    return jwt.sign({ id, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "2w",
    });
  },
};
