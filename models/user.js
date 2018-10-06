const sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (pool) => {
    const create = (user, callback) => {
      // run user input password through bcrypt to obtain hashed password

      let hashedValue = sha256(user.password);

      // set up query
      const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
      const values = [
        user.name,
        hashedValue
      ];

      // execute query
      pool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    };
///////////////////////////////////////////////////////////
    const getUser = (userName, callback) => {
        console.log("Inside Model: name: ", userName);

        let queryText = "SELECT * FROM users WHERE name = '"+userName+"'";

        pool.query(queryText, (error, queryResult) => {
          if (error){
            console.log("Error!", error);
            response.status(500).send('Server error');
          }
          else{
            if(queryResult.rows[0] === undefined){
              callback(null, null);
            }
            else{
              const sqlQueryResultUser = queryResult.rows[0];
              console.log('Query status: Success!!', sqlQueryResultUser);
              callback(null, sqlQueryResultUser);
            }
          }
        });
    }

    return {
      getUser,
      create
    };
};
