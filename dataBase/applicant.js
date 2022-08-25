const {Schema, model} = require('mongoose');

const {categoryEnum, levelEnum} = require("../enums");
const mongoose = require("mongoose");
const {config} = require("../configs");

const connection = mongoose.createConnection(config.MONGO_URL);
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

const ApplicantSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    categories: {
        type: [String],
        required: true,
        trim: true,
        lowercase: true,
        enum: Object.values(categoryEnum),
    },

    japaneseKnowledge: {
        type: Boolean,
        required: true,
    },

    level: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: Object.values(levelEnum),
    },
}, {timestamps: true});

ApplicantSchema.plugin(autoIncrement.plugin, {
    model: 'applicant',
    startAt: 1,
    incrementBy: 1
});

module.exports = model('applicant', ApplicantSchema);

