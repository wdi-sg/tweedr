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
  user: 'andrealmj',
  host: '127.0.0.1',
  database: 'tweedrdb',
  port: 5432,
  password: 'pg'
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

    var loggedin = request.cookies['loggedin'];

    //see if user is logged in (i.e. loggedin cookie exists)
    if ( loggedin === undefined ) {
        //display all tweets as a user who is NOT logged in
        pool.query('SELECT * FROM tweets', (err, result) => {
            if (err) {
                console.error('query error: ', err.stack);
                response.send('query error');
            } else {
                response.render('home', {tweets: result.rows});
            }
        })
    } else {
        // response.send("you're logged in man");
        pool.query("SELECT * FROM tweets", (err, result) => {
            if (err) {
                console.error('query error: ', err.stack);
                response.send('query error');
            } else {
                response.render('user/LoggedInUser', {tweets: result.rows});
            }
        })
    }


    //allow user to register a new account
    app.get('/users/new', (request, response) => {
        response.render('user/NewUser');
    });


    //allow user to login to then create a tweet
    app.get('/login', (request, response) => {
        response.render('loginPage');
    });

    app.post('/login',  (request, response) => {

        //if the username and password match those in the database, log them in
        let query = "SELECT * FROM users WHERE username='"+request.body.username+"'";

        pool.query(query, (err, queryResponse) => {
            console.log( "query response:", queryResponse.rows );

            //if the user doesn't exist
            if (queryResponse.rows.length === 0) {
                console.log("user doesn't exist");
                response.send("<html><body><h3>User does not exist!</h3><br /><button><a href='/'>Home</a></button><button><a href='/login'>Back to Login Page</a></button>");
            } else {
                //if the user exists, check for correct password
                console.log("user exists");

                const user = queryResponse.rows[0];
                let password = user.password;

                if (password == request.body.password) {
                    //correct password
                    console.log('correct password');
                    //set user cookie as LOGGED IN = TRUE
                    response.cookie('loggedin', 'true');

                    pool.query('SELECT * FROM tweets', (err, result) => {
                        if (err) {
                            console.error('query error: ', err.stack);
                            response.send('query error');
                        } else {
                            //since user has logged in successfully, user can now create a tweet on the home page
                            response.render('user/LoggedInUser', {tweets: result.rows});
                        }
                    });
                } else {
                    //incorrect password
                    console.log("incorrect password");
                    response.send("<html><body><h3>Incorrect password!</h3><br /><button><a href='/'>Home</a></button><button><a href='/login'>Back to Login Page</a></button>");
                }
            }
        })
    });

    app.get('/logout', (request, response) => {
        response.clearCookie('loggedin');
        // response.send("You have logged out!");
        response.redirect('/');
    });
});

//accept newly-registered user data
app.post('/users', (request, response) => {

    const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    let values = [
        request.body.username,
        request.body.password
    ];

    pool.query(queryString, values, (error, result) => {
        //response.redirect('/');
        //response.cookie('loggedin', 'true');
        response.send("<html><body><h3>User created!</h3><br /><button><a href='/'>Home</a></button><button><a href='/login'>Login</a></button>")
    });
});

//create new tweet
app.get('/tweets/new', (request, response) => {
    response.render('newTweet');
});

//accepts and posts new tweet
app.post('/tweets/new', (request, response) => {
    const newTweet = 'INSERT INTO tweets (content) VALUES ($1)';
    let values = [request.body.content];

    pool.query(newTweet, values, (error, result) => {
        console.log(result.rows);
        response.redirect('/');
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
