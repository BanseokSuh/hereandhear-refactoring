module.exports = {
  post: async (req, res) => {
    // body에 사용자 email, username 입력받음
    // DB에서 데이터 존재하는지 확인
    // 존재한다면 해당 이메일로 메일 전송 - nodemailer
    // npm install nodemailer
    const { email, username } = req.body;
    const foundUser = findUserFromDBToGetANewPassword(email, username);

    if (!foundUser)
      return res.status(404).send("조회된 사용자 정보가 없습니다.");

    res.json({
      message: "getting new password",
    });
  },
};
