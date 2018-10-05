module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const tweets = require('./controllers/tweet')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  app.get('/login', users.loginForm);
  app.get('/logout', users.logout);
  app.post('/login', users.login);

  app.get('/users/new', users.newForm);
  app.post('/users', users.create);

  /*
   *  =========================================
   *  Tweets
   *  =========================================
   */

  app.get('/tweets/new', tweets.newForm);
  app.get('/tweets', tweets.index);
  app.post('/tweets', tweets.create);
};
