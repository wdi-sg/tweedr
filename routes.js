module.exports = (app, db) => {

  const users = require('./controllers/users')(db);
  const tweets = require('./controllers/tweets')(db);

  // Root Route
  app.get('/', tweets.showAllTweetsForm);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.get('/users/login', users.loginForm);
  app.get('/users/logout', users.logoutUser);
  app.get('/users/:id/show', users.showUser)
  app.post('/users', users.create);
  app.post('/users/login', users.loginUser);
  app.post('/users/:id/follow', users.followUser)

  /*
   *  =========================================
   *  Tweets
   *  =========================================
   */

  // CRUD tweets
  app.get('/tweets/new', tweets.newTweetForm);
  app.get('/tweets/following', tweets.showFollowingTweetsForm)
  app.get('/tweets/followers', tweets.showFollowerTweetsForm)
  app.get('/tweets/:id/show', tweets.showSingleTweetForm)
  app.post('/tweets', tweets.newTweetPost)
};
