const { generateToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');
const util = require('../utils/util');
const userUtils = require('../utils/userUtils');
const connectDB = require('../config/db');

connectDB();

async function login(user) {
  const { login, password } = user;
  if (!user || !login || !password)
    return util.buildResponse(401, {
      message: "Both the log in field and password are required."
    });
  try {
    let user;
    user = await userUtils.getUserByUsername(login);
    if (!user) user = await userUtils.getUserByEmail(login);
    if (!user) return util.buildResponse(404, { message: "The user does not exist." });
    if (!bcrypt.compareSync(password, user.password))
      return util.buildResponse(403, { message: "Password is incorrect." });
    const userInfo = {
      username: user.username,
      email: user.email,
      name: user.name
    };
    const token = generateToken(userInfo);
    const response = { user, token, };
    return util.buildResponse(200, response);
  } catch (e) {
    console.error('There was an error:\n', { e });
  }
}

module.exports.login = login;