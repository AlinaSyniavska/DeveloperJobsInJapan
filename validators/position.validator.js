const Joi = require('joi');

const {categoryEnum, levelEnum} = require("../enums");

module.exports = {
  positionToAddValidator: Joi.object({
    category: Joi.string().valid(...Object.values(categoryEnum)).trim().lowercase().required(),
    level: Joi.string().valid(...Object.values(levelEnum)).trim().lowercase().required(),
    company: Joi.string().regex(/^(?=.*[a-zA-ZА-яёЁіІїЇ\d])[a-zA-ZА-яёЁіІїЇ\d _&-]{2,100}$/i).trim().required(),
    description: Joi.string().trim(),
    japaneseRequired: Joi.boolean().required(),
  }),

  positionToPatchValidator: Joi.object({
    description: Joi.string().trim(),
    japaneseRequired: Joi.boolean(),
  }),
};
