module.exports = (app, db) => {

  const users = require('./controllers/user')(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */
  // CRUD users
  app.get('/users/new', users.newForm);
  app.post('/users', users.create);

  //login form
  app.get('/users/login', users.loginForm);
  app.post('/users/status', users.loginStatus);
};
