const pg = require('pg');
const tweets = require('./models/tweets');

const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'tweedr',
  port: 5432,
  password: 'pg'
};
const pool = new pg.Pool(configs);
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
    queryInterface: (text, params, callback) => {
       return pool.query(text, params, callback);
    },

    tweets: tweets(pool),

    pool: pool
};