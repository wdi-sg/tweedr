const pg = require('pg');
const user = require('./models/user');
const home = require('./models/home');
const tweet = require('./models/tweet');
const url = require('url');


var configs = {

    user: 'saufi',
    host: '127.0.0.1',
    database: 'tweedr_db',
    port: 5432

};

// if( process.env.DATABASE_URL ){

//   const params = url.parse(process.env.DATABASE_URL);
//   const auth = params.auth.split(':');

//   configs = {
//     user: auth[0],
//     password: auth[1],
//     host: params.hostname,
//     port: params.port,
//     database: params.pathname.split('/')[1],
//     ssl: true
//   };

// }else{
//   configs = {
//     user: 'akira',
//     host: '127.0.0.1',
//     database: 'pokemons',
//     port: 5432
//   };
// }


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  user: user(pool),
  home: home(pool),
  tweet: tweet(pool),

  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool:pool
};
