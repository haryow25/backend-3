'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Detail, {
        foreignKey: 'gameId',
        sourceKey: 'id',
        as: 'detail_game'
      });
      
    }
  };
  Game.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail_url: DataTypes.STRING,
    game_url: DataTypes.STRING,
    play_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
    tableName:'games',
  });
  return Game;
};