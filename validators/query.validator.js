const Joi = require("joi");

const {emailValidator} = require("./common.validator");
const {categoryEnum, levelEnum} = require("../enums");

module.exports = {
    queryParamValidator: Joi.object({
        category: Joi.string().valid(...Object.values(categoryEnum)),
        level: Joi.string().valid(...Object.values(levelEnum)),
        tag: Joi.string(),
    }),
};

