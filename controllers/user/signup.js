const { user } = require("../../models");
const { encryptPassword } = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    let { email, password, username, nickname } = req.body;
    let encryptedPasswordAndSalt = await encryptPassword(password);
    let [result, created] = await user.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        username,
        nickname,
        password: encryptedPasswordAndSalt.password,
        salt: encryptedPasswordAndSalt.salt,
      },
    });

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
