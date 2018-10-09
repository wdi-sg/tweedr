//BASIC CONFIG FOR THE DATABASE, AND TO EXPORT POOL

const pg = require('pg');
const user = require('./models/user');
const url = require('url');
//IF YOU CREATE NEW CONTROLLER, NEED TO REQUIRE IT HERE; DB REQUIRES MODELS
// const tweets = require('./models/tweets');

var configs;

if( process.env.DATABASE_URL ){

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

}else{
  configs = {
    user: 'admin',
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

//JUST A REFERENCE SO THAT ANYTHINGG THAT REF USER, HAS THE ABILITY TO POOL -> DB.USER
//CENTRALIZED PLACE TO PROVIDE POOL FN TO ALL MODELS
//EACH TABLE HAS ONE CONTROLLER, SO NEED TO HAVE ITS OWN POOL (DEALING WITH MODEL ONLY, NOTHING TO DO WITH CONTROLLER)
  user: user(pool),
  // tweet: tweet(pool),

  //make queries directly from here //JUST ANOTHER FUNCTION BUT WRITTEN IN A DIFFERENT WAY
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },


  // get a reference to end the connection pool at server end
  pool:pool

};
