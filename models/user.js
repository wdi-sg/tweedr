var sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = dbPool => {
  const create = (params, callback) => {
    // run user input password through bcrypt to obtain hashed password

    var hashedValue = encrypt(params.password);

    // set up query
    const queryString =
      'INSERT INTO users (username, password) VALUES ($1, $2)';
    const values = [params.name, hashedValue];

    // execute query
    dbPool.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed
      callback(error, queryResult);
    });
  };

  const encrypt = item => {
    const salt = 'salty sia';
    return sha256(item + salt);
  };

  return {
    create,
    encrypt
  };
};
