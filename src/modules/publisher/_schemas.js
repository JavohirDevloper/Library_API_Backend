const Joi = require('joi');

exports.createPublisherSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string()
      .required(),
  }),
};

exports.getPublisherByIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

exports.updatePublisherSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  }),
};

exports.removePublisherSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};