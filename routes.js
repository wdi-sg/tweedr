module.exports = (app, db) => { //references db from index.js

//ROUTES REQUIRE CONTROLLER
  const users = require('./controllers/user')(db);



  /*
   *  =========================================
   *  Users
   *  =========================================
   */


// 1.6 The app provides a basic user creation, so the basic app doesn't nee d anything more for users.
// Implement login of the user. ( change the code to a hashed session cookie, instead of just loggedin=true.
// Create the ability to make a tweet.
// Change the root route to display all tweets.


// CRUD users
app.get('/users/new', users.newForm);
app.get('/users/login/', users.loginForm);
// app.get('/users/logout', users.logout);
app.post('/users', users.create);
app.post('/users/login', users.login);
};

//------------- RESTful Routes
// /photos/
// GET
// index

// /photos/new
// GET
// new

// /photos
// POST
// create

// /photos/:id
// GET
// show

// /photos/:id/edit
// GET
// edit