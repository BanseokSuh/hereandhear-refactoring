const { sendMail } = require("./utils/nodeMailer");
const { findUserFromDBToGetANewPassword } = require("./utils/userCRUD");

module.exports = {
  post: async (req, res) => {
    // 존재한다면 해당 이메일로 메일 전송 - nodemailer
    // npm install nodemailer
    const { email, username } = req.body;
    const foundUser = await findUserFromDBToGetANewPassword(email, username);

    if (!foundUser)
      return res.status(404).send("조회된 사용자 정보가 없습니다.");

    // 임의의 문자열 생성
    // 문자열을 encrypt
    // encryptedPassword를 DB에 저장
    // 문자열은 email로 전달

    sendMail(email);

    res.json({
      foundUser: foundUser,
      message: "getting new password",
    });
  },
};
