const { content } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const result = await content
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .catch((err) => res.json(err));
    res.status(200).send(result);
  },
};
