const positionRouter = require('express').Router();

const {commonMiddleware, positionMiddleware} = require("../middlewares");
const {queryValidator, positionValidator} = require("../validators");
const {positionController} = require("../controllers");

positionRouter.get('/',
    commonMiddleware.isDataValid(queryValidator.queryParamValidator, 'query'),
    positionController.getAll);
positionRouter.post('/',
    commonMiddleware.isDataValid(positionValidator.newPositionValidator),
    positionController.create);
/*
positionRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getById);
positionRouter.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    commonMiddleware.isDataValid(userValidator.updateUserValidator),// userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.update);
positionRouter.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.delete);*/

module.exports = positionRouter;
