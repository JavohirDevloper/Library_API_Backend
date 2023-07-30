const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../mongomodels/Admin");
const { NotFoundError, UnauthorizedError } = require("../../shared/errors");
const config = require("../../shared/config/index.js");

const signInAdmin = async (data) => {
  const existing = await Admin.findOne({ username: data.username });

  if (!existing) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  const hashedPassword = existing.password;

  if (!hashedPassword) {
    throw new NotFoundError("Foydalanuvchi paroli topilmadi");
  }
  const plainPassword = data.password;

  const match = await bcryptjs.compare(plainPassword, hashedPassword);

  if (!match) {
    throw new UnauthorizedError("Login yoki parol xato.");
  }

  const token = jwt.sign({ admin: { id: existing.id } }, config.jwt.secret);

  return { token };
};

module.exports = signInAdmin;
