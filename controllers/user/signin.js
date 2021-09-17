const { user } = require("../../models");
const { findUserFromDB } = require("./utils/userCRUD");
const { getUsersEncryptedPassword } = require("./utils/util-encrypt");
const {
  generateAccessToken,
  genereateRefreshToken,
} = require("./utils/util-token");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    const encryptedPassword = await getUsersEncryptedPassword(email, password);
    const foundUser = await findUserFromDB(email, encryptedPassword);

    if (!foundUser)
      return res.status(404).send("조회된 사용자 정보가 없습니다.");

    let accessToken = generateAccessToken(foundUser.id);
    let refreshToken = genereateRefreshToken(foundUser.id);

    res.json({
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      nickname: foundUser.nickname,
      accessToken,
      refreshToken,
    });
  },
};
