const applicantRouter = require('express').Router();

const {commonMiddleware, applicantMiddleware} = require("../middlewares");
const {applicantValidator} = require("../validators");
const {applicantController} = require("../controllers");
const {Applicant} = require("../dataBase");

applicantRouter.post('/',
    commonMiddleware.isDataValid(applicantValidator.applicantToAddValidator),
    applicantMiddleware.isApplicantUniq,
    applicantController.create);

applicantRouter.get('/:id',
    commonMiddleware.isIdValid,
    commonMiddleware.isItemPresent(Applicant),
    applicantController.getById);
applicantRouter.put('/:id',
    commonMiddleware.isIdValid,
    commonMiddleware.isDataValid(applicantValidator.applicantToSetValidator),
    commonMiddleware.isItemPresent(Applicant),
    applicantMiddleware.isApplicantToSetUniq,
    applicantController.update);
applicantRouter.delete('/:id',
    commonMiddleware.isIdValid,
    commonMiddleware.isItemPresent(Applicant),
    applicantController.delete);

module.exports = applicantRouter;
