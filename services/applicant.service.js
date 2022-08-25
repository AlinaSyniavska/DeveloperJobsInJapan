const {Applicant} = require("../dataBase");

module.exports = {
    findOne: (params = {}) => {
        return Applicant.findOne(params);
    },

    createOne: (applicant) => {
        return Applicant.create(applicant);
    },

    updateOne: (params = {}, applicantData, options = {new: true}) => {
        return Applicant.findOneAndUpdate(params, applicantData, options);
    },

    deleteOne: (params = {}) => {
        return Applicant.deleteOne(params);
    },
}

