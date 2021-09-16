const {
  findUserFromDB,
  insertRefreshTokenIntoDB,
} = require("./utils/userCRUD");
const { getUsersEncryptedPassword } = require("./utils/util-encrypt");
const {
  generateAccessToken,
  genereateRefreshToken,
} = require("./utils/util-token");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    let encryptedPassword = await getUsersEncryptedPassword(email, password);
    let foundUser = await findUserFromDB(email, encryptedPassword);

    if (!foundUser)
      return res.status(404).send("조회된 사용자 정보가 없습니다.");

    let accessToken = generateAccessToken(foundUser.id, foundUser.email);
    let refreshToken = genereateRefreshToken(foundUser.id, foundUser.email);

    insertRefreshTokenIntoDB(foundUser.id, refreshToken);

    // 3. 사용자 정보와 토큰을 body에 담아 리턴
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
