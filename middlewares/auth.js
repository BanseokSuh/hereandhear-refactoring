const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    try {
      if (!accessToken) {
        return res.status(403).json({
          success: false,
          message: "not logged in",
        });
      }

      /* 토큰 유효성 검사 */
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      if (decoded) {
        res.locals.userId = decoded.id;
        next();
      } else {
        res.status(401).json({ error: "unauthorized user" });
      }
    } catch (e) {
      res.status(401).json({ error: "token expired" });
    }
  },
};
