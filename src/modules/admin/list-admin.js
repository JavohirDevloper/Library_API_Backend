const User = require('../../mongomodels/User');

const listAdmin = async () => {
  const admin = await User.find();

  return admin;
};

module.exports = listAdmin;
