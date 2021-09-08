const crypto = require("crypto");
const { user } = require("../../../models");

module.exports = getHashedPassword = async (email, unhashedPassword) => {
  return new Promise(async (response, reject) => {
    // 사용자의 salt값 가져오기
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
        .catch((err) => {
          console.error(err);
        });
      // .catch(err => reject('')); // ???????

      // 조회된 salt 값이 없으면?
      if (!salt) {
        reject("조회된 결과가 없습니다.");
      } else {
        // salt값과 password 조합하여 얻은 해싱비밀번호 리턴
        crypto.pbkdf2(
          unhashedPassword,
          salt,
          17598,
          64,
          "sha512",
          (err, key) => {
            if (err) reject(err);
            response(key.toString("base64")); // key는 버퍼 데이터
          }
        );
      }
    } catch (err) {
      throw err;
    }
  });
};
