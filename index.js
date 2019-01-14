const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const pg = require('pg');
const db = require('./db');
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// const configs = {
//   user: 'Sheryl',
//   host: '127.0.0.1',
//   database: 'exercise',
//   port: 5432,
// };

// const pool = new pg.Pool(configs);

// pool.on('error', function (err) {
//   console.log('idle client error', err.message, err.stack);
// });

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

 require('./routes')(app, db);

// Root GET request (it doesn't belong in any controller file)




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    db.pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
