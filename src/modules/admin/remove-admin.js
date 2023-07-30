const { NotFoundError } = require('../../shared/errors');
const Admin = require('../../mongomodels/Admin');

exports.removeAdmin = async ({ id }) => {
  const existing = await Admin.findById({id});

  if (!existing) {
    throw new NotFoundError('Foydalanuvchi topilmadi.');
  }

  return Admin.findByIdAndRemove(id);
};
