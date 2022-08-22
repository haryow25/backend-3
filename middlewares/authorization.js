const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({ where: { id } });
    if (user.id === req.user.id) {
      return next();
    }
    return res.status(401).json({
      result: 'Failed',
      message: 'Authorized is Required!',
    });
  } catch (err) {
    res.status(401).json({
      message: 'Authorized is Required!',
      errorMessage: err.message,
    });
  }
};
