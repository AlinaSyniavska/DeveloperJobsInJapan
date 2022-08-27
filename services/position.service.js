const {Position} = require("../dataBase");
const {searchForSubscription} = require("../helpers");

module.exports = {
    findAll: async (query = {}) => {
        const {...otherFilters} = query;

        const queryFilters = searchForSubscription.getUserFilterQuery(otherFilters);

        return Position.find(queryFilters);
    },

    findOne: (params = {}) => {
        return Position.findOne(params);
    },

    createOne: (position) => {
        return Position.create(position);
    },

    updateOne: (params = {}, positionData, options = {new: true}) => {
        return Position.findOneAndUpdate(params, positionData, options);
    },

    deleteOne: (params = {}) => {
        return Position.deleteOne(params);
    },
}


