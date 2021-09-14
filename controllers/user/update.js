const { user } = require("../../models");
const { getUsersEncryptedPassword } = require("./utils/util-encrypt");

module.exports = {
  post: async (req, res) => {
    let userId = req.body.userId;
    let nickname = req.body.nickname;
    let password = req.body.password;
    let email = req.body.email;

    let hashedPassword = await getUsersEncryptedPassword(email, password);

    const foundUser = await user.findOne({
      where: {
        email: email,
        password: hashedPassword,
      },
    });

    if (!foundUser) return res.status(404).send("조회된 사용자가 없습니다.");

    user.update(
      {
        nickname: nickname,
      },
      {
        where: { id: userId },
      }
    );

    res.end();
  },
};
