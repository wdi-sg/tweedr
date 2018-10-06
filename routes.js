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
  app.get('/users/:name', users.get);
  app.get('/users', users.index);
  app.post('/users/followers', users.follow);
  app.post('/users', users.create);
  app.delete('/users/followers', users.unfollow);

  /*
   *  =========================================
   *  Tweets
   *  =========================================
   */

  app.get('/tweets/new', tweets.newForm);
  app.get('/tweets/:id', tweets.edit);
  app.get('/tweets', tweets.index);
  app.post('/tweets', tweets.create);
  app.put('/tweets/:id', tweets.update);
  // app.delete('/tweets/:id', tweets.delete);
};
