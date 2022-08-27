const {Applicant, Position} = require("../dataBase");

module.exports = {
    getUserFilterQuery: (filters) => {
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

        // console.log(JSON.stringify(searchObject, null, 2));

        return searchObject;
    },

    searchRecord: ({category, level, japanese}, schema) => {
        const searchObject = {};
        let japaneseKnowledgeState;

        if (schema === Applicant) {
            japanese ? japaneseKnowledgeState = [true] : japaneseKnowledgeState = [true, false];
            Object.assign(searchObject, {
                $and: [
                    {categories: {$eq: category}},
                    {level: {$eq: level}},
                    {japaneseKnowledge: {$in: japaneseKnowledgeState}},
                ]
            })
        }

        if (schema === Position) {
            japanese ? japaneseKnowledgeState = [true, false] : japaneseKnowledgeState = [false];
            Object.assign(searchObject, {
                $and: [
                    {category: {$in: category}},
                    {level: {$eq: level}},
                    {japaneseRequired: {$in: japaneseKnowledgeState}},
                ]
            })
        }

        // console.log(JSON.stringify(searchObject, null, 2));

        return schema.find(searchObject).exec();
    },
};




