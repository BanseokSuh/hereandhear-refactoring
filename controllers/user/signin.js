const { user } = require("../../models");
const getHashedPassword = require("./getHashedPassword");
const { generateAccessToken, genereateRefreshToken } = require("./util-token");

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    // 사용자의 salt값과 암호화 되지 않은 비밀번호를 조합하여 사용자의 비밀번호를 조회한다.
    let hashedPassword = await getHashedPassword(email, password);

    // 1. 사용자 찾기 with email and hashedPassword
    let foundUser = await user.findOne({
      where: {
        email: email,
        password: hashedPassword,
      },
    });

    if (!foundUser) {
      return res.status(404).send("조회된 사용자 정보가 없습니다.");
    }

    // 2. 토큰 생성 => accessToken and refreshToken
    let accessToken = generateAccessToken(foundUser.id);
    let refreshToken = genereateRefreshToken(foundUser.id);

    // 3. 사용자 정보와 토큰을 cookie에 담아서 리턴
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    // need to find out when to return access token and refresh token

    res.json({
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      nickname: foundUser.nickname,
    });
  },
};
