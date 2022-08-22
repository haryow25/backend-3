const env = process.env.NODE_ENV || 'development';
const upperCaseEnv = env.toUpperCase();
if (process.env.NODE_ENV === 'development') require('dotenv').config();

module.exports = {
  development: {
    "username": "postgres",
    "password": "123456",
    "database": "database_10ch",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  test: {
    "username": "postgres",
    "password": "123456",
    "database": "database_10ch",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  production: {
    "username": "postgres",
    "password": "123456",
    "database": "database_10ch",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
};
