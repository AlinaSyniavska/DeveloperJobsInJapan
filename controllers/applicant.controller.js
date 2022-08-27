const {applicantService, emailService} = require("../services");
const {applicantPresenter, positionPresenter} = require("../presenters");
const {searchForSubscription} = require("../helpers");
const {emailActionEnum} = require("../enums");
const {Position} = require("../dataBase");

module.exports = {
    create: async (req, res, next) => {
        try {
            const newApplicant = await applicantService.createOne({...req.body});
            const {email, categories, japaneseKnowledge, level} = newApplicant;

            res.sendStatus(201);

            const positions = await searchForSubscription.searchRecord(
                {category: categories, level, japanese: japaneseKnowledge},
                Position);

            const positionsForResponse = positions.map(position => positionPresenter.positionResponse(position));

/*            await emailService.sendMail(
                'alina22syniavska@gmail.com',
                emailActionEnum.WELCOME,
                {email, positionsForResponse}
            )*/

            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                {email, positionsForResponse}
            )
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {item} = req;
            const applicantForResponse = applicantPresenter.applicantResponse(item);
            res.json(applicantForResponse);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;
            const {categories, level, japaneseKnowledge, email} = req.body;
            await applicantService.updateOne({_id: id}, req.body);
            res.sendStatus(200);

            socket.emit('room:join', {roomId: `level:${level}`, email});
            categories.forEach(category => socket.emit('room:join', {roomId: `category:${category}`, email}));
            socket.emit('room:join', {roomId: `japaneseKnowledge:${japaneseKnowledge}`, email});
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {id} = req.params;
            await applicantService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
