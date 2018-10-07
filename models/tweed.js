var sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const newTweed = (tweed, callback) => {

        // set up query
        const queryString = 'INSERT INTO tweeds (tweed, user_id) VALUES ($1, $2) RETURNING *';
        const values = [
            tweed.tweed,
            tweed.user_id
        ];

        // execute query
        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            // invoke callback function with results after query has executed

            callback(error, queryResult);
        });
    };

    return {
        newTweed
    };
};