const { user } = require("../../../models");

module.exports = {
  findUserFromDB: async (email, encryptedPassword) => {
    return await user.findOne({
      where: {
        email: email,
        password: encryptedPassword,
      },
    });
  },

  findUserFromDBWithId: async (userId) => {
    return await user.findOne({
      attributes: [
        "id",
        "email",
        "username",
        "nickname",
        "createdAt",
        "updatedAt",
      ],
      where: { id: userId },
    });
  },

  findOrCreateUser: async (email, username, nickname, password, salt) => {
    return await user.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        username,
        nickname,
        password,
        salt,
      },
    });
  },

  findUserFromDBToGetANewPassword: async (email, username) => {
    return await user.findOne({
      attributes: [
        "id",
        "email",
        "username",
        "nickname",
        "createdAt",
        "updatedAt",
      ],
      where: {
        email: email,
        username: username,
      },
    });
  },

  updateUser: (userId, nickname) => {
    user.update(
      {
        nickname: nickname,
      },
      {
        where: { id: userId },
      }
    );
  },

  insertRefreshTokenIntoDB: (userId, refreshToken) => {
    user.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  },

  getRefreshTokenFromDB: async (userId) => {
    return await user.findOne({
      attributes: ["refreshToken"],
      where: {
        id: userId,
      },
    });
  },

  saveEncryptedPasswordAndSaltIntoDB: (encryptedPassword, salt, userId) => {
    //
    user.update(
      {
        password: encryptedPassword,
        salt: salt,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  },
};
