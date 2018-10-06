var sha256 = require("js-sha256");

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = dbPoolInstance => {
  const create = (user, callback) => {
    // run user input password through bcrypt to obtain hashed password

    var hashedValue = sha256(user.password);

    // set up query
    const queryString = "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *";
    const values = [user.name, hashedValue];

    // execute query
    dbPoolInstance.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed
      callback(error, queryResult);
    });
  };

  const login = (user, callback) => {
      const queryString = "SELECT * FROM users WHERE name = '"+user.name+"'";
      dbPoolInstance.query(queryString, (err, queryResult) => {
          callback(err, queryResult)
      })
  }

  return {
    create,
    login
  };
};
