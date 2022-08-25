const {Position} = require("../dataBase");

module.exports = {
    findAll: async (query = {}) => {
        const {...otherFilters} = query;

        const queryFilters = _getUserFilterQuery(otherFilters);

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

function _getUserFilterQuery(filters) {
    const searchObject = {};    // prepared mongo queries

    // category - filter positions by category (will be coursed to available categories)
    // level - filter positions by level
    // tag - free search in description

    if (filters.category) {
        Object.assign(searchObject, {
            category: {$eq: filters.category}
        })
    }

    if (filters.level) {
        Object.assign(searchObject, {
            level: {$eq: filters.level}
        })
    }

    if (filters.tag) {
        Object.assign(searchObject, {
            description: {$regex: filters.tag, $options: 'i'}
        })
    }

    console.log(JSON.stringify(searchObject, null, 2));

    return searchObject;
}
