module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const tweets = require('./controllers/tweet')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  app.get('/users/new', users.newForm);
  app.post('/users', users.create);

  /*
   *  =========================================
   *  Tweets
   *  =========================================
   */

  app.get('/tweets/new', tweets.newForm);
  app.post('/tweets', tweets.create);
};
