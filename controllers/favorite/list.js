const { content, favorites } = require("../../models");

module.exports = {
  get: async (req, res) => {
    let userId = req.params.id;

    if (!userId) res.status(404).send("찾는 데이터 없음");

    const result = await favorites.findAll({
      include: [
        {
          model: content,
        },
      ],
      where: { userId: userId },
    });

    if (!result) {
      res.status(404).send("찾는 데이터 없음");
    } else {
      let result2 = result.map((el) => {
        return el.dataValues.content.dataValues;
      });

      res.send(result2);
    }
  },
};
