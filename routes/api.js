const express = require('express');
const router = express.Router();
const { getUser, addCost, incrementTotal, getReport, addUser } = require('../services/utilities');

/**
 * Handles the addition of a new user to the database
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function in the stack
 * @returns {JSON} - JSON response with the added user details or error
 */
router.post('/addUser',function(req,res,next){
    // Calling addUser function to add the user to the DataBase
    addUser(req)
        .then((user) => {
            // If the function returned empty user or null - not supposed to but added for safety
            if (!user) {
                // Returning an error since there is no certainty that the user was added
                return res.status(404).json({
                    title: "Something went wrong",
                    message: "Issue adding the user"
                });
            }

            // Return the JSON with the added user details
            res.status(200).json(user);
        }).catch((error) => res.status(404).json({
        // If an error was caught, return it in JSON format
        title: "Error name: " + error.name,
        error: error.message
    }));
});

/**
 * Handles the addition of a new cost item for the user
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function in the stack
 * @returns {JSON} - JSON response with the added user details or error
 */
router.post('/add', async function(req, res, next) {
    const userid = req.body.userid;
    try {
        // Using findUser to find if the user exist
        const user = await getUser(userid);

        // Using addCost to add new cost item
        const cost = await addCost(req);

        // Update user total items added counter
        const result = await incrementTotal(req);

        // Return the JSON with the added cost details
        res.status(200).json(cost);
    } catch (error) {
        // If an error was caught, return it in JSON format
        return res.status(404).json({
            title: "Error name: " + error.name,
            error: error.message
        });
    }
});

/**
 * Handles getting a user by their ID
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function in the stack
 * @returns {JSON} - JSON response with the added user details or error
 */
router.get('/users/:user_id',function(req,res,next){
    const  userid = req.params.user_id;
    // Calling getUser to find and return user by ID and Return the JSON with user details or error if necessary
    getUser(userid).then((user) =>
        res.status(200).json({id : user[0].id, name: user[0].first_name, last_name: user[0].last_name, total: user[0].total})).catch((error) =>
        res.status(404).json({title: "Error name: " + error.name, error: error.message}));

});

/**
 * Handles getting a report based on the request parameters
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function in the stack
 * @returns {JSON} - JSON response with the added user details or error
 */
router.get('/report', function(req, res, next) {
    // Getting the parameters from the request
    const { id, year, month } = req.query;

    // Calling getReport to find and return the requested report by ID and date
    getReport(id, month, year)
        .then((report) => {
            if (!report) {
                return res.status(404).json({
                    title: "Report not found",
                    message: "No report found for the given parameters."
                });
            }
            // Return the JSON with the report
            res.status(200).json(report);
        })
        .catch((error) => {
            // If an error was caught, return it in JSON format
            res.status(500).json({
                title: "Error name: " + error.name,
                error: error.message
            });
        });
});

/**
 * Handles getting team members' information
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function in the stack
 * @returns {JSON} - JSON response with the added user details or error
 */
router.get('/about',function(req,res,next){

    // Returning JSON with the team members information
    res.status(200).json([{
        first_name: "Ben",
        last_name: "Kapag"
    },
        {
            first_name: "Oron",
            last_name: "Avisrur"
        }
    ]);
});

module.exports = router;