const {positionService, emailService} = require("../services");
const {positionPresenter} = require("../presenters");
const {emailActionEnum} = require("../enums");
const {searchForSubscription} = require("../helpers");
const {Applicant} = require("../dataBase");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const positions = await positionService.findAll(req.query);

            const positionsForResponse = positions.map(position => positionPresenter.positionResponse(position));

            res.json(
                positionsForResponse
            );
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const newPosition = await positionService.createOne({...req.body});
            const {category, level, company, description, japaneseRequired} = newPosition;
            let japaneseKnowledge;
            japaneseRequired ? japaneseKnowledge = 'required' : japaneseKnowledge = 'not required';

            res.sendStatus(201);

            const applicants = await searchForSubscription.searchRecord({category, level, japanese: japaneseRequired}, Applicant);
/*            applicants.forEach(applicant => emailService.sendMail(
                'alina22syniavska@gmail.com',
                emailActionEnum.POSITION_ADD,
                {category, level, company, description, japaneseRequired: japaneseKnowledge}
            ))*/
            applicants.forEach(applicant => emailService.sendMail(
                applicant.email,
                emailActionEnum.POSITION_ADD,
                {category, level, company, description, japaneseRequired: japaneseKnowledge}
            ))
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {item} = req;
            const positionForResponse = positionPresenter.positionResponse(item);
            res.json(positionForResponse);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;
            await positionService.updateOne({_id: id}, req.body);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {id} = req.params;
            await positionService.deleteOne({_id: id});

            const {category, level, company, description, japaneseRequired} = req.item;
            let japaneseKnowledge;
            japaneseRequired ? japaneseKnowledge = 'required' : japaneseKnowledge = 'not required';

            res.sendStatus(204);

            const applicants = await searchForSubscription.searchRecord({category, level, japanese: japaneseRequired}, Applicant);
/*            applicants.forEach(applicant => emailService.sendMail(
                'alina22syniavska@gmail.com',
                emailActionEnum.POSITION_REMOVE,
                {category, level, company, description, japaneseRequired: japaneseKnowledge}
            ))*/
            applicants.forEach(applicant => emailService.sendMail(
                applicant.email,
                emailActionEnum.POSITION_REMOVE,
                {category, level, company, description, japaneseRequired: japaneseKnowledge}
            ))
        } catch (e) {
            next(e);
        }
    },
};


