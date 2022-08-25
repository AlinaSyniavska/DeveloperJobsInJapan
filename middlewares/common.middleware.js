const {CustomError} = require("../errors");
const {Position, Applicant} = require("../dataBase");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;

            if (!Number.isInteger(Number(id)) || !Number.isFinite(Number(id))) {
                return next(new CustomError('Not valid ID'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isDataValid: (validationSchema, dataType = 'body') => async (req, res, next) => {
        try {
            const {error, value} = validationSchema.validate(req[dataType]);
            if(error) {
                return next(new CustomError(error.details[0].message));
            }
            req[dataType] = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isItemPresent: (schema) => async (req, res, next) => {
        try {
            const {id} = req.params;
            let who;

            switch (schema) {
                case Position:
                    who = 'Position';
                    break;
                case Applicant:
                    who = 'Applicant';
                    break;
                default:
                    who = 'Item';
            }

            const item = await schema.findOne({_id: id});

            if(!item){
                return next(new CustomError(`${who} with id ${id} not found`, 404));
            }

            req.item = item;
            next();
        } catch (e) {
            next(e);
        }
    },
};
