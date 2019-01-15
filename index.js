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
  user: 'jasonw',
  host: '127.0.0.1',
  database: 'tweedr',
  port: 5432,
  password: '1234'
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

//Get the login form for user to login
app.get('/', (request, response) => {
  response.render('login');
});

app.post('/', (request, response) => {

    // if the user name and password are the same as in the DB, log them in
    let queryString = "SELECT * FROM usersInfo WHERE name='"+request.body.name+"'";
    pool.query(queryString, (err, queryResponse) => {
        //response.send('hellooooo');

        console.log( queryResponse.rows );
        // if the user doesnt exist
        if( queryResponse.rows.length === 0 ){
            console.log("user doesnt exist");
        }else{
            console.log("user exists!!!!!!");
            const user = queryResponse.rows[0];
            let password = user.password;
            if( password == request.body.password ){
                //password is correct
                console.log('PASSWORD CORRECT TOO');
                response.cookie('loggedin', 'true');
                res
            }else{
                // password is incorrect
                console.log('PASSWORD not correct');
                response.send("Password is incorrect");
            }
        }

    })
});

app.get('/user/logout', (request, response) => {

  response.clearCookie('loggedin');
  response.send('you are logged out');
})



// Root GET request (it doesn't belong in any controller file)
// Get Form for login page


//Creates a form to create a new user
/*app.get('/users/new', (request, response) => {
  response.render('user/newuser');
});*/


//Create a user and store in database
app.post('/users', (request, response) => {

    const queryString = 'INSERT INTO usersInfo (name, password) VALUES ($1, $2)';
    const values = [
        request.body.name,
        request.body.password
    ];

    // execute query
    pool.query(queryString, values, (error, queryResult) => {
        response.redirect('/user/newuser', {usersInfo: queryResult.rows});
        //response.send('user created');
    });
});

//Display all tweets
app.get('/tweets', (req, res) => {
    const queryString = 'SELECT * FROM tweets';

    pool.query(queryString, (err, queryResult) => {
        if (err) {
            console.log('Error', error);
        } else {
            //console.log(" Result ", queryResult.rows);
            res.render("tweets", {tweets: queryResult.rows});
        }
    })
})

// Adding tweets
app.post('/tweets', (request, response) => {
    let queryString = 'INSERT INTO tweets (userTweet, usersInfo_Id, name) VALES ($1,$2,$3)';

    const values = [request.body.text, request.body.body.usersInfo_Id,request.body.name];

    pool.query(queryString, values, (err,queryResult) => {
        if (err) {
            console.log("Error", err);
        }
        console.log("tweets", {tweets: queryResult.rows});
        //response.redirect('/home');
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
