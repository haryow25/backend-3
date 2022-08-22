'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
        sourceKey: 'id',
        as: 'detail_game'
      });
      
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'detail_user'
      });
    }
  };
  Detail.init({
    gameId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detail',
    tableName:'details'
  });
  return Detail;
};