module.exports = (app, db) => {

  const users = require('./controllers/user')(db);

  const tweets = require('./controllers/tweets')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // USERS users
  app.get('/users/new', users.newForm);
  app.get('/users/login', users.loginpage);
  app.get('/users/logout', users.logout);
  app.get('/users/:username/userpage', users.userpage);
  app.post('/users', users.create);
  app.post('/users/login', users.loggingIn);
  app.post('/users/:username/follow', users.followUser);
  app.get('/users', users.allusers);

  app.get('/tweets/new', tweets.writeTweet);
  app.post('/tweets', tweets.postTweet);

};
