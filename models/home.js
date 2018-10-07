var sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    const displayAllTweets = (callback) => {

        const queryString = "SELECT tweet.*, users.username FROM tweet INNER JOIN users ON (tweet.user_id = users.id);";

        dbPoolInstance.query(queryString, (error, result) => {

            callback(error, result.rows);

        });

    };

    const displayFollowerTweets = (currentUser, callback) => {

        const queryString = "SELECT tweet.*, follow.follower, users.username FROM tweet INNER JOIN follow ON (tweet.user_id = follow.follower) INNER JOIN users ON (follow.follower = users.id) WHERE username_id='" + currentUser + "';";

        dbPoolInstance.query(queryString, (error, result) => {
            callback(error, result.rows);
        });
    };

    const displayFollowingTweets = (currentUser, callback) => {

        const queryString = "SELECT tweet.*, follow.username_id, users.username FROM tweet INNER JOIN follow ON (tweet.user_id = follow.username_id) INNER JOIN users ON (follow.follower = users.id) WHERE follower='" + currentUser + "';";

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
        displayAllTweets,
        displayFollowerTweets,
        displayFollowingTweets,
        checkUser
    };
};