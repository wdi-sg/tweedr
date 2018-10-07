var sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

      let hashedValue = sha256(user.password);

      // set up query
      let queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
      let values = [
        user.name,
        hashedValue
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    const userLogIn = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

      let hashedValue = sha256(user.password);

      // set up query
      let queryString = 'SELECT * FROM users WHERE name = ($1) AND password = ($2)';
      let values = [
        user.name,
        hashedValue
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    return {
      create,
      userLogIn
    };
};
