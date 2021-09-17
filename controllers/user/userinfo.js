const { user } = require("../../models");
const { findUserFromDBWithId } = require("./utils/userCRUD");

module.exports = {
  get: async (req, res) => {
    const userId = req.params.id;
    if (!userId) res.status(404).send({ data: null, message: "not found" });

    const foundUser = await findUserFromDBWithId(userId);

    res.status(200).json({
      data: foundUser,
      message: "ok",
    });
  },
};
