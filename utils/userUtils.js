const User = require('../models/User');

async function getUserByUsername(username) {
  try {
    const user = await User.find({ username });
    console.log('JUZER', { user });
    if (user) return user;
    return false;
  } catch (e) {
    console.error('There was an error:\n', { e });
    return false;
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.find({ email });
    console.log('JUZER', { user });
    if (user) return user;
    return false;
  } catch (e) {
    console.error('There was an error:\n', { e });
    return false;
  }
}

async function saveUser(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  } catch (e) {
    console.error('There was an error:\n', { e });
    return false;
  }
}

module.exports = { getUserByUsername, getUserByEmail, saveUser };