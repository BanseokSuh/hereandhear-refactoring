const { sendMail } = require("./utils/nodeMailer");
const {
  findUserFromDBToGetANewPassword,
  saveEncryptedPasswordAndSaltIntoDB,
} = require("./utils/userCRUD");
const { encryptPassword } = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    const { email, username } = req.body;
    const foundUser = await findUserFromDBToGetANewPassword(email, username);
    if (!foundUser)
      return res.status(404).send("조회된 사용자 정보가 없습니다.");

    const tmpPassword = getRandomString();
    const encryptedPasswordAndSalt = await encryptPassword(tmpPassword);

    saveEncryptedPasswordAndSaltIntoDB(
      encryptedPasswordAndSalt.password,
      encryptedPasswordAndSalt.salt,
      foundUser.id
    );

    sendMail(email, tmpPassword);

    res.json({
      tmpPassword: tmpPassword,
      message: "getting new password",
    });
  },
};

const getRandomString = () => {
  return Math.random().toString(36).substr(2, 11);
};
