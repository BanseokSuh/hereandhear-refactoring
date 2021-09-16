const { findOrCreateUser } = require("./utils/userCRUD");
const { encryptPassword } = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    let { email, password, username, nickname } = req.body;
    let encryptedPasswordAndSalt = await encryptPassword(password);
    let [result, created] = await findOrCreateUser(
      email,
      username,
      nickname,
      encryptedPasswordAndSalt.password,
      encryptedPasswordAndSalt.salt
    );

    if (!created) return res.status(409).send("email exists");
    // 데이터 깔끔하게
    result = result.get({ plain: true });
    // 민감한 데이터 제거
    delete result.password;
    delete result.salt;

    res.status(201).json(result);
  },
};
