'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favorites.belongsTo(models.user, {foreignKey:'userId', targetKey:'id'})
      models.favorites.belongsTo(models.content, {foreignKey:'contentsId', targetKey:'id'})
    }
  };
  favorites.init({
    userId: DataTypes.INTEGER,
    contentsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorites',
  });
  return favorites;
};