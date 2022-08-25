const {CustomError} = require("../errors");
const {applicantService} = require("../services");

module.exports = {
    isApplicantUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const applicant = await applicantService.findOne({email});

            if(applicant){
                return next(new CustomError(`Applicant with email ${email} is exist`, 409));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isApplicantToSetUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {id} = req.item;

            const applicant = await applicantService.findOne({email, _id: {$ne: id}});

            if(applicant){
                return next(new CustomError(`Applicant with email ${email} is exist`, 409));
            }

            next();
        } catch (e) {
            next(e);
        }
    },


};
