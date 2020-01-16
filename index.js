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
  host: '127.0.0.1',
  database: 'tweedr',
  port: 5432,
  password: 'postgres'
};

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

    const queryString = 'INSERT INTO users (name,email,password,photo) VALUES ($1, $2,$3,$4)';
    const values = [
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.photo

    ];

    // execute query
    pool.query(queryString, values, (error, queryResult) => {
        //response.redirect('/');
        //response.send('user created');
        response.send(request.body);
    });
});

app.get('/tweets/new', (request, response) => {
  response.render('user/NewTweet');
});

app.post('/tweets', (request, response) => {

    const queryString = 'INSERT INTO tweets (content, created_at,users_id) VALUES ($1, $2,$3)';
    const values = [
        request.body.content,
        request.body.created_at,
        request.body.users_id
    ];

    // execute query
    pool.query(queryString, values, (error, queryResult) => {
        response.redirect('/');
        //response.send('user created');
    });
});

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
