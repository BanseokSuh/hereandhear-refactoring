const { favorites } = require("../../models");

module.exports = {
  post: async (req, res) => {
    let userId = req.body.userId;
    let contentId = req.body.contentId;

    let target = await favorites.findOne({
      where: {
        userId: userId,
        contentsId: contentId,
      },
    });

    let created;

    if (target) {
      await target.destroy();
      res.send({ message: "즐겨찾기에서 삭제되었습니다." });
    } else {
      created = await favorites.create({
        userId: userId,
        contentsId: contentId,
      });
      created = created.get({ plain: true });
      console.log(created);
      created.message = "즐겨찾기에 추가되었습니다.";
      res.send(created);
    }
  },
};
