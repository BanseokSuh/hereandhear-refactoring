module.exports = {
  post: (req, res) => {
    if (!req.session.userId) {
      res.status(400).send({ data: null, message: "not authorized" });
    } else {
      req.session.destroy();
      res.json({ data: null, message: "ok" });
    }
  },
};
