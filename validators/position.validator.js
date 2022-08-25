const Joi = require('joi');

const { emailValidator, passwordValidator, phoneValidator } = require('./common.validator');
const {categoryEnum, levelEnum} = require("../enums");

module.exports = {
  newPositionValidator: Joi.object({
    category: Joi.string().valid(...Object.values(categoryEnum)).trim().lowercase().required(),
    level: Joi.string().valid(...Object.values(levelEnum)).trim().lowercase().required(),
    company: Joi.string().alphanum().trim().required(),
    description: Joi.string().trim(),
    japaneseRequired: Joi.boolean().required(),
  }),

  updatePositionValidator: Joi.object({
    description: Joi.string().trim(),
    japaneseRequired: Joi.boolean(),
  }),
};
