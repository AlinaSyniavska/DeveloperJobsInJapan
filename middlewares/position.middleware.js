const {userService} = require("../services");
const {CustomError} = require("../errors");

module.exports = {
    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOne({email});

            if(user){
                return next(new CustomError(`User with email ${email} is exist`, 409));
            }

            // req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },


};
