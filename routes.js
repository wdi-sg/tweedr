module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const tweets = require('./controllers/tweets')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users', users.userRoot);
  app.get('/users/new', users.newForm);
  app.post('/users', users.create);
  app.post('/users/login', users.userLogin);

  //CRUD tweets
  app.get('/tweets', tweets.tweetsRoot);
  app.get('/tweets/:id', tweets.getTweet);
  app.put('/tweets/:id', tweets.updateTweet);
  app.delete('/tweets/:id', tweets.deleteTweet);
  app.post('/tweets/new', tweets.newTweet);
};
