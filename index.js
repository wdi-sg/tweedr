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


// #### Further
// Each reference on a page should be a link to that thing - (each tweet should link to a single tweet, each user should link to their profile, etc.)

// #### Further
// Make sure that users cannot "follow" people more than once.

// #### Further
// Add sort by date to each kind of tweet feed you made.

// #### Further
// Add the ability to edit a tweet.

// #### Further
// Add the ability to delete things.

// #### Further
// Add the ability to add a profile picture - see `input` `type=file` and `form` `enctype=multipart/formdata`

// #### Further
// Add the ability to tweet photos, also using the same profile pic upload as above.

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
 * Declarations
 * ===================================
 */

let text = "";
let followUpText = "";
let additionalText = "";

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

const followSuccess = (text, followUpText, values, request, response) => {
  pool.query(text, values, (error, res) => {
    pool.query(followUpText, (error, res) => {
      let tweets = {};
      tweets.list=[];
      for(let i = 0; i < res.rows.length; i++){
              tweets.list.push(res.rows[i]);
          }
      response.render('user/FollowSuccess', tweets);
    });
  });
}

const following = (text, followUpText, response) => {
  pool.query(text,(err, res) => {
    let tweets = {};
    tweets.following=[];
    for(let i = 0; i < res.rows.length; i++){
            tweets.following.push(res.rows[i]);
        }
    pool.query(followUpText,(err, res) => {
      tweets.list=[];
      for(let i = 0; i < res.rows.length; i++){
              tweets.list.push(res.rows[i]);
          }
      // console.log(songs);
      response.render('user/Following', tweets);
    });
  });
};

const validate =  ( text, followUpText, values, request, response ) => {
  pool.query(text, (error, res) => {
      if (res.rows.length === 0) {
        pool.query(followUpText, values, (error, res) => {
          response.send('Successfully registered')
        })
      } else {
        response.send('Please pick a different username');
      }
  });
}

const userProfile = (text, followUpText, additionalText, response) => {
  pool.query(text,(err, res) => {
    let tweets = {};
    tweets.following=[];
    for(let i = 0; i < res.rows.length; i++){
            tweets.following.push(res.rows[i]);
        }
    pool.query(followUpText,(err, res) => {
      tweets.followers=[];
      for(let i = 0; i < res.rows.length; i++){
              tweets.followers.push(res.rows[i]);
          }
      pool.query(additionalText,(err, res) => {
        tweets.list=[];
        console.log(tweets);
        for(let i = 0; i < res.rows.length; i++){
                tweets.list.push(res.rows[i]);
            }
        // console.log(songs);
        response.render('user/Profile', tweets);
      });
    });
  });
}

/**
 * ===================================
 * Routes
 * ===================================
 */

