const auth = require('../utils/auth');
const util = require('../utils/util');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const userUtils = require('../utils/userUtils');
const connectDB = require('../config/db');
const loginService = require('./login');

connectDB();

async function register(userInfo) {
  const { name, username, email, password } = userInfo;
  let user;
  if (!name || !username || !email || !password)
    util.buildResponse(401, {
      message: "All fields are required."
    });
  try {
    user = await userUtils.getUserByUsername(username);
    if (user?._id)
      return util.buildResponse(401, {
        message: "The user with this username already exists. Please choose a different one."
      });
    
    user = await userUtils.getUserByEmail(email);
    if (user?._id)
      return util.buildResponse(401, {
        message: "The user with this e-mail already exists. Please choose a different one."
      });
    
    const date = new Date();
    const encryptedPW = bcrypt.hashSync(password.trim(), 5);
    user = new User({
      name,
      username,
      email,
      password: encryptedPW,
      dateCreated: date,
      dateModified: date,
    });
    const saveUserResponse = await userUtils.saveUser(user);
    if (!saveUserResponse)
      return util.buildResponse(503, {
        message: "Internal server error. Please try again later."
      });
    else return await loginService.login({ login: saveUserResponse.username, password });
    // return util.buildResponse(200, { user });
  } catch (e) {
    console.error('There was an error:\n', { e });
  }
}

module.exports.register = register;