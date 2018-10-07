var sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

      var hashedValue = sha256(user.password);

      // set up query
      const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
      const values = [
        user.name,
        hashedValue
      ];

      // execute query
      dbPoolInstance.query(queryString, values, (error, result) => {
        // invoke callback function with results after query has executed
        callback(error, result);
        console.log(result.rows);
      });
    };

    const userLogin = (user, callback) => {

      var hashedValue = sha256(user.password);
      let name = user.name;

      const queryString = `SELECT * FROM users WHERE name='${name}'`;

      // execute query
      dbPoolInstance.query(queryString, (error, result) => {
        // invoke callback function with results after query has executed
        callback(error, result);
        console.log("result models: ", result.rows);
        //why is this queryResult.rows empty?
      });

    };

    return {
      create,
      userLogin
    };
};
