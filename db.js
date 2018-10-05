const pg = require('pg');
const url = require('url');
const user = require('./models/user');
const tweet = require('./models/tweet');

var configs;

if (process.env.DATABASE_URL) {

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

} else {
  configs = {
    user: 'liangxin',
    host: '127.0.0.1',
    database: 'tweedr',
    port: 5432
  };
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  user: user(pool),
  tweet: tweet(pool),

  pool: pool
};
