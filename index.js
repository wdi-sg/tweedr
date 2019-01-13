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
  password: 'postgres',
  host: '127.0.0.1',
  database: 'tweedr',
  port: 5432,
};

// sudo -u postgres createdb tweedr
// psql -d tweedr -U postgres -f table.sql;

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

const home =  ( text, response ) => {
  pool.query(text,(err, res) => {
    let tweets = {};
      tweets.list=[];
      for(let i = 0; i < res.rows.length; i++){
              tweets.list.push(res.rows[i]);
          }
      response.render('Home', tweets);
  });
}

const authenticate =  ( text, request, response ) => {
  pool.query(text, (error, res) => {
      //response.redirect('/');
      if (res.rows.length === 0) {
        response.send('User does not exist');
      } else {
        if (res.rows[0].password == request.body.password) {
          response.cookie('loggedin', 'true');
          response.cookie('userID', res.rows[0].id);
          response.send('Login Success!');
        } else {
          response.send('Password incorrect');
        }
      }
  });
}

// homepage which shows all tweets
app.get('/', (request, response) => {

  var loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){

      const text = `
          SELECT tweets.*, users.name 
          FROM tweets
          INNER JOIN users
          ON tweets.user_id = users.id
          `;
      
      home(text, response);

    }else{
        response.render('Unregistered');
    }

});

//user registration page
app.get('/user/new', (request, response) => {
  var loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){
        response.render('user/LoggedIn');

    }else{
        response.render('user/NewUser');
    }

});

//user registration successful
app.post('/user/registered', (request, response) => {

    const values = [
        request.body.name,
        request.body.password
    ];

    const text = 'INSERT INTO users (name, password) VALUES ($1, $2)';

    pool.query(text, values, (error, res) => {
        response.send('user created');
    });
});

//user login page
app.get('/user/login', (request, response) => {

    var loggedin = request.cookies['loggedin'];
    
    if( loggedin == 'true' ){
        response.render('user/LoggedIn');

    }else{
        response.render('user/LoginPage');
    }

});

//user authentication
app.post('/logging', (request, response) => {

    const text = `
      SELECT * 
      FROM users 
      WHERE name = '${request.body.name}'
      `;

    authenticate(text, request, response);
    
});

//verification of cookies to allow user to tweet
app.get('/user/tweet', (request, response) => {

    var loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){
        response.render('user/Tweet');

    }else{
        response.render('Unregistered');
    }
});

//insertion of tweet
app.post('/user/tweeting', (request, response) => {

    const values = [
        request.body.tweet,
        request.cookies['userID']
    ];

    const text = 'INSERT INTO tweets (tweet, user_id) VALUES ($1, $2)';

    // execute query
    pool.query(text, values, (error, res) => {
        //response.redirect('/');
        response.send('tweet created');
    });
});

// allows user to follow other users
// /user/follow/

//user log out
app.get('/user/logout', (request, response) => {

    var loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){
        response.clearCookie('loggedin');
        response.clearCookie('userID');

        response.render('Logout');

    }else{
        response.render('Unregistered');
    }


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
