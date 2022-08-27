const {emailActionEnum} = require("../enums");

module.exports = {
    [emailActionEnum.POSITION_ADD]: {
        subject: 'Position added',
        template: 'add-position'
    },

    [emailActionEnum.POSITION_REMOVE]: {
        subject: 'Position removed',
        template: 'remove-position'
    },

    [emailActionEnum.WELCOME]: {
        subject: 'New Applicant',
        template: 'welcome'
    },
};
