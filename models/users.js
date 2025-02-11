const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema for Users collection.
 * @typedef {Object} User
 * @property {number} id - Unique identifier for the user.
 * @property {string} first_name - The user's first name.
 * @property {string} last_name - The user's last name.
 * @property {Date} birthday - The user's birthdate.
 * @property {string} marital_status - The user's marital status.
 * @property {number} [total] - The total amount associated with the user (optional).
 */
const UsersSchema = new Schema({

    id: {
        type: Number,
        required: true,
        unique: true,
    },
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String,
        required: true
    },
    birthday: {
        type:Date,
        required: true
    },
    marital_status: {
        type:String,
        required: true
    },
    total: {
        type:Number
    },

});

// Creating model for the user
const Users = mongoose.model('users',UsersSchema,'users');

// Exports the model so he can be used from the other modules
module.exports = Users;