// homepage which shows all tweets
app.get('/', (request, response) => {

  const loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){

      text = `
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
  const loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){
        response.render('user/LoggedIn');

    }else{
        response.render('user/NewUser');
    }

});

//user registration successful
app.post('/user/registered', (request, response) => {

  text = `SELECT * 
      FROM users 
      WHERE name = '${request.body.name}'
      `;

  const values = [
    request.body.name,
    request.body.password
  ];

  followUpText = 'INSERT INTO users (name, password) VALUES ($1, $2)';

    // Validate that the user trying to register is using a name unique to the system.

  validate(text,followUpText, values, request, response);
    
});


//user login page
app.get('/user/login', (request, response) => {

    const loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){
        response.render('user/LoggedIn');

    }else{
        response.render('user/LoginPage');
    }

});

//user authentication
app.post('/logging', (request, response) => {

    text = `
      SELECT * 
      FROM users 
      WHERE name = '${request.body.name}'
      `;

    authenticate(text, request, response);
    
});

//See user profile
app.get('/user/profile', (request, response) => {

    const loggedin = request.cookies['loggedin'];
    const userId = request.cookies['userID'];

    if( loggedin == 'true' ){

      text = `
        SELECT DISTINCT follows.*, users.name
        FROM follows
        INNER JOIN users
        ON follows.followee_id = users.id
        WHERE follower_id = ${userId}
        `;

      followUpText = `
        SELECT DISTINCT follows.*, users.name
        FROM follows
        INNER JOIN users
        ON follows.follower_id = users.id
        WHERE followee_id = ${userId}
        `;

      additionalText = `
        SELECT tweets.*, users.name 
        FROM tweets
        INNER JOIN users
        ON tweets.user_id = users.id
        WHERE users.id = ${userId}
      `;

      userProfile(text, followUpText, additionalText, response);

    }else{
      response.render('Unregistered');
    }
});

//verification of cookies to allow user to tweet
app.get('/user/tweet', (request, response) => {

    const loggedin = request.cookies['loggedin'];

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

    text = `
    INSERT INTO tweets (tweet, user_id) 
    VALUES ($1, $2)
    `;

    // execute query
    pool.query(text, values, (error, res) => {
        //response.redirect('/');
        response.send('tweet created');
    });
});

// allows user to follow other users
app.get('/user/follow/:id', (request, response) => {

    var loggedin = request.cookies['loggedin'];

    if( loggedin == 'true' ){

      console.log("inserting");

      const values = [
        request.cookies['userID'],
        request.params.id
      ];

      text = `
        INSERT INTO follows (follower_id, followee_id) 
        VALUES ($1, $2)
        `;

      followUpText = `
        SELECT tweets.*, users.name
        FROM tweets
        INNER JOIN users
        ON tweets.user_id = users.id
        WHERE users.id = ${request.params.id}
        `;
      
      followSuccess(text, followUpText, values, request, response);

    }else{
      response.render('Unregistered');
    }
});

// Allows user to see who they are following
app.get('/user/following', (request, response) => {

    const loggedin = request.cookies['loggedin'];
    const userId = request.cookies['userID'];

    if( loggedin == 'true' ){

      text = `
        SELECT DISTINCT follows.*, users.name
        FROM follows
        INNER JOIN users
        ON follows.followee_id = users.id
        WHERE follower_id = ${userId}
        `;

      followUpText = `
        SELECT tweets.*, users.name
        FROM tweets
        INNER JOIN users
        ON tweets.user_id = users.id
        `;
      
      following(text, followUpText, response);

    }else{
      response.render('Unregistered');
    }
});

// Allows user to see tweets of individual followees
app.post('/user/seeFollowing', (request, response) => {

    const loggedin = request.cookies['loggedin'];
    const userId = request.cookies['userID'];

    if( loggedin == 'true' ){

      text = `
        SELECT DISTINCT follows.*, users.name
        FROM follows
        INNER JOIN users
        ON follows.followee_id = users.id
        WHERE follower_id = ${userId}
        `;

      followUpText = `
        SELECT tweets.*, users.name
        FROM tweets
        INNER JOIN users
        ON tweets.user_id = users.id
        WHERE users.id = ${request.body.id}
        `;
      
      following(text, followUpText, response);

    }else{
      response.render('Unregistered');
    }
});

// Allows user to see who is following them
app.get('/user/followers', (request, response) => {

    const loggedin = request.cookies['loggedin'];
    const userId = request.cookies['userID'];

    if( loggedin == 'true' ){

      text = `
        SELECT DISTINCT follows.*, users.name
        FROM follows
        INNER JOIN users
        ON follows.follower_id = users.id
        WHERE followee_id = ${userId}
        `;

      followUpText = `
        SELECT tweets.*, users.name
        FROM tweets
        INNER JOIN users
        ON tweets.user_id = users.id
        `;
      
      following(text, followUpText, response);

    }else{
      response.render('Unregistered');
    }
});

// Allows user to see tweets of individual followers
app.post('/user/seeFollower', (request, response) => {

    const loggedin = request.cookies['loggedin'];
    const userId = request.cookies['userID'];

    if( loggedin == 'true' ){

      text = `
        SELECT DISTINCT follows.*, users.name
        FROM follows
        INNER JOIN users
        ON follows.follower_id = users.id
        WHERE followee_id = ${userId}
        `;

      followUpText = `
        SELECT tweets.*, users.name
        FROM tweets
        INNER JOIN users
        ON tweets.user_id = users.id
        WHERE users.id = ${request.body.id}
        `;
      
      following(text, followUpText, response);

    }else{
      response.render('Unregistered');
    }
});

//user log out
app.get('/user/logout', (request, response) => {

    const loggedin = request.cookies['loggedin'];

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
