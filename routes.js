module.exports = (app, db) => {
  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.get('/users/login', users.loginForm);
  app.post('/users/login', users.login);
  app.post('/users', users.create);
};
