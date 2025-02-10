const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for an item in one of the report categories
const ItemSchema = new Schema({
    sum: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
});

// Report Schema for a specific user in a specific month and year divided all the cost items by categories
const ReportSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    costs: {
        food: [ItemSchema],
        health: [ItemSchema],
        housing: [ItemSchema],
        sport: [ItemSchema],
        education: [ItemSchema]
    }
});

// Creating model for the report
const Report = mongoose.model('Report', ReportSchema);

// Exports the model so he can be used from the other modules
module.exports = Report;

