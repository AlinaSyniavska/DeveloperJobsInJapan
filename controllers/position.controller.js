const {userService, passwordService, emailService, positionService} = require("../services");

const {emailActionEnum} = require("../enums");
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
            const newPosition = await positionService.createOne({...req.body});
            // const positionForResponse = positionPresenter.positionResponse(newPosition);

/*            await Promise.allSettled([
                emailService.sendMailHbs(email, emailActionEnum.WELCOME, {name})
            ]);*/

            // res.status(201).json(newPosition);
            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    },
/*
    getById: async (req, res, next) => {
        try {
            const {user} = req;
            const userForResponse = userPresenter.userResponse(user);
            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateOne({_id: id}, req.body);
            const userForResponse = userPresenter.userResponse(updatedUser);
            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },*/
};
