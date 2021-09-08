const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    let userId = req.body.userId;
    let nickname = req.body.nickname;
    let password = req.body.password;
    let email = req.body.email;

    let hashedPassword = await getHashedPassword(email, password);

    const foundUser = await user.findOne({
      where: {
        email: email,
        password: hashedPassword,
      },
    });

    if (!foundUser) return res.status(404).send("비밀번호가 일치하지 않습니다");

    if (!nickname) {
      res.status(400).send();
    } else {
      user.update(
        {
          nickname: nickname,
        },
        {
          where: { id: userId },
        }
      );
    }

    res.end();
  },
};
