const {applicantService} = require("../services");
const {applicantPresenter} = require("../presenters");

module.exports = {
    create: async (req, res, next) => {
        try {
            await applicantService.createOne({...req.body});

            res.sendStatus(201);
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
            await applicantService.updateOne({_id: id}, req.body);
            res.sendStatus(200);
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
