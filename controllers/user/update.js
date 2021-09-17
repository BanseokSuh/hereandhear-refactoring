const { user } = require("../../models");
const { findUserFromDB, updateUser } = require("./utils/userCRUD");
const { getUsersEncryptedPassword } = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    const userId = res.locals.userId;
    const { nickname, password, email } = req.body;
    const encryptedPassword = await getUsersEncryptedPassword(email, password);
    const foundUser = findUserFromDB(email, encryptedPassword);

    if (!foundUser) return res.status(404).send("비밀번호가 일치하지 않습니다");

    updateUser(userId, nickname);
    res.end();
  },
};
