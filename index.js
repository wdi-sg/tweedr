/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const pg = require('pg');

const configs = {
  user: 'the574life',
  host: '127.0.0.1',
  database: 'week5homework',
  port: 5432,
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
 * Functions
 * ===================================
 */

/**
 * ===================================
 * Routes
 * ===================================
 */

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
// loggedin cookies to check if user is logged or not
    var loggedin =  request.cookies['loggedin'];
//if loggedin is undefined, loginPage will be rendered to make user login
    if (loggedin === undefined){
        response.render('loginPage')}
// if loggedin is available, render homePage with user details
    else {
        var userid = request.cookies['id']
        let query = "SELECT * FROM users WHERE id ='"+userid+"'"

        pool.query(query, (err, queryResponse) => {
            const user = queryResponse.rows[0];
            const queryString = 'SELECT content FROM tweets';

            pool.query(queryString, (err, queryResult) => {
                let listOfTweedr = queryResult.rows;
                let obj = { user, listOfTweedr};
                response.render('homePage', obj);
                console.log (obj);
            })
        })
    }
});


// Post a new Tweedr
app.post('/:userid/tweedr', (request, response) => {
    var userid = request.cookies['id'];
    let query = "SELECT * FROM users WHERE id ='"+userid+"'";

    pool.query(query, (err, queryResponse) => {
        const user = queryResponse.rows[0];
        const queryString = 'INSERT INTO tweets (content, author_id) VALUES ($1,$2)';
        const values = [
            request.body.tweedr,
            user.id
            ];

            pool.query(queryString, values, (err, queryResult) => {
                response.send('tweet created');
                console.log(queryResult);
            })
        })
})


// Create New User Page
app.get('/users/new', (request, response) => {
  response.render('user/newuser');
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


// Login Page
app.post('/user/login', (request, response) => {
    let query = "SELECT * FROM users WHERE name ='"+request.body.name+"'";
    pool.query(query, (err, queryResponse) => {
        console.log(queryResponse.rows);

        if (queryResponse.rows.length === 0) {
            console.log("users doesnt exist");
        }
        else {
            console.log("user exists!!!!!!");

            const user = queryResponse.rows[0];
            let password = user.password;

            if (password === request.body.password) {
                response.cookie('loggedin', 'true');
                response.cookie('id', user.id);
                response.redirect('/');
            } else {
                console.log('password incorrect');
            }
        }
    })
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