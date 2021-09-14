const jwt = require("jsonwebtoken");
const { user } = require("../../models");
const { generateAccessToken } = require("./utils/util-token");

module.exports = {
  post: async (req, res) => {
    const refreshToken = req.body.token;

    if (refreshToken === null) res.sendStatus(401);

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const userToken = await user.findOne({
      attributes: ["refreshToken"],
      where: {
        id: decoded.id,
      },
    });

    if (!userToken) res.sendStatus(401);

    const accessToken = generateAccessToken(decoded.id, decoded.email);

    res.json({ accessToken: accessToken });
  },
};
