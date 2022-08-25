const {positionService} = require("../services");
const {positionPresenter} = require("../presenters");

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
            await positionService.createOne({...req.body});

/*            await Promise.allSettled([
                emailService.sendMailHbs(email, emailActionEnum.WELCOME, {name})
            ]);*/

            res.sendStatus(201);
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
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
