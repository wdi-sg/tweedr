const pg = require('pg');
const users = require('./Models/users');

const configs = {
  user: 'Serene',
  host: '127.0.0.1',
  database: 'tweets',
  port: 5432,
};


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
    // get a reference to end the connection pool at server end
    users: users(pool),
    pool:pool
  };
  