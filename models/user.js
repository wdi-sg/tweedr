var sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const loggedIn = (requestBody, callback) => {
        let queryString = 'SELECT * FROM users WHERE name =' + "'" + requestBody.name + "'";

        dbPoolInstance.query(queryString, (error, queryResult) => {

            callback(error, queryResult);

        });
    }

    //creating new user
    const create = (user, callback) => {
        // run user input password through bcrypt to obtain hashed password

        var hashedValue = sha256(user.password);

        // set up query
        // insert data about new user to table
        const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id';
        const values = [
            user.name,
            hashedValue
        ];

        // execute query
        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            // invoke callback function with results after query has executed

            callback(error, queryResult);
        });
    };

    const allUsers = (callback) => {
        const queryString = 'SELECT * FROM users';

        dbPoolInstance.query(queryString, (error, queryResult) => {

            callback(error, queryResult);
        });
    }

    const individuals = (userId, callback) => {
        const queryString = 'SELECT tweets.id, users.name, tweets.tweet FROM users INNER JOIN tweets ON (users.id = tweets.user_id) WHERE users.id = ' + userId;

        dbPoolInstance.query(queryString, (error, queryResult) => {

            // select all of current user's followers
            const secondQueryString ='SELECT users.id, name FROM users INNER JOIN followers ON ( followers.follower_user_id = users.id) WHERE followers.user_id = '+ userId;

            dbPoolInstance.query(secondQueryString, (error, secondQueryResult) => {

                // select all current user is following
                const thirdQueryString = 'SELECT users.id, name FROM users INNER JOIN followers ON ( followers.user_id = users.id) WHERE followers.follower_user_id = ' + userId;
                dbPoolInstance.query(secondQueryString, (error, thirdQueryResult) => {
                callback(error, queryResult, secondQueryResult, thirdQueryResult);
                });
            });
        });
    }

    const follow = (requestToFollow, userName, callback) => {
        const queryString = 'SELECT id FROM users WHERE users.name =' + "'" + userName + "'";
        console.log('current user username', userName)

        dbPoolInstance.query(queryString, (error, queryResult) => {
            console.log('currentuser', queryResult)

            const secondQueryString = 'INSERT INTO followers (user_id, follower_user_id) VALUES ($1, $2) RETURNING *';
            const values = [requestToFollow, queryResult.rows[0].id];

            dbPoolInstance.query(secondQueryString, values, (error, secondQueryResult) => {
                callback(error, secondQueryResult);
            });
        });

    }


    return {
        loggedIn,
        create,
        allUsers,
        individuals,
        follow
    };
};