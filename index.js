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
    database: 'tweedr_db',
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
app.use(express.static(__dirname + '/public/'));


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
    var loggedIn = request.cookies['loggedIn'];
    if (loggedIn === undefined) {
        response.cookie('loggedIn', false);
    }
    response.render('default');
});

app.get('/users/new', (request, response) => {
    response.render('user/newuser');
});

app.get('/users/login', (request, response) => {
    response.render('user/login');
});

app.post('/users/login', (request, response) => {
    const queryString = 'SELECT * FROM users WHERE username=$1 OR password=$2';
    const values = [
        request.body.username,
        request.body.password
    ];
    pool.query(queryString, values, (error, queryResult) => {

        let accountFound = queryResult.rows.find(result => {
            return result.username === values[0] && result.password === values[1];
        })
        if (accountFound) {
            response.cookie('loggedIn', true);
            response.cookie('account', accountFound.username);
            response.render('default');
        } else if (!accountFound && queryResult.rows.find(result => {
                return result.username === values[0];
            })) {
            response.render('user/login', {'error': 'password'})
        } else {
            response.render('user/login', {'error': 'username'})
        }
    });

})

app.post('/users', (request, response) => {
    const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const values = [
        request.body.username,
        request.body.password
    ];
    // execute query
    pool.query(queryString, values, (error, queryResult) => {
        //response.redirect('/');
        response.send('user created');
    });
});

app.get('/users/tweed', (request, response) => {
    console.log(request.cookies);
    if (request.cookies.loggedIn === 'true'){
        response.render('user/tweed', request.cookies);
    } else {
        response.render('user/noTweed');
    }
});

app.get('/users/tweed', (request, response) => {
    console.log(request.cookies);
    if (request.cookies.loggedIn === 'true'){
        response.render('user/tweed', request.cookies);
    } else {
        response.render('user/noTweed');
    }
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function () {

    server.close(() => {
        console.log('Process terminated')
        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);