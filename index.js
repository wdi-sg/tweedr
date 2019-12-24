const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const pg = require('pg');

const configs = {
  user: 'Serene',
  host: '127.0.0.1',
  database: 'tweets',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const app = express();

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



////////////////////// MAIN CODE //////////////////////


// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  let loggedin = request.cookies['loggedin'];
  let user = request.cookies['user'];

  if (loggedin === undefined){
    response.redirect('/login')
  } else {
    response.redirect("/user/profile");
  }
});


// GET request for new user creation
app.get('/users/new', (request, response) => {
  response.render('user/newuser');
});

// POST request for new user creation
app.post('/users', (request, response) => {
    const queryString = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const values = [
        request.body.name,
        request.body.password
    ];

    // execute query
    pool.query(queryString, values, (error, queryResult) => {
      // response.send('User created!');
        response.redirect('/login')
    });
});


// GET request for user login
app.get('/login', (request, response) => {
  response.render('user/login');
});


// POST request for user login
app.post('/login', (request, response) => {

  const queryString = 'SELECT * FROM users WHERE username=$1 AND password=$2';
  const values = [
      request.body.name,
      request.body.password
  ];

  // execute query
  pool.query(queryString, values, (error, queryResult) => {
    console.log(queryResult.rows);
      if (queryResult.rows.length === 0) {
        response.send("Wrong username or password. Please try again.")
      } else {
          response.cookie('loggedin', 'true');
          response.cookie('user', queryResult.rows[0].username);
          response.redirect("/user/profile");
      }
  });
});

// GET request for user logout
app.get('/logout', (request, response) => {
  response.clearCookie('loggedin');
  response.clearCookie('user');
  response.redirect('/login');
});

// GET request for user profile
app.get('/user/profile', (request, response) => {
  let user = request.cookies['user'];

  const queryString = 'SELECT users.username, tweets.content  FROM tweets INNER JOIN users ON users.id=tweet';
 
  // execute query
  pool.query(queryString, (error, queryResult) => {
    console.log(queryResult.rows);
        response.render('/user/profile', {tweets: queryResult.rows});
  });
});



/////////////////////////////////////////////////////

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
