var sha256 = require('js-sha256');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = dbPool => {
  const encrypt = item => {
    const salt = 'salty sia';
    return sha256(item + salt);
  };

  const create = (params, callback) => {
    // run user input password through bcrypt to obtain hashed password

    const hashedPassword = encrypt(params.password);

    // set up query
    const queryString =
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
    const values = [params.name, hashedPassword];

    // execute query
    dbPool.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed
      callback(error, queryResult);
    });
  };

  const login = (params, callback) => {
    const queryString = 'SELECT * FROM users WHERE username = ($1)';
    const values = [params.name];

    dbPool.query(queryString, values, (error, queryResult) => {
      callback(error, queryResult);
    });
  };

  const followers = (params, callback) => {
    const queryString = 'SELECT * FROM users WHERE id != ($1)';
    const values = [params.id];

    dbPool.query(queryString, values, (error, queryResult) => {
      callback(error, queryResult);
    });
  };

  return {
    encrypt,
    create,
    login,
    followers
  };
};
