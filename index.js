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
  user: 'apple',
  host: '127.0.0.1',
  database: 'tweedr',
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
    let queryString = "SELECT * FROM users INNER JOIN tweets ON (tweets.user_id = users.id) WHERE users.id > 0"
    /*let queryString = "SELECT * FROM tweets"*/
    pool.query(queryString, (error, queryResult)=> {
        let obj = {"tweets": queryResult.rows};
        response.render("home", obj);
    })
});

app.get('/users/new', (request, response) => {
    response.render('user/newuser');
});

app.post('/users', (request, response) => {

    const queryText ='SELECT name from users WHERE id > 0';
    let nameFound = false;

    pool.query(queryText, (error, result) => {
        for (let i = 0; i < result.rows.length; i++ ) {
            if (result.rows[i].name === request.body.name) {
                nameFound = true;
                break;
            }
        }
        if (!nameFound) {
            const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
            const values = [
            request.body.name,
            request.body.password
            ];

            // execute query
            pool.query(queryString, values, (error, queryResult) => {
            //response.redirect('/');
            response.send('user created.');
            });
        }

        else {
            response.send('user name has been already used.');
        }
    })
});

app.get('/user/login', (request, response) => {
    response.render('user/login');
});

app.post('/user/tweet', (request, response)=> {
    let name = request.body.name;
    let password = request.body.password;

    const queryString = "SELECT id, password FROM users WHERE name=$1";
    const values = [name];

    pool.query(queryString, values, (error, queryResult)=> {
        let correctPassword = queryResult.rows[0].password;
        let id = queryResult.rows[0].id;
        let obj = {"name": name,
                    "id": id};

        if (correctPassword === password) {
        response.cookie("id", id);
        response.render('tweet/createtweet', obj);
        }

        else {
            response.send("incorrect password");
        }
    })
})

app.post('/user/tweet/update', (request, response)=> {
    let id = request.cookies["id"];
    let content = request.body.content;
    const queryString = "INSERT INTO tweets (content, user_id) VALUES ($1, $2)";
    const values = [content, id];
    pool.query(queryString, values, (error, queryResult) => {
    response.send(request.body);
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