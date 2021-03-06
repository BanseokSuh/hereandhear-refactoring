const nodemailer = require("nodemailer");

const EMAIL = process.env.EMAIL;
const EMAIL_PW = process.env.EMAIL_PW;

module.exports = {
  sendMail: (email, tmpPassword) => {
    const transport = createTransport();
    const mailOption = setMailOption(email, tmpPassword);

    transport.sendMail(mailOption, (error, info) => {
      if (error) throw new Error(error);
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

const setMailOption = (email, tmpPassword) => {
  const htmlMessage = getHTMLMessage(tmpPassword);
  return {
    from: EMAIL,
    to: "still3028@gmail.com", // 인자로 전달받은 email이 들어가야 함
    subject: "hello banny",
    html: htmlMessage,
  };
};

const getHTMLMessage = (tmpPassword) => {
  return `<h1>Hi there Im banny. Your temporary password is ${tmpPassword}.</h1>`;
};
