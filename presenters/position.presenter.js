module.exports = {
    positionResponse: (position) => {
        return {
            id: position._id,
            category: position.category,
            level: position.level,
            company: position.company,
            description: position.description,
            japaneseRequired: position.japaneseRequired,
        }
    }
};

