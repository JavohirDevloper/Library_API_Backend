const Joi = require('joi');

exports.postAdminSChema = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
exports.loginAdminSchema={
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

exports.showAdminSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchAdminSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

exports.updatePasswordSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    password: Joi.string().required(),
  }),
};

exports.deleteAdminSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
