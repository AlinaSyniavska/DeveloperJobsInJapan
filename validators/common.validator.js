const Joi = require("joi");

const {regexConst} = require("../configs");

module.exports = {
    emailValidator: Joi.string().regex(regexConst.EMAIL_REGEXP).lowercase().trim(true),
}
