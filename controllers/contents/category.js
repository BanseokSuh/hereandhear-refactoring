const { content } = require("../../models");

module.exports = {
  post: async (req, res) => {
    let target = req.body.category;

    if (!target) {
      res.status(404).send("bad request");
    } else {
      const data = await content
        .findAll({
          where: {
            category: target,
          },
        })
        .catch((err) => res.json(err));

      res.status(200).send(data);
    }
  },
};
