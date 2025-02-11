const Users = require('../models/users');
const Costs = require('../models/costs');
const Reports = require('../models/report');

/**
 * Gets a user in the database by the ID provided in the url.
 *
 * @param {Number} user_id - The request object contains the user ID in the body.
 * @returns {Promise<Object>} Returns the user object or an error if the user is not found.
 */
async function getUser(user_id) {
    try {
        // Check if all the parameters sent correctly
        if (!user_id) {
            const error = new Error();

            error.name = "Missing parameters!";
            error.message = "Needed parameters are: ID";

            // Returning an error
            throw error;
        }

        //Trying to get the user from the DataBase
        const user = await Users.find({ id: user_id });

        //If the DateBase return empty array no user was found therefore return error
        if (user.length === 0) {
            const error = new Error();

            error.name = "Empty User";
            error.message = "No user was found!";

            // Returning an error
            throw error;
        }

        //If user was found return him
        return user;
    } catch (error) {
        //For any other error then empty array during the process return error
        throw new Error(error.message);
    }
}

/**
 * Adds a new cost item and updates the report with the new item.
 *
 * @param {Object} req - The request object contains the cost data in the body.
 * @returns {Promise<Object>} Returns the added cost object or an error if something goes wrong.
 */
async function addCost(req) {
    //Creating new Date object
    const currentDate = new Date();
    try {

        const { userid, description, category, sum } = req.body;

        // Check if all the parameters sent correctly
        if (!userid || !description || !category || !sum ) {
            const error = new Error();

            error.name = "Missing parameters!";
            error.message = "Needed parameters are: ID, description, category and sum";

            // Returning an error
            throw error;
        }

        //Getting the date, if the user didn't send date we set today's date.
        const date = req.body.date ? new Date(req.body.date) : currentDate;

        // Creating new Cost and updating it on the DataBase
        const cost = await Costs.create({
            userid: userid,
            description: description,
            category: category,
            sum: sum,
            date: date
        });

        let reportSummary = await getReport(userid, date.getMonth() + 1, date.getFullYear());

        // Getting the category array of items
        const categoryItems = reportSummary.costs[category];

        // Adding new item to the category array
        categoryItems.push({
            description: description,
            sum: sum,
            day: date.getDate(),
        });

        // Saving our updated Report in the DateBase
        await reportSummary.save(); // שמירה במסד הנתונים

        // Returning the cost item we just added
        return cost;


    } catch (error) {
        // Any error that comes up during the process will be sent here as an error object
        throw new Error(error.message);
    }
}

/**
 * Increments the total value for a given user.
 *
 * @param {Object} req - The request object, contains the user ID and other data.
 * @returns {Promise<Object>} Returns the result of the update operation, or an error if something goes wrong.
 */
async function incrementTotal(req) {
    try {
        const id = req.body.userid;

        // Check if all the parameters sent correctly
        if (!id) {
            const error = new Error();

            error.name = "Missing parameters!";
            error.message = "Needed parameters are: ID";

            // Returning an error
            throw error;
        }

        // Finding user in the DataBase by ID and increment his total items count by 1 and saving the result as an object
        // result contain the updated user returned by updateOne function
        const result = await Users.updateOne(
            { id: id }, // חיפוש משתמש לפי ה-ID
            { $inc: { total: 1 } } // העלאת הערך של total ב-1
        );

        //return the user that his details has changed
        return result;
    } catch (error) {
        // If there is an error finding the user by any stage return error object with the error reason
        throw new Error(error.message);
    }
}

/**
 * Return a report based on the given parameters: ID, year, and month
 * If no report exists for the given parameters, a new report is created and returned.
 *
 * @async
 * @function getReport
 * @param {string} id - The ID of the user for whom the report is being retrieved.
 * @param {number} month - The month (1-12) of the report.
 * @param {number} year - The year of the report.
 * @throws {Error} Will throw an error if any of the parameters (id, month, year) are missing or if an issue occurs during the process.
 * @returns {Promise<Object>} A promise that resolves to the report object, which contains the user's report data for the given month and year.
 */
async function getReport(id, month, year) {

    // Check if all the parameters sent correctly
    if (!id || !year || !month) {
        const error = new Error();

        error.name = "Missing parameters!";
        error.message = "Needed parameters are: ID, year and month";

        // Returning an error
        throw error;
    }

    try {
        // Trying to find the report according to the given parameters
        let report = await Reports.findOne({
            userid: id,
            year: year,
            month: month
        });

        // If there is no report we create one
        if (!report) {
            report = new Reports({
                userid: id,
                month: month,
                year: year,
                costs: {
                    //Array of all the categories at the report
                    food: [],
                    education: [],
                    health: [],
                    housing: [],
                    sport: []
                }
            });

            // Saving our new Report object as document in the DateBase
            await report.save();
        }

        // Returning the report
        return report;
    } catch (error) {
        // Any error that comes up during the process will be sent here as an error object
        throw new Error(error.message);
    }
}

/**
 * Adds a new user to the database.
 *
 * @param {Object} req - The request object contains the user data in the body.
 * @returns {Promise<Object>} Returns the created user object or an error if something goes wrong.
 */
async function addUser(req){
    try {

        const { id, first_name, last_name, birthday, marital_status } = req.body;

        // Check if all the parameters sent correctly
        if (!id || !first_name || !last_name || !birthday || !marital_status ) {
            const error = new Error();

            error.name = "Missing parameters!";
            error.message = "Needed parameters are: ID, firstname, lastname, birthday and martialstatus";

            // Returning an error
            throw error;
        }

        // Trying to add the user to the DataBase
        // user is an object with the created user details
        const user = await Users.create({
            id: req.body.id,
            first_name: first_name,
            last_name: last_name,
            birthday: birthday,
            marital_status: marital_status,
            total: 0
        });

        // Returning the user if everything worked
        return user;
    }
    catch (error) {
        // Any error that comes up during the process will be sent here as an error object
        throw new Error(error.message);
    }
}

// Exports the functions so they can be accessed from the api module
module.exports = {
    getUser,
    addCost,
    incrementTotal,
    getReport,
    addUser
};