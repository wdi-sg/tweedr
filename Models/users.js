module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope
    return {
        createUser: (user, callback) => {
            // set up query
            const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
            const values = [
                user.name,
                user.password
            ];


            // execute query
            dbPoolInstance.query(queryString, values, (error, queryResult) => {
                // invoke callback function with results after query has executed
                callback(error, queryResult);
            });
        },

        retrieveUser: (user, callback) => {
            const queryString = 'SELECT * FROM users WHERE username=$1 AND password=$2';
            const values = [
                user.name,
                user.password
            ];

            dbPoolInstance.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};