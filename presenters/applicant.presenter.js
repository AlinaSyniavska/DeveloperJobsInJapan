module.exports = {
    applicantResponse: (applicant) => {
        return {
            id: applicant._id,
            email: applicant.email,
            categories: applicant.categories,
            japaneseKnowledge: applicant.japaneseKnowledge,
            level: applicant.level,
        }
    }
};

