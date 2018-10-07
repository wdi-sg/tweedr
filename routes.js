module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const tweets = require('./controllers/tweet')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.post('/users', users.create);

  //login form
  app.get('/users/login', users.loginForm);
  app.post('/users/status', users.loginStatus);
  app.get('/users/profile/:id', users.userPage);

  //follow user
  app.get('/users/follow', users.followPage);
  app.post('/users/followed', users.followPost);

  /*
   *  =========================================
   *  Tweets
   *  =========================================
   */

   app.get('/tweets/new', tweets.tweetBox);
   app.post('/tweets', tweets.createTweet);
   app.get('/tweets', tweets.displayAllTweets);




};



