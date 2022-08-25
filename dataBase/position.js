const {Schema, model} = require('mongoose');

const {categoryEnum, levelEnum} = require("../enums");

const PositionSchema = new Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: Object.values(categoryEnum),
    },

    level: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: Object.values(levelEnum),
    },

    company: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    japaneseRequired: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true});

module.exports = model('position', PositionSchema);

