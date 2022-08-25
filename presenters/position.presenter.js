module.exports = {
    positionResponse: (position) => {
        return {
            category: position.category,
            level: position.level,
            company: position.company,
            description: position.description,
            japaneseRequired: position.japaneseRequired,
        }
    }
};

