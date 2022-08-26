const {io} = require('socket.io-client');

const {applicantService} = require("../services");
const {applicantPresenter} = require("../presenters");

const socket = io('http://localhost:5000');

module.exports = {
    create: async (req, res, next) => {
        try {
            await applicantService.createOne({...req.body});
            const {categories, level, japaneseKnowledge, email} = req.body;

            res.sendStatus(201);

            socket.emit('room:join', {roomId: `level:${level}`, email});
            categories.forEach(category => socket.emit('room:join', {roomId: `category:${category}`, email}));
            socket.emit('room:join', {roomId: `japaneseKnowledge:${japaneseKnowledge}`, email});

            socket.on('sendEmail', (position) => {

            })

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
