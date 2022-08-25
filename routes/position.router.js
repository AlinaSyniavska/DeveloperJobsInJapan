const positionRouter = require('express').Router();

const {commonMiddleware} = require("../middlewares");
const {queryValidator, positionValidator} = require("../validators");
const {positionController} = require("../controllers");
const {Position} = require("../dataBase");

positionRouter.get('/',
    commonMiddleware.isDataValid(queryValidator.queryParamValidator, 'query'),
    positionController.getAll);
positionRouter.post('/',
    commonMiddleware.isDataValid(positionValidator.positionToAddValidator),
    positionController.create);

positionRouter.get('/:id',
    commonMiddleware.isIdValid,
    commonMiddleware.isItemPresent(Position),
    positionController.getById);
positionRouter.patch('/:id',
    commonMiddleware.isIdValid,
    commonMiddleware.isDataValid(positionValidator.positionToPatchValidator),
    commonMiddleware.isItemPresent(Position),
    positionController.update);
positionRouter.delete('/:id',
    commonMiddleware.isIdValid,
    commonMiddleware.isItemPresent(Position),
    positionController.delete);

module.exports = positionRouter;
