'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Detail, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'detail_user',
      });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Your first name min length 2 and cannot exceed 50 characters',
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Please enter the valid email address!',
          },
          isLowercase: {
            args: true,
            msg: 'Only lowercase letters which allowed for email!',
          },
        },
        unique: {
          args: true,
          msg: 'The email is already registered',
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 20],
            msg: 'Your username min length 2 & cannot exceed 20 characters',
          },
        },
        unique: {
          args: true,
          msg: 'The username is already registerd',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: 'Your password must be longer than 6 characters',
          },
        },
      },
      total_score: DataTypes.INTEGER,
      bio: DataTypes.STRING,
      location: DataTypes.STRING,
      social_media_url: DataTypes.STRING,
      reset_password_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
