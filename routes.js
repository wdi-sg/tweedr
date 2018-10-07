module.exports = (app, db) => {

  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.post('/users/create', users.create);
  app.get('/users/login', users.login);
  app.post('/users/authentication', users.loginAuthentication)

  // Individual userpage
    app.get('/userpage/:id', users.userPage);
    app.post('/userpage/:id/tweet', users.storeTweet);

};
