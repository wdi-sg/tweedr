console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const pg = require('pg');

// Initialise postgres client
const configs = {
    user: 'ronniechua',
    host: '127.0.0.1',
    database: 'tweedr',
    port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));
app.use(cookieParser());


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
app.get('/', (req, res) => {
    // query database for all pokemon
    var loggedin = req.cookies['loggedin'];

    // see if there is a cookie
    if (loggedin === undefined) {
        res.send("You are not logged in! <a href = '/user/login'>click here</a> to login");

    } else {
        pool.query('SELECT * FROM tweets JOIN users ON users.id = tweets.author_id', (err, queryResult) => {
            if (err) {
                console.log(err);
            }
            let tweet = {};
            tweet.list = [];
            tweet.list = queryResult.rows;

            res.render('home', tweet);
        });
    }
});

app.get('/user/login', (request, response) => {
    response.render('login');
})


app.post('/user/login', (request, response) => {
    // if the user name and password are the same as in the DB, log them in

    let query = "SELECT * FROM users WHERE username= '" + request.body.name + "'";

    pool.query(query, (err, queryResponse) => {


        //response.send('hellooooo');

        console.log(queryResponse.rows);

        // if the user doesnt exist
        if (queryResponse.rows.length === 0) {
            console.log("user doesnt exist");
        } else {
            console.log("user exists!!!!!!");

            const user = queryResponse.rows[0];

            console.log(user);
            let password = user.password;
            console.log(user.password);
            console.log(request.body.password);
            if (password == request.body.password) {
                //password is correct
                console.log('PASS WORD CORRECT TOO');
                response.cookie('loggedin', 'true');
                response.redirect('/');
            } else {
                // password is incorrect
                console.log("password incorrect")
                response.redirect('/user/login')
            }
        }
    })
});

app.get('/user/logout', (request, response) => {

  response.clearCookie('loggedin');

  response.send("Successfully logged out! <a href = '/user/login'> click here </a> to login");
})

app.get('/user/new', (request, response) => {
    response.render('user/newuser');
});

app.post('/user', (request, response) => {

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



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function() {

    server.close(() => {
        console.log('Process terminated')
        pool.end(() => console.log('Shut down db connection pool'));
    })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);