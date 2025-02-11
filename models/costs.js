const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema for a cost item in the system.
 * Represents a single cost entry with its description, category, user, amount, and date.
 *
 * @typedef {Object} Cost
 * @property {string} description - A description of the cost item (e.g., "Groceries").
 * @property {string} category - The category to which the cost belongs (e.g., "Food", "Health").
 * @property {number} userid - The unique ID of the user who made the cost.
 * @property {number} sum - The amount of money spent.
 * @property {Date} date - The date when the cost was made.
 */
const CostsSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    userid : {
        type:Number,
        required: true
    },
    sum: {
        type:Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true
    }
});

// Creating model for the cost
const Costs = mongoose.model('costs',CostsSchema,'costs');

// Exports the model so he can be used from the other modules
module.exports = Costs;
