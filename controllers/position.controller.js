const {io} = require('socket.io-client');
const socket = io('http://localhost:5000');

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
            const {category, level, japaneseRequired} = req.body;

            /*            await Promise.allSettled([
                            emailService.sendMailHbs(email, emailActionEnum.WELCOME, {name})
                        ]);*/

            res.sendStatus(201);

            // socket.to(`category:${category}`).emit('postNewPosition', {postion: {...req.body}, roomId: `category:${category}`})
            /*            socket.to(`level:${level}`).emit('postNewPosition', {postion: {...req.body}, roomId: `level:${level}`})
                        if (japaneseRequired === false) {
                            socket.to('japaneseKnowledge:false').emit('postNewPosition', {postion: {...req.body}, roomId: 'japaneseKnowledge:false'})
                        } else {
                            socket.to('japaneseKnowledge:false').emit('postNewPosition', {postion: {...req.body}, roomId: 'japaneseKnowledge:false'})
                            socket.to('japaneseKnowledge:true').emit('postNewPosition', {postion: {...req.body}, roomId: 'japaneseKnowledge:true'})
                        }*/
            socket.emit('postNewPosition', {position: {...req.body}, roomId: `category:${category}`});
            socket.emit('postNewPosition', {position: {...req.body}, roomId: `level:${level}`});
            socket.emit('postNewPosition', {position: {...req.body}, roomId: 'japaneseKnowledge:false'})
            if (japaneseRequired === true) {
                socket.emit('postNewPosition', {position: {...req.body}, roomId: 'japaneseKnowledge:true'})
            }
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
