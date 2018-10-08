module.exports = (app, db) => {

  const users = require('./controllers/user')(db);
  const tweets = require('./controllers/tweets')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/', tweets.showTweets);

  app.get('/login', users.loginForm);
  app.post('/users/loggedin', users.loggedIn);
  app.delete('/logout', users.logout);

  app.get('/users/new', users.newForm);
  app.post('/users', users.create);
  app.get('/users/newtweet', tweets.newTweet);
  app.post('/users/alltweets', tweets.allTweets);
  app.get('/tweets/:id', tweets.individualTweet);

  app.get('/users/all', users.allUsers);

  app.get('/users/:id', users.individuals);
  app.post('/users/:id', users.following);



};
