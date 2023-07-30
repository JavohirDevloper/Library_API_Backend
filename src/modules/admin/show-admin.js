const { NotFoundError } = require('../../shared/errors');
const Admin = require('../../mongomodels/Admin');

const showAdmin = async ({ id }) => {
  const admin = await Admindmin.findById(id);

  if (!admin) {
    throw new NotFoundError('Foydalanuvchi topilmadi.');
  }

  return admin;
};

module.exports = showAdmin;
