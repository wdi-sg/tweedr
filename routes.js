module.exports = (app, db) => {

  const users = require('./controllers/users')(db);
  const tweets = require('./controllers/tweets')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.get('/users/login', users.loginForm);
  app.post('/users', users.create);
  app.post('/users/login', users.loginUser);

  // CRUD tweets
  app.get('/tweets/new', tweets.newTweetForm);
  app.post('/tweets', tweets.newTweetPost)
};
