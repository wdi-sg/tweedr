const sha256 = require('js-sha256');

module.exports = (pool) => {
    
  const create = (user, callback) => {

    const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id';

    const values = [user.name, sha256(user.password)];

    pool.query(queryString, values, (error, queryResult) => {
      callback(error, queryResult);
    })
  }

  const checkDuplicate = (user, callback) => {

    const queryString = `SELECT * FROM users WHERE name = '${user.name}'`;

    pool.query(queryString, (error, queryResult) => {
      callback(error, queryResult);
    })
  }

  return {
    create,
    checkDuplicate
  }
}
