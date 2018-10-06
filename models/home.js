var sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    const displayTweets = (callback) => {

        const queryString = "SELECT * FROM tweet INNER JOIN users ON (tweet.user_id = users.id);";

        dbPoolInstance.query(queryString, (error, result) => {

            callback(error, result.rows);

        });

    };

    const checkUser = (input, callback) => {

        let queryString = "SELECT * FROM users WHERE username='" + input.username + "';";

        dbPoolInstance.query(queryString, (error, result) => {

            callback(error, result.rows[0]);

        });
    };

    return {
        displayTweets,
        checkUser
    };
};