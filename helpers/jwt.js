const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret';

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
