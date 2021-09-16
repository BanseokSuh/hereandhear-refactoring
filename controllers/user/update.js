const { findUserFromDB, updateUser } = require("./utils/userCRUD");
const { getUsersEncryptedPassword } = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    const userId = res.locals.userId;
    const { nickname, password, email } = req.body;
    const hashedPassword = await getUsersEncryptedPassword(email, password);
    const foundUser = await findUserFromDB(email, hashedPassword);
    if (!foundUser) return res.status(404).send("조회된 사용자가 없습니다.");

    updateUser(userId, nickname);
    res.json({ message: "update completed!" });
  },
};
