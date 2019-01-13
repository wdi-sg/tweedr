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
  user: 'ishak',
  host: '127.0.0.1',
  database: 'tweedr_db',
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
 * Routes
 * ===================================
 */

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {

    response.send('Welcome To Tweedr.');
});

app.get('/users/login', (request, response) => {
  response.render('user/newuser');
});

app.post('/users/login', (request, response) => {

    //if username and password are the same as in the DB, log them in
    const body = request.body;
    const queryString = `SELECT * FROM users WHERE name = '${body.name}' `;

    pool.query (queryString, (err, queryResponse) => {
        if (err) {
            console.log("Got error " + err);
        } else {
            console.log(queryResponse.rows);
        }

        //if user does not exist
        if (queryResponse.rows.length === 0) {
            console.log("User does not exist!")
        } else {
            console.log("User exist!"); //else if exist
            //queryResponse for current array 0, store in const user
            const user = queryResponse.rows[0];
            //let password be qeuryResponse.row[0].password...the ket
            let password = user.password;
            // if for password on log in is the same as password in DB
            if (password === body.password) {
                console.log("Password is correct!");
            } else {
                console.log("Incorrect password try again!");
            }
        }
    });


    // const values = [
    //     request.body.name,
    //     request.body.password
    // ];

    // execute query
    // pool.query(queryString, values, (error, queryResult) => {
        //response.redirect('/');
        // response.send('user created');
    // });
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