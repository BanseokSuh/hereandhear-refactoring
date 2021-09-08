const { user } = require("../../models");
const encryptPassword = require("./utils/encryptPassword");

module.exports = {
  // 회원가입
  post: async (req, res) => {
    let { email, password, username } = req.body;

    // 비밀번호 해싱
    let encryptedPasswordAndSalt = await encryptPassword(password);

    // 찾아서 없으면 create
    let [result, created] = await user.findOrCreate({
      where: {
        email,
      },
      defaults: {
        username: username,
        password: encryptedPasswordAndSalt.password,
        salt: encryptedPasswordAndSalt.salt,
      },
    });

    // created가 true면 새로 생성된 것. false면 이미 계정이 있어서 생성되지 않은 것.
    if (!created) {
      return res.status(409).send("email exists");
    }

    // 데이터 깔끔하게 만들어줌
    result = result.get({ plain: true });

    // 비밀번호, salt값 삭제
    delete result.password;
    delete result.salt;

    res.status(201).json(result);
  },
};
