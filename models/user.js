const sha256 = require('js-sha256');


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (pool) => {
  const create = (user, callback) => {
    const hashedValue = sha256(user.password);
    const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
    const values = [
      user.name,
      hashedValue
    ];

    pool.query(queryString, values, (error, queryResult) => {
      if (error) {
        console.log('error creating user:', error);
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  const get = (username, callback) => {
    const queryString = `SELECT * FROM users WHERE name = '${username}'`;
    pool.query(queryString, (error, queryResult) => {
      if (error) {
        console.log('error getting user:', error);
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  return {
    create,
    get
  };
};
