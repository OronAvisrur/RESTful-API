const mongoose = require('mongoose');

/**
 * This function attempts to connect to a MongoDB Atlas DataBase
 *
 * @async
 * @function connectDB
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 */

 const connectDB = async function () {

     // The MongoDB connection string
    const uri = "mongodb+srv://RESTfulUsers:RESTfulUsers@usersdata.tbvwy.mongodb.net/ProjectDatabase?retryWrites=true&w=majority&appName=UsersData";

    try {
        // Trying to connect to the MongoDB Atlas database
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        // Any error that comes up during the connection will be sent here as an error object
        console.error("Error connecting to MongoDB:", error);
        // Closing the program since it has no use without connection to the DataBase
        process.exit(1);
    }
}

// Exports the MongoDB connection so they can be accessed from the app module
module.exports = connectDB;


