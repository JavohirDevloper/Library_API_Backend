const Joi = require('joi');

exports.postUserSChema = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
exports.loginUserSchema={
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchUserSchema = {
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

exports.removeUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
