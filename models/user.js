const sha256 = require('js-sha256');

module.exports = (pool) => {
    
  const create = (user, callback) => {

    const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id';

    const values = [user.name, sha256(user.password)];

    pool.query(queryString, values, (error, queryResult) => {
      callback(error, queryResult);
    })
  }

  const get = (user, callback) => {

    const queryString = `SELECT * FROM users WHERE name = '${user.name}'`;

    pool.query(queryString, (error, queryResult) => {
      callback(error, queryResult);
    })
  }

  const getById = (id, callback) => {

    const queryString = `SELECT * FROM users WHERE id = '${id}'`;

    pool.query(queryString, (error, queryResult) => {
      callback(error, queryResult);
    })
  }
  

  const index = (callback) => {

    const queryString = `SELECT * FROM users ORDER BY id ASC;`;

    pool.query(queryString, (error, queryResult) => {
      callback(error, queryResult);
    })
  }

  return {
    create,
    get,
    getById,
    index
  }
}
