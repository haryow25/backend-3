const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { sendEmail } = require('../helpers/sendEmail');
const bcrypt = require('bcryptjs');

const format = (user) => {
  const { id, first_name, last_name, email, username } = user;

  const payload = {
    id,
    email,
    username,
  };

  return {
    result: 'success',
    message: 'Login Successfully',
    data: {
      id,
      first_name,
      last_name,
      email,
      username,
      accessToken: generateToken(payload),
    },
  };
};

const index = async (req, res) => {
  res.send('Something is cooking inside this kitchen.. Yummy!');
};

const register = async (req, res) => {
  const { first_name, last_name, email, username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user) {
    }

    // throw new Error('another error, e.g internal server error');
  } catch (err) {
    return res.status(500).json({
      result: 'Failed',
      error: err.message,
    });
  }

  try {
    User.create ({
      first_name,
      last_name,
      email,
      username,
      password,
    })
    .then((data) => {
      return res.status(201).json({
        result: 'Success',
        message: 'User Has Been Successfully Created',
        data: data,
      });
    })

  } catch (err) {
    return res.status(400).json({
      result: 'failed',
      message:
        'Registration Failed',
      error: err.errors[0].message,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        result: 'Failed',
        message: 'User Not Found',
      });
    }

    const match = comparePassword(password, user.password);
    if (match) {
      return res.status(200).json(format(user));
    } else {
      return res.status(401).json({
        result: 'Failed',
        message: 'Please enter a valid username or password',
      });
    }
  } catch (err) {
    return res.status(500).json({
      result: 'Failed',
      message: 'Oops! Please Check Again?',
      error: err.message,
    });
  }
};

const loginGoogle = (req, res) => {
  const { tokenId } = req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  let email = null;
  let first_name = null;
  let last_name = null;
  let username = '';
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then((ticket) => {
      const payload = ticket.getPayload();
      email = payload.email;
      first_name = payload.given_name;
      last_name = payload.family_name;
      username = email.substring(0, email.lastIndexOf('@'));
      return User.findOne({ where: { email } });
    })
    .then((user) => {
      if (!user) {
        return User.create({
          first_name,
          last_name,
          email,
          username,
          password: Math.random() * 1000 + 'Google Random Password Secret',
        });
      } else {
        return user;
      }
    })
    .then((user) => {
      res.status(200).json(format(user));
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const currentUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  const { id, username, email } = user;
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'Email is not Registered',
    });
  }
  const payload = { id, username, email };
  await user.update({ reset_password_link: generateToken(payload) });

  const templateEmail = {
    from: 'Go Play',
    to: req.body.email,
    subject: 'Link to Reset Password',
    html: `<p>Please click the link below to reset your password</p><p>${
      process.env.CLIENT_URL
    }/resetpassword/${generateToken(payload)}</p>`,
  };
  sendEmail(templateEmail);
  return res.status(200).json({
    status: true,
    message: 'Link to Reset Password Sent Successfully!',
  });
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log(newPassword);
    console.log(token);

    const hashPassword = bcrypt.hashSync(
      newPassword,
      bcrypt.genSaltSync(10),
      null
    );

    const user = await User.update(
      { password: hashPassword },
      { where: { reset_password_link: token }, returning: true }
    );

    return res.status(200).json({
      status: true,
      message: 'Password Changed Successfully',
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  index,
  register,
  login,
  loginGoogle,
  currentUserProfile,
  forgotPassword,
  resetPassword,
};
