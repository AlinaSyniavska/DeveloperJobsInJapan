const {Schema, model} = require('mongoose');

const {categoryEnum, levelEnum} = require("../enums");

const ApplicantSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    category: {
        type: [String],
        required: true,
        trim: true,
        lowercase: true,
        enum: Object.values(categoryEnum),
    },

    japaneseKnowledge: {
        type: Boolean,
    },

    level: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: Object.values(levelEnum),
    },
}, {timestamps: true});

module.exports = model('applicant', ApplicantSchema);

