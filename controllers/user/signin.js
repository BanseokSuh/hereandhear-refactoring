const { user } = require("../../models");
const { getUsersEncryptedPassword } = require("./utils/util-encrypt");
const {
  generateAccessToken,
  genereateRefreshToken,
} = require("./utils/util-token");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    // 사용자의 salt값과 암호화 되지 않은 비밀번호를 조합하여 사용자의 비밀번호를 조회한다.
    let encryptedPassword = await getUsersEncryptedPassword(email, password);

    // 1. 사용자 찾기 with email and encryptedPassword
    let foundUser = await user.findOne({
      where: {
        email: email,
        password: encryptedPassword,
      },
    });

    if (!foundUser) {
      return res.status(404).send("조회된 사용자 정보가 없습니다.");
    }

    // 2. 토큰 생성 => accessToken and refreshToken
    let accessToken = generateAccessToken(foundUser.id, foundUser.email);
    let refreshToken = genereateRefreshToken(foundUser.id, foundUser.email);

    // 2.1. refreshToken을 사용장 DB에 저장
    await user.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: {
          id: foundUser.id,
        },
      }
    );

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
