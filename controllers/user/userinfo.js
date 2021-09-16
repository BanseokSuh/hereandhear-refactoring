const { findUserFromDBWithId } = require("./utils/userCRUD");

module.exports = {
  get: async (req, res) => {
    const userId = res.locals.userId;
    if (!userId) res.status(404).send({ data: null, message: "not found" });

    const foundUser = await findUserFromDBWithId(userId, res);

    res.status(200).json({
      data: foundUser.dataValues,
      message: "ok",
    });
  },
};
