'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imgPath: {
        type: Sequelize.STRING
      },
      imgPath2: {
        type: Sequelize.STRING
      },
      audioPath: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      weatherTitle: {
        type: Sequelize.STRING
      },
      seasonTitle: {
        type: Sequelize.STRING
      },
      abstract: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      text2: {
        type: Sequelize.STRING
      },
      text3: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      weather: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      month: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contents');
  }
};