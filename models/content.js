'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.content.hasMany(models.favorites, {foreignKey:'contentsId', sourceKey:'id'})
    }
  };
  content.init({
    imgPath: DataTypes.STRING,
    imgPath2: DataTypes.STRING,
    audioPath: DataTypes.STRING,
    title: DataTypes.STRING,
    weatherTitle: DataTypes.STRING,
    seasonTitle: DataTypes.STRING,
    abstract: DataTypes.STRING,
    text: DataTypes.STRING,
    text2: DataTypes.STRING,
    text3: DataTypes.STRING,
    location: DataTypes.STRING,
    weather: DataTypes.STRING,
    category: DataTypes.STRING,
    month: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'content',
  });
  return content;
};