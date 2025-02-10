const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the user
const UsersSchema = new Schema({

    id: {
        type: String
    },
    first_name: {
        type:String
    },
    last_name: {
        type:String
    },
    birthday: {
        type:String
    },
    marital_status: {
        type:String
    },
    total: {
        type:Number
    },

});

// Creating model for the user
const Users = mongoose.model('users',UsersSchema,'users');

// Exports the model so he can be used from the other modules
module.exports = Users;
