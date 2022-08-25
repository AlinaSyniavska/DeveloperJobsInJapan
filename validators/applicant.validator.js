const Joi = require('joi');

const {categoryEnum, levelEnum} = require("../enums");
const {emailValidator} = require("./common.validator");

module.exports = {
  applicantToAddValidator: Joi.object({
    email: emailValidator.required(),
    categories: Joi.array().items(Joi.string().lowercase().valid(...Object.values(categoryEnum))).required(),
    japaneseKnowledge: Joi.boolean().required(),
    level: Joi.string().valid(...Object.values(levelEnum)).trim().lowercase().required(),
  }),

  applicantToSetValidator: Joi.object({
    email: emailValidator,
    categories: Joi.array().items(Joi.string().lowercase().valid(...Object.values(categoryEnum))),
    japaneseKnowledge: Joi.boolean(),
    level: Joi.string().valid(...Object.values(levelEnum)).trim().lowercase(),
  }),
};
