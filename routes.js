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
  //sign in
  //route path
  app.get('/user/login',users.logInForm);
  app.post('/user/login',users.logIn);
};
