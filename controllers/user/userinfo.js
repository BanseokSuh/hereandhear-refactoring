const { user } = require("../../models");

module.exports = {
  get: async (req, res) => {
    let userId = req.params.id;

    if (!userId) {
      res.status(404).send({ data: null, message: "not found" });
    } else {
      const data = await user
        .findOne({
          where: { id: userId },
        })
        .catch((err) => res.json(err));

      delete data.dataValues.password;
      delete data.dataValues.salt;

      res.status(200).json({
        data: data.dataValues,
        message: "ok",
      });
    }
  },
};
