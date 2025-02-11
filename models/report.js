const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema for an item in one of the report categories.
 * Represents a single cost entry with a description, sum, and day.
 *
 * @typedef {Object} Item
 * @property {number} sum - The cost amount for the item.
 * @property {string} description - A description of the item.
 * @property {number} day - The day of the month the cost was recorded.
 */
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

/**
 * Schema for a specific user's report in a specific month and year.
 * Divides all cost items by categories such as food, health, housing, sport, and education.
 *
 * @typedef {Object} Report
 * @property {number} userid - The unique ID of the user.
 * @property {number} year - The year of the report.
 * @property {number} month - The month of the report (1-12).
 * @property {Object} costs - An object containing arrays of cost items for each category.
 * @property {Item[]} costs.food - An array of items under the 'food' category.
 * @property {Item[]} costs.health - An array of items under the 'health' category.
 * @property {Item[]} costs.housing - An array of items under the 'housing' category.
 * @property {Item[]} costs.sport - An array of items under the 'sport' category.
 * @property {Item[]} costs.education - An array of items under the 'education' category.
 */
const ReportSchema = new Schema({
    userid: {
        type: Number,
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

