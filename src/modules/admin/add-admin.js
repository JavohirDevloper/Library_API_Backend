const { hash } = require('bcryptjs');
const User = require('../../mongomodels/User');

const addAmin = async (data) => {
  const hashedPassword = await hash(data.password, 10);
  const result = await User.create({ ...data, password: hashedPassword });

  return result;
};

module.exports = addAmin;
