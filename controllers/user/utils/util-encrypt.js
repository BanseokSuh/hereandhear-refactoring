const crypto = require("crypto");
const { user } = require("../../../models");

module.exports = {
  encryptPassword: async (unhashedPassword) => {
    let encryptedPasswordAndSalt = await getEncryptedPasswordAndSalt(
      unhashedPassword
    );
    return encryptedPasswordAndSalt;
  },

  getUsersEncryptedPassword: async (email, unhashedPassword) => {
    return new Promise(async (response, reject) => {
      try {
        const salt = await user
          .findOne({
            attributes: ["salt"],
            raw: true,
            where: {
              email: email,
            },
          })
          .then((result) => result.salt)
          .catch((err) => console.error(err));
        if (!salt) reject("조회된 사용자가 없습니다.");

        crypto.pbkdf2(
          unhashedPassword,
          salt,
          17598,
          64,
          "sha512",
          (err, key) => {
            if (err) reject(err);
            response(key.toString("base64"));
          }
        );
      } catch (err) {
        throw err;
      }
    });
  },
};

// 비밀번호 해싱하기
const getEncryptedPasswordAndSalt = (unhashedPassword) => {
  return new Promise(async (res, rej) => {
    const salt = await createSalt();
    // 암호화 되지 않은 비밀번호와 salt값을 이용해 sha512로 hashing
    // 비밀번호, salt, 반복횟수, 비밀번호길이, 해시알고리즘, 콜백
    crypto.pbkdf2(unhashedPassword, salt, 17598, 64, "sha512", (err, key) => {
      if (err) rej(err);
      res({
        password: key.toString("base64"), // base64 문자열 salt로 변경
        salt,
      });
    });
  });
};

// crypto 모듈의 randomBytes 메서드 통해 64비트 길이의 랜덤 salt 만들기
const createSalt = () => {
  return new Promise((res, rej) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) rej(err);
      res(buf.toString("base64")); // base64 문자열 salt로 변경
    });
  });
};
