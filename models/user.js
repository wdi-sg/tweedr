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
        callback(error, null);
      } else {
        callback(null, queryResult.rows[0]);
      }
    });
  };

  return {
    create
  };
};
