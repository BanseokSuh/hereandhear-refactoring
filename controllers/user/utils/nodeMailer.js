const nodemailer = require("nodemailer");

const EMAIL = process.env.EMAIL;
const EMAIL_PW = process.env.EMAIL_PW;

module.exports = {
  sendMail: (email) => {
    const transport = createTransport();
    const mailOption = setMailOption(email);

    transport.sendMail(mailOption, (error, info) => {
      if (error) console.log("nodemailer error : ", error);
    });
  },
};

const createTransport = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PW,
    },
  });
};

const setMailOption = (email) => {
  return {
    from: EMAIL,
    to: "still3028@gmail.com", // 인자로 전달받은 email이 들어가야 함
    subject: "hello banny",
    html: "<h1>hello</h1>",
    text: "hi there im banny",
  };
};

const sendMail = () => {
  //
};
