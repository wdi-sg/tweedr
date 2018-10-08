module.exports = (app, db) => {
  const users = require('./controllers/user')(db);
  const tweed = require('./controllers/tweed')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.get('/users/login', users.loginForm);
  app.get('/users/logout', users.logout);
  app.get('/users/followers', users.followers);
  app.post('/users/login', users.login);
  app.post('/users', users.create);

  /*
   *  =========================================
   *  Tweeds
   *  =========================================
   */
  // CRUD Tweeds
  app.get('/tweeds/new', tweed.newForm);
  app.post('/tweeds', tweed.create);

  app.get('/something', users.ajax);
};
