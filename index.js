// npm install
// express
// jsonfile
// method-override
// express-react-views
// react
// react-dom
// cookie-parser


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
};

const pool = new pg.Pool(configs);

pool.on('err', function (err) {
  console.log('idle client err', err.message, err.stack);
});

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname+'/public/'));

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


// RESTful Routing
// URL          HTTP Verb   Action      SQL
// /photo/      GET         index       SELECT
// /photos/new  GET         new         N/A (SELECT)
// /photos      POST        create      INSERT
// /photos/:id  GET         show        SELECT
// /photos/:id/ edit        GET edit    SELECT
// /photos/:id  PATCH/PUT   update      UPDATE
// /photos/:id  DELETE      destroy     DELETE
// Root GET request (it doesn't belong in any controller file)


app.get('/', (request, response) => {
    var loggedin = request.cookies['loggedin'];
    if( loggedin === undefined ){
        response.redirect('/public');
    } else {
        response.redirect('/user');
    }
});


//public
app.get('/public', (request, response) => {
    const queryString = "SELECT * FROM tweets";
    pool.query(queryString, (err, queryResult) => {
        console.log(queryResult.rows);
        if (err) {
            console.log('query err', err.message);
        } else {
            response.render('homePublic', {'tweets': queryResult.rows});
        }
    });
});


app.get('/user', (request, response) => {
    var user_name = request.cookies['user'];
    const queryString1 = "SELECT * FROM users WHERE name ='"+user_name+"'";
    const queryString2 = "SELECT * FROM (SELECT follow.following_name AS name, tweets.id AS tweet_id, tweets.tweet_parent, tweets.msg, tweets.photo_url, tweets.created_dt FROM tweets INNER JOIN follow ON tweets.user_name = follow.following_name WHERE follow.follower_name ='"+user_name+"' UNION all SELECT user_name as name, id AS tweet_id, tweet_parent, msg, photo_url, created_dt FROM tweets WHERE user_name ='"+user_name+"') a ORDER BY a.created_dt DESC";
    pool.query(queryString1, (err1, queryResult1) => {
        if (err1) {
            console.log('query err', err1.message);
        } else {
            pool.query(queryString2, (err2, queryResult2) => {
                if (err2) {
                     console.log('query err', err2.message);
                } else {
                    result = {};
                    result.user_profile = queryResult1.rows;
                    result.tweets = queryResult2.rows;
                    console.log(result);
                    response.render('home', result);
                }
            })
        }
    });
});

app.post('/user/tweet/new', (request, response) => {
    const queryString1 = "INSERT INTO tweets (user_name, msg, photo_url) VALUES ($1, $2, $3) RETURNING id";
    let values1 = [];
    values1.push(request.cookies['user']);
    values1.push(request.body.msg);
    values1.push(request.body.photo_url);
    pool.query(queryString1, values1, (err1, queryResult1) => {
        if (err1) {
            console.log('query err', err1.message);
        } else {
            pool.query("UPDATE tweets SET tweet_parent = msg WHERE tweet_parent IS NULL", (err2, queryResult2) => {
            // console.log('result: ' + queryResult.rows);
                if (err2) {
                console.log('query err', err2.message);
                } else {
                response.redirect('/user');
                }
            });
        }
    });
});



//create a new account
app.get('/users/new', (request, response) => {
  response.render('form_register');
});

app.post('/users/new', (request, response) => {
    const queryString = "INSERT INTO users (name, password, profile_url) VALUES ($1, $2, $3) RETURNING name";
    const values = [];
        values.push(request.body.name);
        values.push(request.body.password);
        values.push(request.body.profile_url);
    // execute query
    pool.query(queryString, values, (err, queryResult) => {
        // console.log('result: ' + queryResult.rows);
        if (err) {
            console.log('query err', err.message);
        } else {
            response.cookie('loggedin', 'true');
            response.cookie('user', request.body.name);
            response.redirect('/');
        }
    });
});



//login
app.get('/users/login', (request, response) => {
  response.render('form_login');
});

app.post('/users/login', (request, response) => {
    const queryString = "SELECT name, password FROM users WHERE name ='"+request.body.name+"'";
    // execute query
    pool.query(queryString, (err, queryResult) => {
        // console.log(queryString);
        // console.log(queryResult);
        if (err) {
            console.log('query err', err.message);
        } else if (queryResult.rows.length === 0) {
            response.send(request.body.name + " does not exist in our system!");
        } else {
            const user = queryResult.rows[0];
            let password = user.password;
            if(password == request.body.password ) {
                response.cookie('loggedin', 'true');
                response.cookie('user', request.body.name);
                response.redirect('/')
            } else {
                response.send('Password is incorrect!')
            };
        };
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
