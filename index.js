const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const pg = require('pg');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const configs = {
  user: 'postgres',
  password: 'postgres',
  host: '127.0.0.1',
  database: 'tweedr',
  port: 5432,
};

// sudo -u postgres createdb tweedr
// psql -d tweedr -U postgres -f table.sql;

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

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

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  response.send('Welcome To Tweedr.');
});

app.get('/users/new', (request, response) => {
  response.render('user/NewUser');
});

app.post('/users', (request, response) => {

    const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
    const values = [
        request.body.name,
        request.body.password
    ];

    // execute query
    pool.query(queryString, values, (error, queryResult) => {
        //response.redirect('/');
        response.send('user created');
    });
});

app.get('/users/login', (request, response) => {
  response.render('user/LoginPage');
});

app.post('/logging', (request, response) => {

    const queryString = `
      SELECT * 
      FROM users 
      WHERE name = '${request.body.name}'
      `;

    // execute query
    pool.query(queryString, (error, queryResult) => {
        //response.redirect('/');
        if (queryResult.rows.length === 0) {
          response.send('User does not exist');
        } else {
          if (queryResult.rows[0].password == request.body.password) {
            response.cookie('loggedin', 'true');
            response.send('Login Success!');
          } else {
            response.send('Password incorrect');
          }
        }
    });
});

app.get('/profile', (request, response) => {
    var loggedin = request.cookies['loggedin'];

    // see if there is a cookie
    if( loggedin == 'true' ){
        response.send("heres your secret stuff");

    }else{
        response.send("please login");
    }
});

app.get('/user/logout', (request, response) => {

  response.clearCookie('loggedin');

  response.send('you are logged out');
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
