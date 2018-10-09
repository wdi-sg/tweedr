//DATABASE INTERFACE, THOUGH BOTH M AND C ARE QUERY, IT IS ONLY DOING THE QUERY
//WE EXECUTE THE QUERY IN MODELS, BUT YOU DONT DEAL WITH RESULT HERE. INSTEAD PASS OVER TO CONTROLLER


var sha256 = require('js-sha256');

//NO RENDERING, JUST DRAFTING OF FUNCTIONS

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {

    const encrypt = item => {
        const salt = 'salt';
        return sha256(item + salt);
    };


    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

      var hashedValue = encrypt(user.password);

      // set up query
      const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
      const values = [user.name,hashedValue];

      // execute query
      dbPool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };



    const login = (user, callback) => {

      // set up query
      const queryString = 'SELECT * FROM users WHERE name = ($1)';
      const values = [user.name];
      // execute query
      dbPool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };

    return {
        encrypt,
        create,
        login
    };
};







