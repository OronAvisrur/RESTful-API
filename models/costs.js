const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for cost item
const CostsSchema = new Schema({

    description: {
        type: String
    },
    category: {
        type:String
    },
    userid : {
        type:Number
    },
    sum: {
        type:Number
    },
    date: {
        type: Date
    }
});

// Creating model for the cost
const Costs = mongoose.model('costs',CostsSchema,'costs');

// Exports the model so he can be used from the other modules
module.exports = Costs;
