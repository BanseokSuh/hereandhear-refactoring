const {
  findUserFromDB,
  saveEncryptedPasswordAndSaltIntoDB,
} = require("./utils/userCRUD");
const {
  getUsersEncryptedPassword,
  encryptPassword,
} = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    const encryptedPassword = await getUsersEncryptedPassword(
      email,
      oldPassword
    );
    const foundUser = await findUserFromDB(email, encryptedPassword);
    if (!foundUser) return res.status(404).send("조회된 사용자가 없습니다.");

    const encryptedPasswordAndSalt = await encryptPassword(newPassword);

    saveEncryptedPasswordAndSaltIntoDB(
      encryptedPasswordAndSalt.password,
      encryptedPasswordAndSalt.salt,
      foundUser.id
    );

    res.json({
      message: "Password changed!!",
    });
  },
};
