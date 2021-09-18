const { findOrCreateUser } = require("./utils/userCRUD");
const { encryptPassword } = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    const { email, password, username, nickname } = req.body;
    const encryptedPasswordAndSalt = await encryptPassword(password);

    let [result, created] = await findOrCreateUser(
      email,
      username,
      nickname,
      encryptedPasswordAndSalt.password,
      encryptedPasswordAndSalt.salt
    );
    if (!created) return res.status(409).send("email exists");
    result = result.get({ plain: true });

    delete result.password;
    delete result.salt;

    res.status(201).json(result);
  },
};
