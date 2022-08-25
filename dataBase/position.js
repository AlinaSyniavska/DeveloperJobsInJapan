const {Schema, model} = require('mongoose');

const {categoryEnum, levelEnum} = require("../enums");

const mongoose = require("mongoose");
const {config} = require("../configs");

const connection = mongoose.createConnection(config.MONGO_URL);
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

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


PositionSchema.plugin(autoIncrement.plugin, {
    model: 'position',
    startAt: 1,
    incrementBy: 1
});

module.exports = model('position', PositionSchema);

