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
  user: 'sean',
  host: '127.0.0.1',
  database: 'testdb',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

// Init express app
const app = express();

// this line sets css files path
app.use(express.static('public'));

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
    if(request.cookies.loggedin !== undefined){
        pool.query('SELECT users.id, name, content FROM users INNER JOIN tweets ON (users.id = author_id) ORDER BY name ASC', (err, queryResult) =>{
            let tweets = queryResult.rows;
            response.render('home',{list:tweets, user:[request.cookies.loggedin]});
        })
    }
    else{
        response.render('home');
    }
});

app.get('/users/new', (request, response) => {
  response.render('newuser');
});

app.post('/users/add', (request, response) => {

    const queryString = 'INSERT INTO users (name, photo_url, nationality, username, password) VALUES ($1, $2, $3, $4, $5)';
    const values = [
        request.body.name,
        request.body.photo,
        request.body.nationality,
        request.body.username,
        request.body.password
    ];

    // execute query
    pool.query(queryString, values, (error, queryResult) => {
        //response.redirect('/');
        response.render('useradd', {list:values});
    });
});

app.get('/user/signin', (request, response) => {
    if(request.cookies.loggedin !== undefined){
        response.render('signin', {list:['disabled']});
    }
    else{
        response.render('signin');
    }
});

app.post('/user/signin', (request, response) => {

    let queryString = `SELECT * FROM users WHERE username='${request.body.username}'`;

    pool.query(queryString, (err, queryResult) => {

        // if the user doesnt exist
        if(queryResult.rows.length === 0){
            response.render('signin', {list:['error']});
        }
        else{

            const user = queryResult.rows[0];

            let password = user.password;

            if(password == request.body.password){
                response.cookie('loggedin', user.name);
                pool.query('SELECT users.id, name, content FROM users INNER JOIN tweets ON (users.id = author_id) ORDER BY name ASC', (err, queryResult) => {
                    response.render('home', {list:queryResult.rows, user:[user.name]});
                })
            }
            else{
                response.render('signin', {list:['error']});
            }
        }
    })
});

app.get('/user/signout', (request, response) => {

  response.clearCookie('loggedin');

  response.redirect('/');
});

app.get('/users', (request, response) => {

    pool.query('SELECT * FROM users ORDER BY name ASC', (err, queryResult) =>{
        let users = queryResult.rows;

        response.render('users', {list:users});
    })
});

app.get('/users/tweet/:name/new', (request, response) => {

    let name = request.params.name;

    pool.query(`SELECT * FROM users WHERE name = '${name}'`, (err, queryResult) =>{
        console.log(queryResult.rows)
        response.render('tweetnew', {list:queryResult.rows});
    })
});

app.post('/users/tweet/:id/add', (request, response) => {

    let id = request.params.id;
    let tweet = request.body.tweet;

    let queryText = "INSERT INTO tweets (content, author_id) VALUES ($1, $2)";
    const values = [tweet, id];
    pool.query(queryText, values, (err, queryResult) =>{
        response.redirect("/");
    })
});

// app.POST('/users/:id/follows', (request, response) => {

//     pool.query('SELECT * FROM users ORDER BY name ASC', (err, queryResult) =>{
//         let users = queryResult.rows;

//         response.render('users', {list:users});
//     })
// });

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