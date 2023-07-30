const Joi = require('joi');

exports.createAuthorSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

exports.getAuthorByIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

exports.updateAuthorSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
   
  }),
};

exports.removeAuthorSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};