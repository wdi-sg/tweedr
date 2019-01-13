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
        pool.query(`SELECT id FROM users WHERE name = '${request.cookies.loggedin}'`, (err, queryResult) =>{
            let queryString = queryResult.rows[0].id;
            pool.query(`SELECT DISTINCT(users.id), name, content FROM users INNER JOIN tweets ON (users.id = author_id) INNER JOIN follows ON (follows.user_id = ${queryString}) WHERE follows_id = users.id OR followers_id = users.id ORDER BY name ASC`, (err, queryResult) =>{
            let tweets = queryResult.rows;
            response.render('home',{list:tweets, user:[request.cookies.loggedin]});
            })
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

    pool.query("SELECT name FROM users", (err, queryResult) =>{
        let validate = true;
        let queryName = queryResult.rows;
        let paramName = request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1);
        for(let i = 0; i < queryName.length; i++){
            if(paramName == queryName[i].name){
                validate = false;
            }
        }
        if(validate === false){
            response.redirect('/users/new');
        }
        else if(validate === true){
            const queryString = 'INSERT INTO users (name, photo_url, nationality, username, password) VALUES ($1, $2, $3, $4, $5)';
            const values = [
                request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
                request.body.photo,
                request.body.nat,
                request.body.username,
                request.body.password
            ];

            pool.query(queryString, values, (error, queryResult) => {
                response.render('useradd', {list:values});
            });
        }
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
                pool.query(`SELECT id FROM users WHERE name = '${user.name}'`, (err, queryResult) =>{
                    let queryString = queryResult.rows[0].id;
                    pool.query(`SELECT DISTINCT(users.id), name, content FROM users INNER JOIN tweets ON (users.id = author_id) INNER JOIN follows ON (follows.user_id = ${queryString}) WHERE follows_id = users.id OR followers_id = users.id ORDER BY name ASC`, (err, queryResult) =>{
                    let tweets = queryResult.rows;
                    response.render('home',{list:tweets, user:[user.name]});
                    })
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

    if(request.cookies.loggedin !== undefined){
    pool.query(`SELECT id FROM users WHERE name = '${request.cookies.loggedin}'`, (err, queryResult) =>{
            let queryString = queryResult.rows[0].id;
            pool.query(`SELECT id, name, photo_url, nationality, user_id, follows_id, followers_id FROM users INNER JOIN follows ON (follows.user_id = ${queryString}) WHERE follows_id = users.id OR followers_id = users.id ORDER BY name ASC`, (err, queryResult) =>{
                let users = queryResult.rows;

                response.render('users', {list:users, user:[request.cookies.loggedin]});
            })
        })
    }
    else{
        pool.query("SELECT * FROM users ORDER BY name ASC", (err, queryResult) =>{
            let users = queryResult.rows;

            response.render('users', {list:users});
        })
    }
});

app.get('/users/list', (request, response) => {
        pool.query("SELECT * FROM users ORDER BY name ASC", (err, queryResult) =>{
            let users = queryResult.rows;

            response.render('users', {list:users});

        })
});

app.get('/profile', (request, response) => {

    if(request.cookies.loggedin !== undefined){
        pool.query(`SELECT * FROM users WHERE name = '${request.cookies.loggedin}'`, (err, queryResult) =>{
            let profile = queryResult.rows;
            pool.query(`SELECT content FROM users INNER JOIN tweets ON (users.id = author_id AND users.name = '${request.cookies.loggedin}')`, (err, queryResult) =>{
                let content = queryResult.rows;
                pool.query(`SELECT name FROM users INNER JOIN follows ON (users.id = follows_id) WHERE user_id = '${profile[0].id}' AND follows_id is not null`, (err, queryResult) =>{
                    let follows = queryResult.rows;
                    pool.query(`SELECT name FROM users INNER JOIN follows ON (users.id = followers_id) WHERE user_id = '${profile[0].id}' AND followers_id is not null`, (err, queryResult) =>{
                        let followers = queryResult.rows;
                        response.render('profile', {list:profile, contents:content, user:[request.cookies.loggedin], followsName:follows, followersName:followers});
                        })
                })
            })
        })
    }
    else{
        response.render('profile');
    }
});

app.get('/profile/:id', (request, response) => {

    let id = request.params.id;
    pool.query(`SELECT * FROM users WHERE id = '${id}'`, (err, queryResult) =>{
        let profile = queryResult.rows;
        pool.query(`SELECT content FROM users INNER JOIN tweets ON (users.id = author_id AND users.id = '${id}')`, (err, queryResult) =>{
            let content = queryResult.rows;
            pool.query(`SELECT name FROM users INNER JOIN follows ON (users.id = follows_id) WHERE user_id = '${profile[0].id}' AND follows_id is not null`, (err, queryResult) =>{
                let follows = queryResult.rows;
                pool.query(`SELECT name FROM users INNER JOIN follows ON (users.id = followers_id) WHERE user_id = '${profile[0].id}' AND followers_id is not null`, (err, queryResult) =>{
                    let followers = queryResult.rows;
                    response.render('profile', {list:profile, contents:content, followsName:follows, followersName:followers});
                })
            })
        })
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

app.post('/user/follow/:id', (request, response) => {

    if(request.cookies.loggedin !== undefined){
        let validate = true;
        pool.query(`SELECT id FROM users WHERE name = '${request.cookies.loggedin}'`, (err, queryResult) =>{
            let id = request.params.id;
            let userId = queryResult.rows;
            let queryText = "INSERT INTO follows (user_id, follows_id) VALUES ($1, $2)";
            const values = [userId[0].id, id];
            pool.query(`SELECT follows_id FROM follows WHERE user_id = '${userId[0].id}' AND follows_id is not null`, (err, queryResult) =>{
                let follows = queryResult.rows;
                for(let i = 0; i < follows.length; i++){
                    if(follows[i].follows_id == id){
                        validate = false
                    }
                    }
                    if(validate == false){
                        response.redirect('/users');
                    }
                    else if(validate == true){
                        pool.query(queryText, values, (err, queryResult) =>{
                        })
                        let queryString = "INSERT INTO follows (user_id, followers_id) VALUES ($1, $2)";
                        const valuesStr = [id, userId[0].id];
                        pool.query(queryString, valuesStr, (err, queryResult) =>{
                        })
                        response.redirect('/');
                    }
                })
        })
    }
    else{
            response.redirect("/users");
    }
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